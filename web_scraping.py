import requests, json
from bs4 import BeautifulSoup
from rake_nltk import Rake
from fake_useragent import UserAgent
import random
from itertools import cycle
import re
from urllib.parse import urlparse
from api_file import Sent_Generation

# Calling API File
api_call = Sent_Generation()

class scraping:

    # extract Keyword
    def keyword_extract(self,str):
        try:
            r = Rake()
            r.extract_keywords_from_text(str)
            res = r.get_ranked_phrases()
            print(res)
            return res
        except:
            return "Unable to extract keyword"

    def scrapping_url(self,query):
        try:
            url = "https://google-search3.p.rapidapi.com/api/v1/search/q={}&num=3".format(query)
            headers = {
                    'x-rapidapi-key': "e468d98724msh7380b7960df4c02p18c627jsnffbdc0763d43",
                    'x-rapidapi-host': "google-search3.p.rapidapi.com"
                    }

            response = requests.request("GET", url, headers=headers)
            res = json.loads(response.text)
            reply= self.thumbnail_generate_scraping(res)
        except:
            reply = {
                "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_call.engtoHindi("Sorry!! we are unable to process your request at this time. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_call.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                "message": "error",
                "status": "500",
                "intent":"Not_identified",
                "intent_type": "General"
            }
        return reply
    
    def thumbnail_generate_scraping(self,list_of_url):
        try:
            relist = []
            for i in list_of_url["results"]:
                resdata = dict()
                try:
                    print(i)
                    # Thumbnail code start
                    resdata["title"] = i["title"]
                    resdata["description"] = i["description"]
                    resdata["image"] = api_call.get_image(i["link"])
                    resdata["url"] = i["link"]
                    relist.append(resdata)
                    # Thumbnail code end
                except:
                    print(str(i)+' index name not found')
            if len(relist) != 0:
                response = {
                     "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    api_call.engtoHindi("Kindly refer below links as a reference:-")
                                ]
                            }
                        }
                    ],
                    "result": relist,
                    "message": "success",
                    "status": "200",
                    "intent":"Not_identified",
                    "intent_type": "Technical",
                    "scrape_msg": api_call.engtoHindi("Are you satisfy with your query or you want to generate ticket for it?Please select suitable option.")
                }
            else:
                response = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    api_call.engtoHindi("Sorry!! we are unable to process your request at this time. Please try again later.")
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    api_call.engtoHindi("Do you want further assistance?")
                                ]
                            }
                        }
                    ],
                    "message": "error",
                    "status": "500",
                    "intent":"Not_identified",
                    "intent_type": "General"
                }
        except:
            response = {
                "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                api_call.engtoHindi("Sorry!! we are unable to process your request at this time. Please try again later.")
                            ]
                        }
                    },
                    {
                        "text": {
                            "text": [
                                api_call.engtoHindi("Do you want further assistance?")
                            ]
                        }
                    }
                ],
                "message": "error",
                "status": "500",
                "intent":"Not_identified",
                 "intent_type": "General"
            }
        return response

    def thumbnail_generate(self,list_of_url, res_satisfied_or_assistance, intent_type ):
        try:
            relist = []
            for i in list_of_url[1:]:
                resdata = dict()
                try:
                    # Thumbnail code start
                    title, description, image = api_call.get_data(i)
                    resdata["title"] = title
                    resdata["description"] = description
                    resdata["image"] = image
                    resdata["url"] = i
                    relist.append(resdata)
                    # Thumbnail code end
                except:
                    print(str(i)+' index name not found')
            if len(relist) != 0:
                response = {
                        "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    api_call.engtoHindi(res_satisfied_or_assistance)
                                ]
                            }
                        }
                    ],
                    "result": relist,
                    "message": "success",
                    "status": "200",
                    "intent":"list_thumbnail",
                    "speak_msg": list_of_url[0],
                    "intent_type": intent_type
                }
            else:
                response = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    api_call.engtoHindi("Sorry!! we are unable to process your request at this time. Please try again later.")
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    api_call.engtoHindi("Do you want further assistance?")
                                ]
                            }
                        }
                    ],
                    "message": "error",
                    "status": "500",
                    "intent":"list_thumbnail",
                        "intent_type": "General"
                }
        except:
            response = {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    api_call.engtoHindi("Sorry!! we are unable to process your request at this time. Please try again later.")
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    api_call.engtoHindi("Do you want further assistance?")
                                ]
                            }
                        }
                    ],
                    "message": "error",
                    "status": "500",
                    "intent":"list_thumbnail",
                     "intent_type": "General"
                }
        return response