import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from config_reader import ConfigReader


class EmailSender:
    def sendEmailToSupport(self, name, email, user_query):
        self.config_reader = ConfigReader()
        self.configuration = self.config_reader.read_config()

        # instance of MIMEMultipart
        self.msg = MIMEMultipart()

        # storing the senders email address
        self.msg['From'] = "iNeuron Megatron Chatbot <chatbotineuron@gmail.com>"

        # storing the receivers email address
        self.msg['To'] = "chatbotineuron@gmail.com"

        # storing the subject
        self.msg['Subject'] = "Customer query"

        body = """We have a customer query, which we were not able to answer as of now. Here is the query:- 
                    {}\n
                    Customer-name:- {}\n
                    Customer-email:- {}\n
                    Please have a look into this.
                    \n\n\n\n
                    Regards,
                    Team iNeuron
                """.format(user_query,name,email)

        # attach the body with the msg instance
        self.msg.attach(MIMEText(body, 'html'))


        # instance of MIMEBase and named as p
        self.p = MIMEBase('application', 'octet-stream')

        # creates SMTP session
        self.smtp = smtplib.SMTP('smtp.gmail.com', 587)

        # start TLS for security
        self.smtp.starttls()

        # Authentication
        self.smtp.login(
            self.configuration['SENDER_EMAIL'], self.configuration['PASSWORD'])

        # Converts the Multipart msg into a string
        self.text = self.msg.as_string()

        # sending the mail
        self.smtp.sendmail(
            self.configuration['SENDER_EMAIL'], self.msg['To'], self.text)

        print("Email sent to support team!")

        # terminating the session
        self.smtp.quit()
        return "Email sent to support team!"

    def sendEmailToSupportForRecording(self, name, email, batch, day):
        self.config_reader = ConfigReader()
        self.configuration = self.config_reader.read_config()

        # instance of MIMEMultipart
        self.msg = MIMEMultipart()

        # storing the senders email address
        self.msg['From'] = "iNeuron Megatron Chatbot <chatbotineuron@gmail.com>"

        # storing the receivers email address
        self.msg['To'] = "chatbotineuron@gmail.com"

        # storing the subject
        self.msg['Subject'] = "Recording Uploading query"

        body = """We have a query that recording is not uploaded in dashboard. Here is the details:- 
                    Batch:- {}
                    Day:- {}
                    Customer-name:- {}
                    Customer-email:- {}
                    Please have a look into this.
                    
                    Regards,
                    Team iNeuron
                """.format(batch,day,name,email)

        # attach the body with the msg instance
        self.msg.attach(MIMEText(body, 'html'))


        # instance of MIMEBase and named as p
        self.p = MIMEBase('application', 'octet-stream')

        # creates SMTP session
        self.smtp = smtplib.SMTP('smtp.gmail.com', 587)

        # start TLS for security
        self.smtp.starttls()

        # Authentication
        self.smtp.login(
            self.configuration['SENDER_EMAIL'], self.configuration['PASSWORD'])

        # Converts the Multipart msg into a string
        self.text = self.msg.as_string()

        # sending the mail
        self.smtp.sendmail(
            self.configuration['SENDER_EMAIL'], self.msg['To'], self.text)

        print("Email sent to support team!")

        # terminating the session
        self.smtp.quit()
        return "Email sent to support team!"

    def sendEmailToSupportForFileNotFound(self, name, email, batch, topic):
        self.config_reader = ConfigReader()
        self.configuration = self.config_reader.read_config()

        # instance of MIMEMultipart
        self.msg = MIMEMultipart()

        # storing the senders email address
        self.msg['From'] = "iNeuron Megatron Chatbot <chatbotineuron@gmail.com>"

        # storing the receivers email address
        self.msg['To'] = "chatbotineuron@gmail.com"

        # storing the subject
        self.msg['Subject'] = "File not found query"

        body = """We have a query that File is not uploaded in dashboard. Here is the details:- 
                    Batch:- {}
                    Topic:- {}
                    Customer-name:- {}
                    Customer-email:- {}
                    Please have a look into this.
                    
                    Regards,
                    Team iNeuron
                """.format(batch,topic,name,email)

        # attach the body with the msg instance
        self.msg.attach(MIMEText(body, 'html'))


        # instance of MIMEBase and named as p
        self.p = MIMEBase('application', 'octet-stream')

        # creates SMTP session
        self.smtp = smtplib.SMTP('smtp.gmail.com', 587)

        # start TLS for security
        self.smtp.starttls()

        # Authentication
        self.smtp.login(
            self.configuration['SENDER_EMAIL'], self.configuration['PASSWORD'])

        # Converts the Multipart msg into a string
        self.text = self.msg.as_string()

        # sending the mail
        self.smtp.sendmail(
            self.configuration['SENDER_EMAIL'], self.msg['To'], self.text)

        print("Email sent to support team!")

        # terminating the session
        self.smtp.quit()
        return "Email sent to support team!"

    def sendEmailToSupportForDashboardAccess(self, name, email, batch):
        self.config_reader = ConfigReader()
        self.configuration = self.config_reader.read_config()

        # instance of MIMEMultipart
        self.msg = MIMEMultipart()

        # storing the senders email address
        self.msg['From'] = "iNeuron Megatron Chatbot <chatbotineuron@gmail.com>"

        # storing the receivers email address
        self.msg['To'] = "chatbotineuron@gmail.com"

        # storing the subject
        self.msg['Subject'] = "Dashboard access query"

        body = """We have a query that some user has not received dashboard access. Here is the details:- 
                    Batch:- {}
                    Customer-name:- {}
                    Customer-email:- {}
                    Please have a look into this.
                    
                    Regards,
                    Team iNeuron
                """.format(batch,name,email)

        # attach the body with the msg instance
        self.msg.attach(MIMEText(body, 'html'))


        # instance of MIMEBase and named as p
        self.p = MIMEBase('application', 'octet-stream')

        # creates SMTP session
        self.smtp = smtplib.SMTP('smtp.gmail.com', 587)

        # start TLS for security
        self.smtp.starttls()

        # Authentication
        self.smtp.login(
            self.configuration['SENDER_EMAIL'], self.configuration['PASSWORD'])

        # Converts the Multipart msg into a string
        self.text = self.msg.as_string()

        # sending the mail
        self.smtp.sendmail(
            self.configuration['SENDER_EMAIL'], self.msg['To'], self.text)

        print("Email sent to support team!")

        # terminating the session
        self.smtp.quit()

        return "Email sent to support team!"