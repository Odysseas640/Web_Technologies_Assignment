import json

with open('listings.json', 'r', encoding='utf8') as f:
    apt_dict = json.load(f)

import mysql.connector
from mysql.connector import errorcode

try:
  cnx = mysql.connector.connect(user='root',
                                database='app',
                                password='1235')
except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with your user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)
# else:
#   cnx.close()
cursor = cnx.cursor()

sql = 'SELECT COUNT(*) FROM app_view'
cursor.execute(sql)
result = cursor.fetchall()
print('-----app_view BEFORE----------', result)
sql = 'SELECT COUNT(*) FROM search'
cursor.execute(sql)
result = cursor.fetchall()
print('-----search BEFORE----------', result)
sql = 'SELECT COUNT(*) FROM image_model'
cursor.execute(sql)
result = cursor.fetchall()
print('-----image_model BEFORE----------', result)
sql = 'SELECT COUNT(*) FROM message'
cursor.execute(sql)
result = cursor.fetchall()
print('-----message BEFORE----------', result)
sql = 'SELECT * FROM user WHERE user_name = "admin1"'
cursor.execute(sql)
result = cursor.fetchall()
print('-----user BEFORE----------', result)
sql = 'SELECT COUNT(*) FROM user'
cursor.execute(sql)
result = cursor.fetchall()
print('-----user BEFORE----------', result)
sql = 'SELECT COUNT(*) FROM appartment'
cursor.execute(sql)
result = cursor.fetchall()
print('-----appp BEFORE----------', result)
sql = 'SELECT COUNT(*) FROM appartment_dates'
cursor.execute(sql)
result = cursor.fetchall()
print('----dates BEFORE----------', result)
sql = 'SELECT COUNT(*) FROM review'
cursor.execute(sql)
result = cursor.fetchall()
print('--reviews BEFORE----------', result)
sql = 'SELECT COUNT(*) FROM booking'
cursor.execute(sql)
result = cursor.fetchall()
print('--booking BEFORE----------', result)
sql = 'SELECT COUNT(*) FROM booking_dates_booked'
cursor.execute(sql)
result = cursor.fetchall()
print('--booking_dates_booked BEFORE----------', result)

# print('DELETING STUFF')
# sql = "DELETE FROM app_view"
# cursor.execute(sql)
# sql = "DELETE FROM search"
# cursor.execute(sql)
# sql = "DELETE FROM image_model"
# cursor.execute(sql)
# sql = "DELETE FROM message"
# cursor.execute(sql)
# sql = "DELETE FROM booking_dates_booked"
# cursor.execute(sql)
# sql = "DELETE FROM booking"
# cursor.execute(sql)
# sql = "DELETE FROM appartment_dates"
# cursor.execute(sql)
# sql = "DELETE FROM review"
# cursor.execute(sql)
# sql = "DELETE FROM appartment"
# cursor.execute(sql)
# sql = "DELETE FROM user WHERE user_name != 'admin1'"
# cursor.execute(sql)

sql = 'SELECT COUNT(*) FROM app_view'
cursor.execute(sql)
result = cursor.fetchall()
print('-----app_view AFTER----------', result)
sql = 'SELECT COUNT(*) FROM search'
cursor.execute(sql)
result = cursor.fetchall()
print('-----search AFTER----------', result)
sql = 'SELECT COUNT(*) FROM image_model'
cursor.execute(sql)
result = cursor.fetchall()
print('-----image_model AFTER----------', result)
sql = 'SELECT COUNT(*) FROM message'
cursor.execute(sql)
result = cursor.fetchall()
print('-----message AFTER----------', result)
sql = 'SELECT COUNT(*) FROM user'
cursor.execute(sql)
result = cursor.fetchall()
print('-----user AFTER----------', result)
sql = 'SELECT COUNT(*) FROM appartment'
cursor.execute(sql)
result = cursor.fetchall()
print('-----appp AFTER----------', result)
sql = 'SELECT COUNT(*) FROM appartment_dates'
cursor.execute(sql)
result = cursor.fetchall()
print('----dates AFTER----------', result)
sql = 'SELECT COUNT(*) FROM review'
cursor.execute(sql)
result = cursor.fetchall()
print('--reviews AFTER----------', result)
sql = 'SELECT COUNT(*) FROM booking'
cursor.execute(sql)
result = cursor.fetchall()
print('--booking AFTER----------', result)
sql = 'SELECT COUNT(*) FROM booking_dates_booked'
cursor.execute(sql)
result = cursor.fetchall()
print('--booking_dates_booked AFTER----------', result)
# cnx.commit()