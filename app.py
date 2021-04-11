import os, json, re
from datetime import datetime, timezone, date
from pymongo import MongoClient
from flask import Flask, request, jsonify, render_template
from flask_cors import cross_origin
# from run_model import ELMo_Model
from run_model_distilbert import DistilBERT_Model
from config_reader import ConfigReader
from api_file import Sent_Generation
from web_scraping import scraping
from database import mongo_connection
import numpy as np

import warnings
warnings.filterwarnings("ignore")


app = Flask(__name__)

# Load Config File
config_reader = ConfigReader()
configuration = config_reader.read_config()

# Calling API File
api_fun = Sent_Generation()
# Calling scraping file
scrape_data = scraping()
# Calling model
# model = ELMo_Model()
model = DistilBERT_Model()
# Connecting MongoDB
database_connection = mongo_connection()

# home page
@app.route('/')
@cross_origin()
def home():
    return render_template("index.html")

# user details
@app.route('/api/userdetails', methods=['POST'])
@cross_origin()
def user_details():
    try:
        name = request.form['name']
        email = request.form['email']
        mobile = request.form['mobile']
        user = {
            "name": name,
            "email": email,
            "mobile": mobile,
            "datetime": datetime.now(timezone.utc)
        }
        db_object, db_admin_object = database_connection.db_connection()
        user_details = db_object.userdetails.insert_one(user)
        response = {
            "message": "success",
            "status": "200"
        }
    except:
        response = {
            "message": "error",
            "status": "500"
        }
    return jsonify(response)


# intent prediction
@app.route('/api/prediction', methods=['POST'])
@cross_origin()
def prediction():   
    try:
        query = request.form['query']
        _, query = api_fun.anyLangtoEng(query)
        result = model.model_pred(query)
        print(result[1][0])
        
        ##User conversation to Database
        db_object, db_admin_object = database_connection.db_connection()

        name = api_fun.get_cookie('name')
        email = api_fun.get_cookie('email')
        mobile = api_fun.get_cookie('mobile')
        userchat = {
            "name": name,
            "email": email,
            "mobile": mobile,
            "datetime": datetime.now(timezone.utc),
            "Content":query,
            "Predicted Intent":result[1][0],
            "Confidence Score":result[0]
        }
        user_chat = db_object.UserChat.insert_one(userchat)

        # General/ Techincal Intent
        general_intent = np.load('load_intent_filter/general_intent.npy',allow_pickle=True)
        technical_intent = np.load('load_intent_filter/technical_intent.npy',allow_pickle=True)
        scrape_data_filter = np.load('load_intent_filter/scrape_data.npy',allow_pickle=True)
        ticket_gen_filter = np.load('load_intent_filter/ticket_gen.npy',allow_pickle=True)
        community_form_filter = np.load('load_intent_filter/community_form_filter.npy',allow_pickle=True)
        form_filter = np.load('load_intent_filter/form_filter.npy',allow_pickle=True)
        list_thumbnail_filter = np.load('load_intent_filter/list_thumbnail.npy',allow_pickle=True)
        
        if result[1][0] in technical_intent:
            res_satisfied_or_assistance = 'Are you satisfied with your query?'
            intent_type = 'Technical'
        elif result[1][0] in ticket_gen_filter and result[1][0] in general_intent:
            res_satisfied_or_assistance = 'Do you want further assistance?'
            intent_type = 'General'
        else :
            res_satisfied_or_assistance = 'Are you satisfy with your query or you want to generate ticket for it?Please select suitable option.'
            # res_satisfied_or_assistance = 'Do you want further assistance?'
            intent_type = 'General'

        ##Scrapping based upon the confidence score
        print(result[0])
        if result[0] >= 50 and result[1][0] not in scrape_data_filter:
            result = result[1]
            ip = result[0]
            f = open('load_intent_filter/intents_map.json', )
            data = json.load(f)
            
            
            ## Reply based upon database added by admin

            # For list of courses from admin
            if ip in form_filter:
                list_of_courses = db_admin_object.megatron_course.find()
                list_of_courses = json.dumps(list(list_of_courses),default=str)
            # For list of community courses from admin
            elif ip in community_form_filter:
                list_of_courses = db_admin_object.megatron_course.find({"course_type": "CO"})
                list_of_courses = json.dumps(list(list_of_courses),default=str)
            elif ip == "NewBatch_details":
                list_of_courses = db_admin_object.megatron_course.find({"starting_date" : { "$gt" : datetime.now() }})
                list_of_courses = json.dumps(list(list_of_courses),default=str)
            elif ip == "Dashboard_access":
                response_access = api_fun.reg_stu()
            ## Ticket generate
            elif ip in ticket_gen_filter:
                mail_send = Sent_Generation()
                mail_send.fallback_support(query)
                list_of_courses = []
            elif ip in list_thumbnail_filter:
                list_of_url = data[ip]
                res = scrape_data.thumbnail_generate(list_of_url, res_satisfied_or_assistance, intent_type )
                list_of_courses = []
            else:
                list_of_courses = []

            reply = data[ip]
            reply = api_fun.engtoHindi(reply)

            if ip in list_thumbnail_filter:
                response = res
            elif ip == "Dashboard_access":
                response = response_access
            else:

                response = {
                    "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [reply]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi(res_satisfied_or_assistance)
                            ]
                        }
                    }
                ],
                    "intent": ip,
                    "list_of_courses": list_of_courses,
                    "message": "success",
                    "reply": reply,
                    "status": "200",
                    "intent_type": intent_type
                }
        else:
            print('predicted intent : '+str(result[1][0]))
            list_of_keyword = scrape_data.keyword_extract(query)
            print(list_of_keyword)
            if(len(list_of_keyword) > 0):
                strings=' + '.join(list_of_keyword)
                response = scrape_data.scrapping_url(strings)
                ## Database user response
                user_scrap_reply = {
                    "email": email,
                    "datetime": datetime.now(timezone.utc),
                    "Content": query,
                    "Extracted Words": list_of_keyword,
                    "Scrapping Response": response

                }
                user_scrap_chat = db_object.ScrappingChat.insert_one(user_scrap_reply)
            else:
                response = {
                    "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Sorry!! we are not able to process your query at a moment. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                    "intent": "Not_identified",
                    "message": "error",
                    "status": "500",
                    "intent_type": "General"
                }
    except:
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Sorry!! we are unable to process your request at this time. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "error",
            "status": "500",
            "intent_type": "General"
        }
    print(response)
    return jsonify(response)

