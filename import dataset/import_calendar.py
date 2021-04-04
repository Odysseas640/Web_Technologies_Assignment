import json

with open('calendar.json', 'r', encoding='utf8') as f:
    calendar = json.load(f)

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

print('This should take about 4 minutes')
iteration = 0
for apt in calendar:
	if apt['available'] == 'f':
		continue
	########################### Statistic: check if price is the same as in the apartment listing
	# sql = 'SELECT appartment.price FROM appartment WHERE appartment.id = ' + str(apt['listing_id'])
	# cursor.execute(sql)
	# result = cursor.fetchall()
	# if (str(result) != str(apt['price'])):
	# 	print(result, ' - ', apt['price'])
	###########################
	listing_id = apt['listing_id']
	# print('id: ', listing_id)
	date = apt['date']
	# print('date:        ', date)
	if date[8] != '0':
		date_proper = date[8] + date[9]
	else:
		date_proper = date[9]
	date_proper += '-'
	if date[5] != '0':
		date_proper += date[5]
		date_proper += date[6]
	else:
		date_proper += date[6]
	date_proper += '-'
	date_proper += date[:4]
	# print('date_proper: ', date_proper)
	sql = "INSERT INTO appartment_dates (appartment_id, dates) VALUES (%s, %s)"
	val = (listing_id, date_proper)
	cursor.execute(sql, val)
	iteration += 1
	# if iteration >= 10:
	# 	break

print('Dates inserted: ', iteration)#283s with print, 659014. 232 with no print.
# cnx.commit()
cursor.close()
cnx.close()
# [
#  {
#    "listing_id": 5731498,
#    "date": "2015-07-17",
#    "available": "f",
#    "price": ""
#  },
# appartment_id int
# dates         varchar(255)