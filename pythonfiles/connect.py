# Importing module
import mysql.connector
# Creating connection object
mydb = mysql.connector.connect(
host = "localhost",
user = "admin",
password = "admin123"
)
# Printing the connection object
print(mydb)
# this will be displayed on the browser.