# Fetch database details
@app.route('/api/dbFetchDetails', methods=['POST'])
@cross_origin()
def dbFetchDetails():
    try:
        db_object, db_admin_object = database_connection.db_connection()
        list_of_courses = db_admin_object.megatron_course.find()
        list_of_courses = json.dumps(list(list_of_courses),default=str)
        response = {
            "list_of_courses": list_of_courses,
            "message": "success",
            "status": "200"
        }
    except:
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Sorry!! we are not able to process your query at a moment. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "error",
            "status": "500"
        }
    return jsonify(response)

# Fetch database details for registered student
@app.route('/api/dbFetchDetailsForRegisteredStudent', methods=['POST'])
@cross_origin()
def dbFetchDetailsForRegisteredStudent():
    response = api_fun.reg_stu()
    return jsonify(response)

# Language Translation
@app.route('/api/languageTranslateWithThumbnail', methods=['POST'])
@cross_origin()
def languageTranslateWithThumbnail():
    try:
        content = request.get_json()
        query = content['msg']
        print(query)
        output = api_fun.engtoHindi(query)
        list_of_url = [output, content['url_link']]
        res_satisfied_or_assistance= "Do you want further assistance?"
        intent_type = "General"
        response = scrape_data.thumbnail_generate(list_of_url,res_satisfied_or_assistance, intent_type)
        # response = {
        #     "result": output,
        #     "response": res,
        #     "message": "success",
        #     "status": "200"
        # }
    except:
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Sorry!! we are not able to process your query at a moment. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "error",
            "status": "500"
        }
    return jsonify(response)

# assignment Query
@app.route('/api/assignmentQuery', methods=['POST'])
@cross_origin()
def assignmentQuery():
    try:
        query = request.form['query']
        print(query)
        output = api_fun.fallback_support(query)
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("We have sent email to support team regarding the same. It will be sort out within 24 hours.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "success",
            "status": "200"
        }
    except:
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Sorry!! we are not able to process your query at a moment. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "error",
            "status": "500"
        }
    return jsonify(response)

# internship Query BUtton
@app.route('/api/internshipQueryButton', methods=['POST'])
@cross_origin()
def internshipQueryButton():
    try:
        query = request.form['query']
        print(query)
        output = api_fun.fallback_support(query)
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("We have sent email to support team regarding the same. It will be sort out within 24 hours.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "success",
            "status": "200"
        }
    except:
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Sorry!! we are not able to process your query at a moment. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "error",
            "status": "500"
        }
    return jsonify(response)

# certificate Query
@app.route('/api/certificateQuery', methods=['POST'])
@cross_origin()
def certificateQuery():
    try:
        query = request.form['query']
        print(query)
        output = api_fun.fallback_support(query)
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("We have sent email to support team regarding the same. It will be sort out within 24 hours.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "success",
            "status": "200"
        }
    except:
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Sorry!! we are not able to process your query at a moment. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "error",
            "status": "500"
        }
    return jsonify(response)

# batch Query
@app.route('/api/batchQuery', methods=['POST'])
@cross_origin()
def batchQuery():
    try:
        query = request.form['query']
        print(query)
        output = api_fun.fallback_support(query)
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("We have sent email to support team regarding the same. It will be sort out within 24 hours.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "success",
            "status": "200"
        }
    except:
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Sorry!! we are not able to process your query at a moment. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "error",
            "status": "500"
        }
    return jsonify(response)

