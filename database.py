from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://megatronLog:hr2SC3S5Wcx2uip3@cluster0.3oipc.mongodb.net/megatronUser?retryWrites=true&w=majority")
db = client.megatronUser

client_admin = MongoClient(
    "mongodb+srv://megatronUser:megatronPass@dashboard-cluster.fbim5.mongodb.net/megatronDB?retryWrites=true&w=majority")
db_admin = client_admin.megatronDB

class mongo_connection:

    def db_connection(self):
        return db, db_admin