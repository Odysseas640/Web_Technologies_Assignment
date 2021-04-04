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

with open('reviews2.json', 'r', encoding='utf8') as f2:
    rev_dict = json.load(f2)

iterations = 0
different_users = 0
s1 = 0
s2 = 0
s3 = 0
s4 = 0
s5 = 0
print('This should take about 11 minutes')
for rev in rev_dict:
	# print(rev['listing_id'])
	# print(rev['id'])
	# print(rev['date'])
	# print(rev['reviewer_id'])
	# print(rev['reviewer_name']) # user_name
	skore = rev['score']
	skore = skore * 1.25
	if skore < 1.5:
		skore_int = 1
		s1 += 1
	elif skore < 2.5:
		skore_int = 2
		s2 += 1
	elif skore < 3.5:
		skore_int = 3
		s3 += 1
	elif skore < 4.5:
		skore_int = 4
		s4 += 1
	else:
		skore_int = 5
		s5 += 1
	# print(skore_int, ' - ', skore)
	########################################## Insert user if they're not in already
	sql = 'SELECT * FROM user WHERE user.user_name = ' + str(rev['reviewer_id'])
	# print('sql command: ', sql)
	cursor.execute(sql)
	result = cursor.fetchall()

	if not result: # User who wrote this review is not in the database, so put him in
		# print('NEW USER')
		different_users+=1
		sql = 'INSERT INTO user (user_name, password, email, first_name, is_owner, is_renter, last_name, phone_number, pic, requestfor_owner)\
		VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
		val = (rev['reviewer_id'], '1234', str(rev['reviewer_id'])+'@di.uoa.gr', rev['reviewer_name'], 0, 1, 'Raptis', '2235091023', 0, 0)
		cursor.execute(sql, val)
	# else: # User who wrote this review is already in the database because we inserted him with a previous review he's written
		# print('USER ', rev['reviewer_id'], ' EXISTS')
		# print('result3', result)
	############################################
	sql = "INSERT INTO review (id, app_id, comment, number, user_name, appartment_id, user_user_name)\
	VALUES (%s, %s, %s, %s, %s, %s, %s)"
	val = (rev['id'], rev['listing_id'], 'This is fine.', skore_int, rev['reviewer_id'], rev['listing_id'], rev['reviewer_id'])
	cursor.execute(sql, val)
	iterations += 1
	# if iterations >= 100:
	# 	break
	########################## Insert into "booking" table. First find the location of the apartment already in the database.
	sql = "SELECT * FROM appartment WHERE appartment.id = " + str(rev['listing_id'])
	cursor.execute(sql)
	result = cursor.fetchall()
	# print('Apartment ID:', result[0][0], 'LOKATION:', result[0][15])
	# Due to the way the database is made, I have to look for the apartment to get its location, so I can put it in the "booking" table.
	# Searching for an apartment 34.670 times would take 44 hours.
	# But the reviews are sorted by apartment. So, I'll save the apartment from the previous iteration, and if the current review is for
	#    the same apartment, I don't have to look in the database. Now it should take 3.5 hours.
	# break
	# continue
	sql = "INSERT INTO booking (id, app_id, user_name, appartment_id, usr_user_name, has_reviewed, location)\
	VALUES (%s, %s, %s, %s, %s, %s, %s)"
	val = (iterations+100, rev['listing_id'], rev['reviewer_name'], rev['listing_id'], rev['reviewer_id'], '1', result[0][0])
	cursor.execute(sql, val)
	# review, booking and booking_dates_booked have the same ID
	sql = "INSERT INTO booking_dates_booked (booking_id, dates_booked)\
	VALUES (%s, %s)"
	val = (iterations+100, '10-10-2010')
	cursor.execute(sql, val)

	# print('Done reviews ', iterations)

print('Reviews inserted: ', iterations)
print('Different users: ', different_users)
print('Score statistics: 1:', s1, '  2:', s2, '  3:', s3, '  s4:', s4, '  s5:', s5)
# cnx.commit()
cursor.close()
cnx.close()