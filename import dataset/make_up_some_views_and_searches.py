import json
import random

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
# Get list of users
# Get list of apartments
# For every user in the database
  # Get a few random numbers from 0 to 2115, and make a view for that apartment
  # Get that apartment's location and make a search with it (if one doesn't exist with the same location)
sql = 'SELECT user_name FROM user WHERE user.is_renter = 1'
cursor.execute(sql)
users_list = cursor.fetchall()
n_users = len(users_list)
print("Users: ", n_users)
sql = 'SELECT id, location FROM appartment'
cursor.execute(sql)
apartments_list = cursor.fetchall()
n_apartments = len(apartments_list)
print("Apartments: ", n_apartments)
print(users_list[0][0])
print(apartments_list[0][0], "___", apartments_list[0][1])
id_key = 0
for i in range(n_users):
  # Get a random number, make a view for that apartment and the 10 apartments after it, check for list overflow and start at 0
  first_apartment_index = random.randint(0, n_apartments)
  for j in range(30): # Do this for 10 consecutive apartments
    if first_apartment_index + j > n_apartments - 1:
      ap_offset = j
    else:
      ap_offset = first_apartment_index + j
    # Make a view for apartment
    # print(ap_offset)
    sql = "INSERT INTO app_view (id, date, app_id, user_user_name) VALUES (%s, %s, %s, %s)"
    val = (id_key, "10-10-2010", apartments_list[ap_offset][0], users_list[i][0])
    cursor.execute(sql, val)
    # Get apartment's location and make a search with it
    sql = "INSERT INTO search (id, date, searchlocation, user_user_name) VALUES (%s, %s, %s, %s)"
    val = (id_key, "10-10-2010", apartments_list[ap_offset][1], users_list[i][0])
    cursor.execute(sql, val)
    id_key += 1

# cnx.commit()
cursor.close()
cnx.close()