# courseTimings
@app.route('/api/courseTimings', methods=['POST'])
@cross_origin()
def courseTimings():
    coursename = request.form['coursename']
    response = api_fun.courseTimings(coursename)
    return jsonify(response)

# course_contents
@app.route('/api/courseContents', methods=['POST'])
@cross_origin()
def courseContents():
    coursename = request.form['coursename']
    response = api_fun.courseContents(coursename)
    return jsonify(response)

# courseFees
@app.route('/api/courseFees', methods=['POST'])
@cross_origin()
def courseFees():
    coursename = request.form['coursename']
    response = api_fun.courseFees(coursename)
    return jsonify(response)

# courseDetails
@app.route('/api/courseDetails', methods=['POST'])
@cross_origin()
def courseDetails():
    coursename = request.form['coursename']
    response = api_fun.courseDetails(coursename)
    return jsonify(response)

# class link
@app.route('/api/classLink', methods=['POST'])
@cross_origin()
def classLink():
    coursename = request.form['coursename']
    date = request.form['date']
    response = api_fun.classLink(coursename, date)
    return jsonify(response)

# payment Detail
@app.route('/api/paymentDetail', methods=['POST'])
@cross_origin()
def paymentDetail():
    coursename = request.form['coursename']
    response = api_fun.paymentDetail(coursename)
    return jsonify(response)

# resumeDetails
@app.route('/api/resumeDetails', methods=['POST'])
@cross_origin()
def resumeDetails():
    coursename = request.form['coursename']
    response = api_fun.resumeDetails(coursename)
    return jsonify(response)

# youtube link
@app.route('/api/youtubeLink', methods=['POST'])
@cross_origin()
def youtubeLink():
    coursename = request.form['coursename']
    date = request.form['date']
    response = api_fun.youtubeLink(coursename, date)
    return jsonify(response)

# fileNotFound
@app.route('/api/fileNotFound', methods=['POST'])
@cross_origin()
def fileNotFound():
    coursename = request.form['coursename']
    topic = request.form['topic']
    response = api_fun.fileNotFound(coursename, topic)
    return jsonify(response)

# internshipQuery
@app.route('/api/internshipQuery', methods=['POST'])
@cross_origin()
def internshipQuery():
    coursename = request.form['coursename']
    response = api_fun.internshipQuery(coursename)
    return jsonify(response)

# dashboardAccess
@app.route('/api/dashboardAccess', methods=['POST'])
@cross_origin()
def dashboardAccess():
    coursename = request.form['coursename']
    response = api_fun.dashboardAccess(coursename)
    return jsonify(response)

# satisfyNoScrapeData
@app.route('/api/satisfyNoScrapeData', methods=['POST'])
@cross_origin()
def satisfyNoScrapeData():
    try:
        content = request.get_json()
        query = content['user_query']
        strings=' + '.join(query.split(" "))
        response = scrape_data.scrapping_url(strings)
        response["scrape_msg_after"] = api_fun.engtoHindi("Are you satisfy with your query or you want to generate ticket for it?Please select suitable option.")
    except:
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Sorry!! we are not able to process your query at a moment. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "error",
            "status": "500"
        }
    return jsonify(response)


# Not satisfied response send email to support
@app.route('/api/notSatisfiedSendEmail', methods=['POST'])
@cross_origin()
def notSatisfiedSendEmail():
    try:
        content = request.get_json()
        query = content['user_query']
        output = api_fun.fallback_support(query)
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("We have sent email to support team regarding the same. It will be sort out within 24 hours.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "success",
            "status": "200"
        }
    except:
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Sorry!! we are not able to process your query at a moment. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "error",
            "status": "500"
        }
    return jsonify(response)

# technicalButtonPrediction
@app.route('/api/technicalButtonPrediction', methods=['POST'])
@cross_origin()
def technicalButtonPrediction():
    try:
        content = request.get_json()
        query = content['msg']
        print(query)
        technical_concept = content['technical_concept']
        f = open('load_intent_filter/intents_map.json', )
        data = json.load(f)
        list_thumbnail_filter = np.load('load_intent_filter/list_thumbnail.npy',allow_pickle=True)
        intent_type = "Technical"
        msg = "Are you satisfied with your query?"
        res_satisfied_or_assistance = api_fun.engtoHindi(msg)
        if technical_concept in list_thumbnail_filter:
            list_of_url = data[technical_concept]
            response = scrape_data.thumbnail_generate(list_of_url, res_satisfied_or_assistance, intent_type)
        else:
            response = {
                 "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Sorry!! we are not able to process your query at a moment. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                "message": "error",
                "status": "500"
            }
    except:
        response = {
            "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Sorry!! we are not able to process your query at a moment. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_fun.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
            "message": "error",
            "status": "500"
        }
    return jsonify(response)

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    print("Starting app on port %d" % port)
    app.run(debug=False, port=port, host="127.0.0.1")
