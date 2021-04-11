from googletrans import Translator
from datetime import datetime
from config_reader import ConfigReader
from SendEmail.sendEmail import EmailSender
import requests
from bs4 import BeautifulSoup
from flask import request
import json
import pandas as pd
from database import mongo_connection

config_reader = ConfigReader()
configuration = config_reader.read_config()

database_connection = mongo_connection()

class Sent_Generation:

    # get Cookie
    def get_cookie(self,somecookiename):
        try:
            value = request.cookies.get(somecookiename)
            return value
        except:
            return "Unable to process request"



        # Covert any language to English
    def anyLangtoEng(self, sent):
        try:
            translator = Translator()
            eng = translator.translate(sent, dest='en')
            return eng.src, eng.text
        except:
            return "We are facing some server issues, Please try after sometime!"

    # Covert English to input language
    def engtoHindi(self, opt):
        try:
            lang = self.get_cookie("language")
            translator = Translator()
            opt = translator.translate(opt, dest=lang)
            return opt.text
        except:
            return "We are facing some server issues, Please try after sometime!"
    # Scraping using Beautiful Soup

    def get_data(self, url):
        webpage = requests.get(url).text
        soup = BeautifulSoup(webpage, "html.parser")

        url_title = soup.find("meta", property="og:title")
        url_description = soup.find("meta", property="og:description")
        url_img = soup.find("meta", property="og:image")
        if url_img:
            if url_img["content"].startswith( 'https' ):
                url_img["content"] = url_img["content"]
            else:
                url_img["content"] = "static/img/logo.jpg"
        else:
            url_img = {}
            url_img["content"] = "static/img/logo.jpg"
        title = url_title["content"] if url_title else "Ineuron Megatron"
        description = url_description["content"] if url_description else ""
        img = url_img["content"]

        return title, description, img

    def get_image(self, url):
        webpage = requests.get(url).text
        soup = BeautifulSoup(webpage, "html.parser")
        url_img = soup.find("meta", property="og:image")
        img = url_img["content"] if url_img else "static/img/blank-icon.jpg"

        return img

    # fallback message if chatbot unable to respond
    def fallback_support(self, user_query):
        name = self.get_cookie("name")
        email= self.get_cookie("email")
        email_sender = EmailSender()
        email_sender.sendEmailToSupport(name, email, user_query)
        response = "Email sent to support team! You will be contacted soon"
        return response

    # fallback message if recordings not available
    def fallback_support_recording(self, batch, day):
        name = self.get_cookie("name")
        email= self.get_cookie("email")
        email_sender = EmailSender()
        email_sender.sendEmailToSupportForRecording(name, email, batch, day)
        response = "Email sent to support team! You will be contacted soon"
        return response

    # fallback message if file not found
    def fallback_support_file_not_found(self, batch, topic):
        name = self.get_cookie("name")
        email= self.get_cookie("email")
        email_sender = EmailSender()
        email_sender.sendEmailToSupportForFileNotFound(name, email, batch, topic)
        response = "Email sent to support team! You will be contacted soon"
        return response

    # fallback message for dashboard access
    def fallback_support_dashboard_access(self, batch):
        name = self.get_cookie("name")
        email= self.get_cookie("email")
        email_sender = EmailSender()
        email_sender.sendEmailToSupportForDashboardAccess(name, email, batch)
        response = "Email sent to support team! You will be contacted soon"
        return response

    # Fallback Text
    def fallback(self):
        response = {
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [
                            self.engtoHindi("Sorry, I couldn't get you!")
                        ]
                    }
                },
                {
                    "text": {
                        "text": [
                            self.engtoHindi("Do you want further assistance?")
                        ]
                    }
                }
            ],
            "message": "error",
            "status": "500"
        }
        return response

    def courseTimings(self,course):
        try:
            db_object, db_admin_object = database_connection.db_connection()
            course_data = db_admin_object.megatron_course.find_one({"unique_batch_name": course})
            course_data = json.loads(json.dumps(course_data,default=str))
            start_course_timing = datetime.strptime(course_data["starting_time"],'%Y-%m-%d %H:%M:%S').strftime('%I:%M %p')
            end_course_timing = datetime.strptime(course_data["ending_time"],'%Y-%m-%d %H:%M:%S').strftime('%I:%M %p')
            course_name = course_data["unique_course_name"]
            
            response = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Here is the course timings for class "+ course_name + " " + start_course_timing + " to " + end_course_timing
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    "Do you want further assistance?"
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
                                self.engtoHindi("We are facing some server issues, Please try after sometime!")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                self.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                "message": "error",
                "status": "500"
            }
        return response

    def courseContents(self,course):
        try:
            db_object, db_admin_object = database_connection.db_connection()
            course_data = db_admin_object.megatron_course.find_one({"unique_batch_name": course})
            course_data = json.loads(json.dumps(course_data,default=str))
            course_content = course_data["syllabus_link"]
            course_name = course_data["unique_course_name"]
            response = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Here is the link of course content for class "+ course_name + ":- " + "<a href='" + course_content + "' target='_blank'>Click here to check content</a>"
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    "Do you want further assistance?"
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
                                self.engtoHindi("We are facing some server issues, Please try after sometime!")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                self.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                "message": "error",
                "status": "500"
            }
        return response

    def courseFees(self,course):
        try:
            db_object, db_admin_object = database_connection.db_connection()
            course_data = db_admin_object.megatron_course.find_one({"unique_batch_name": course})
            course_data = json.loads(json.dumps(course_data,default=str))
            course_fee = course_data["course_fees"]
            course_name = course_data["unique_course_name"]
            response = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "The course fee for class "+ course_name + " is " + course_fee
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    "Do you want further assistance?"
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
                                self.engtoHindi("We are facing some server issues, Please try after sometime!")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                self.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                "message": "error",
                "status": "500"
            }
        return response

    def paymentDetail(self,course):
        try:
            db_object, db_admin_object = database_connection.db_connection()
            course_data = db_admin_object.megatron_course.find_one({"unique_batch_name": course})
            course_data = json.loads(json.dumps(course_data,default=str))
            payment_link = course_data["payment_link"]
            course_name = course_data["unique_course_name"]
            syllabus_link = course_data["syllabus_link"]
            response = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "The payment link for class "+ course_name + " is  <a href='" + payment_link + "' target='_blank'>"  + payment_link + "</a>.For more details, visit this page :- " + "<a href='" + syllabus_link + "' target='_blank'>click here</a>"
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    "Do you want further assistance?"
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
                                self.engtoHindi("We are facing some server issues, Please try after sometime!")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                self.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                "message": "error",
                "status": "500"
            }
        return response

    def resumeDetails(self,course):
        # try:
        db_object, db_admin_object = database_connection.db_connection()
        course_data = db_admin_object.megatron_course.find_one({"unique_batch_name": course})
        course_data = json.loads(json.dumps(course_data,default=str))
        course_name = course_data["unique_course_name"]
        ending_date = datetime.strptime(course_data["ending_date"],'%Y-%m-%d %H:%M:%S').strftime("%b %d %Y")

        email = self.get_cookie("email")
        registered_user = db_admin_object.megatron_registeredstudent.find_one({"course_name_id": course,"email": email})
        registered_user = json.loads(json.dumps(registered_user,default=str))

        if ( registered_user != None and registered_user["resume"] == "YES"):
            response = "Your resume discussion is already completed for course "+ course_name 
        elif (registered_user != None and registered_user["resume"] == "NO"):
            response  = "Your resume discussion for course " + course_name + " will start from " + ending_date + " onwards. You will receive mail from the same. Let us know if you have another query for resume discussion."
        else:
            response = "You have not registered for this course " + course_name
        response = {
                "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                response
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                "Do you want further assistance?"
                            ]
                        }
                    }
                ],
                "message": "success",
                "status": "200"
            }
        # except:
        #     response = {
        #         "fulfillmentMessages": [
        #             {
        #                 "text": {
        #                     "text": [
        #                         self.engtoHindi("We are facing some server issues, Please try after sometime!")
        #                     ]
        #                 }
        #             },
        #             {
        #                 "text": {
        #                     "text": [
        #                         self.engtoHindi("Do you want further assistance?")
        #                     ]
        #                 }
        #             }
        #         ],
        #         "message": "error",
        #         "status": "500"
        #     }
        return response

    def internshipQuery(self,course):
        try:
            db_object, db_admin_object = database_connection.db_connection()
            course_data = db_admin_object.megatron_course.find_one({"unique_batch_name": course})
            course_data = json.loads(json.dumps(course_data,default=str))
            course_name = course_data["unique_course_name"]
            ending_date = datetime.strptime(course_data["ending_date"],'%Y-%m-%d %H:%M:%S').strftime("%b %d %Y")

            email = self.get_cookie("email")
            registered_user = db_admin_object.megatron_registeredstudent.find_one({"course_name_id": course,"email": email})
            registered_user = json.loads(json.dumps(registered_user,default=str))

            if ( registered_user != None):
                response = "Your internship for course "+ course_name +" will start from " + ending_date + ". Let us know if you still have any query."
            else:
                response = "You have not registered for this course " + course_name
            response = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    response
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    "Do you want further assistance?"
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
                                self.engtoHindi("We are facing some server issues, Please try after sometime!")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                self.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                "message": "error",
                "status": "500"
            }
        return response

    def courseDetails(self,course):
        try:
            db_object, db_admin_object = database_connection.db_connection()
            course_data = db_admin_object.megatron_course.find_one({"unique_batch_name": course})
            course_data = json.loads(json.dumps(course_data,default=str))
            
            course_name = course_data["unique_course_name"]
            start_course_timing = datetime.strptime(course_data["starting_time"],'%Y-%m-%d %H:%M:%S').strftime('%I:%M %p')
            end_course_timing = datetime.strptime(course_data["ending_time"],'%Y-%m-%d %H:%M:%S').strftime('%I:%M %p')
            course_fee = course_data["course_fees"]
            start_date = course_data["starting_date"]
            Time_Period = course_data["time_period"]
            Syllabus_Link = course_data["syllabus_link"]

            relist = []
            relist.append("Following are the course details for class "+ course_name + ":- ")
            relist.append("1. Course starting on:- " + start_date)
            relist.append("2. Course duration:- " + Time_Period )
            relist.append("3. Course Fee:- " + course_fee)
            relist.append("4. Course timing:- " + start_course_timing + " to " + end_course_timing)
            relist.append("5. Course syllabus:- " + "<a href='" + Syllabus_Link + "' target='_blank'>Click here to check syllabus</a>")
            response = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": ["\n".join(relist)]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    "Do you want further assistance?"
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
                                self.engtoHindi("We are facing some server issues, Please try after sometime!")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                self.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                "message": "error",
                "status": "500"
            }
        return response

    def classLink(self,course, day):
        try:
            db_object, db_admin_object = database_connection.db_connection()
            course_data = db_admin_object.megatron_course.find_one({"unique_batch_name": course})
            course_data = json.loads(json.dumps(course_data,default=str))
            course_name = course_data["unique_course_name"]
            type_of_course = course_data["course_type"]
            
            class_data = db_admin_object.megatron_classrecord.find_one({"batch_name_id": course, "date" : datetime.strptime(day,'%m/%d/%Y')})
            class_data = json.loads(json.dumps(class_data,default=str))
            class_link = class_data["class_link"] if class_data !=None else None

            email = self.get_cookie("email")
            registered_user = db_admin_object.megatron_registeredstudent.find_one({"course_name_id": course,"email": email})

            if (type_of_course == "CO" and class_data != None):
                response = "The class link for class "+ course_name + " on " + datetime.strptime(day,'%m/%d/%Y').strftime("%b %d %Y") + ":- " + "<a href='" + class_link + "' target='_blank'>" + class_link + "</a>"
            elif (type_of_course == "CO" and class_data == None):
                response  = "No class will be conducted for " + course_name + " on " + datetime.strptime(day,'%m/%d/%Y').strftime("%b %d %Y") + "."
            elif (registered_user != None and  class_data != None):
                response = "The class link for class "+ course_name + " on " + datetime.strptime(day,'%m/%d/%Y').strftime("%b %d %Y") + ":- " + "<a href='" + class_link + "' target='_blank'>" + class_link + "</a>"
            elif (registered_user != None and  class_data == None):
                response  = "No class will be conducted for " + course_name + " on " + datetime.strptime(day,'%m/%d/%Y').strftime("%b %d %Y") + "."
            else:
                response = "You have not registered for this course " + course_name
            response = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    response
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    "Do you want further assistance?"
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
                                self.engtoHindi("We are facing some server issues, Please try after sometime!")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                self.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                "message": "error",
                "status": "500"
            }
        return response
        

    def youtubeLink(self,course, day):
        try:
            db_object, db_admin_object = database_connection.db_connection()
            course_data = db_admin_object.megatron_course.find_one({"unique_batch_name": course})
            course_data = json.loads(json.dumps(course_data,default=str))
            course_name = course_data["unique_course_name"]
            type_of_course = course_data["course_type"]
            
            record_data = db_admin_object.megatron_record.find_one({"course_id": course, "date" : datetime.strptime(day,'%m/%d/%Y')})
            record_data = json.loads(json.dumps(record_data,default=str))
            record_link = record_data["video_link"] if record_data !=None else None

            day_name= ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']
            day_of_recording = datetime.strptime(day,'%m/%d/%Y').weekday()
            day_of_recording = day_name[day_of_recording]

            email = self.get_cookie("email")
            registered_user = db_admin_object.megatron_registeredstudent.find_one({"course_name_id": course,"email": email})

            if (type_of_course == "CO" and record_data != None):
                response = "The youtube recording link for class "+ course_name + " on " + datetime.strptime(day,'%m/%d/%Y').strftime("%b %d %Y") + ":- " + "<a href='" + record_link + "' target='_blank'>" + record_link + "</a>"
            elif (type_of_course == "CO" and record_data == None and day_of_recording not in ["Saturday","Sunday",course_data["week_days"] ]):
                response  = "No class will be conducted for " + course_name + " on " + datetime.strptime(day,'%m/%d/%Y').strftime("%b %d %Y") + "."
            elif (type_of_course == "CO" and record_data == None and day_of_recording in ["Saturday","Sunday",course_data["doubt_week_day"],course_data["week_days"] ]):
                email_send = self.fallback_support_recording(course,day)
                print(email_send)
                response  = "Recordings has not been uploaded yet for  " + course_name + " on " + datetime.strptime(day,'%m/%d/%Y').strftime("%b %d %Y") + ". We have sent email to support team. It will be sort out within 24 hours."
            elif (registered_user != None and  record_data != None):
                response = "The youtube recording link for class "+ course_name + " on " + datetime.strptime(day,'%m/%d/%Y').strftime("%b %d %Y") + ":- " + "<a href='" + record_link + "' target='_blank'>" + record_link + "</a>"
            elif (registered_user != None and  record_data == None and day_of_recording not in ["Saturday","Sunday",course_data["doubt_week_day"],course_data["week_days"] ]):
                response  = "No class will be conducted for " + course_name + " on " + datetime.strptime(day,'%m/%d/%Y').strftime("%b %d %Y") + "."
            elif (registered_user != None and  record_data == None and day_of_recording in ["Saturday","Sunday",course_data["doubt_week_day"],course_data["week_days"] ]):
                email_send = self.fallback_support_recording(course,day)
                print(email_send)
                response  = "Recordings has not been uploaded yet for  " + course_name + " on " + datetime.strptime(day,'%m/%d/%Y').strftime("%b %d %Y") + ". We have sent email to support team. It will be sort out within 24 hours."
            else:
                response = "You have not registered for this course " + course_name
            response = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    response
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    "Do you want further assistance?"
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
                                self.engtoHindi("We are facing some server issues, Please try after sometime!")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                self.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                "message": "error",
                "status": "500"
            }
        return response

    def fileNotFound(self,course, topic):
        try:
            email_send = self.fallback_support_file_not_found(course,topic)
            response  = "We have sent email to support team regarding the same. It will be sort out within 24 hours."
            response = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    self.engtoHindi(response)
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    self.engtoHindi("Do you want further assistance?")
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
                                self.engtoHindi("We are facing some server issues, Please try after sometime!")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                self.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                "message": "error",
                "status": "500"
            }
        return response

    def dashboardAccess(self,course):
        try:
            email_send = self.fallback_support_dashboard_access(course)
            response  = "We have sent email to support team regarding your dashboard access. It will be sort out within 24 hours."
            response = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    self.engtoHindi(response)
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    self.engtoHindi("Do you want further assistance?")
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
                                self.engtoHindi("We are facing some server issues, Please try after sometime!")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                self.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                "message": "error",
                "status": "500"
            }
        return response

    def reg_stu(self):
        try:
            email = self.get_cookie("email")
            db_object, db_admin_object = database_connection.db_connection()
            registered_user = db_admin_object.megatron_registeredstudent.find({"email": email})
            registered_user = list(registered_user)
            registered_batches = []
            for items in registered_user:
                registered_batches.append(items["course_name_id"])
            if len(registered_batches) > 0:
                list_of_courses = db_admin_object.megatron_course.find({ "unique_batch_name": { "$in": registered_batches } })
                list_of_courses = json.dumps(list(list_of_courses),default=str)
                response = {
                    "list_of_courses": list_of_courses,
                    "message": "success",
                    "status": "200",
                    "intent": "Dashboard_access",
                    "intent_type": "General"
                }
            else:
                response = {
                    "fulfillmentMessages": [
                            {
                                "text": {
                                    "text": [
                                        self.engtoHindi("Sorry!! You have not registered to any courses till now. Please enroll yourself to get access to dashboard.")
                                    ]
                                }
                            },
                            {
                                "text": {
                                    "text": [
                                        self.engtoHindi("Do you want further assistance?")
                                    ]
                                }
                            }
                        ],
                    "message": "error",
                    "status": "500",
                    "intent": "Dashboard_access",
                    "intent_type": "General"
                }
        except:
            response = {
                "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    self.engtoHindi("Sorry!! we are not able to process your query at a moment. Please try again later.")
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    self.engtoHindi("Do you want further assistance?")
                                ]
                            }
                        }
                    ],
                "message": "error",
                "status": "500",
                "intent": "Dashboard_access",
                "intent_type": "General"
            }
        return response