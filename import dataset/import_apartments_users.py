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

iteration = 0
different_users = 0
for apt in apt_dict: # For every apartment in the JSON file, get the values we want and put them in the 'appartment' table in the database
	apt_id = apt['id']
	# print('id: ', apt_id)
	transit = apt['transit']
	if len(transit) > 255:
		transit = transit[:255]
	# print('access_info: ', transit) #Access_info
	street = apt['street']
	# print('address: ', street) # Address
	# Pets_allowed
	if 'Pets Allowed' in apt['amenities'] or 'pets allowed' in apt['amenities']:
		pets = 1
		# print('Yes pets allowed')
	else:
		pets = 0
		# print('No pets allowed')
	# Smoking_allowed
	if 'Smoking Allowed' in apt['amenities'] or 'smoking allowed' in apt['amenities']:
		smoking = 1
		# print('Yes smoking allowed')
	else:
		smoking = 0
		# print('No smoking allowed')
	capacity = apt['accommodates']
	# print('capacity: ', capacity) # Capacity
	description = apt['description']
	# print('description: ', description) # Description
	floor = 1 # Floor -- csv DOESN'T SAY --
	# Elevator
	if 'Elevator' in apt['amenities'] or 'elevator' in apt['amenities']:
		elevator = 1
		# print('Yes elevator')
	else:
		elevator = 0
		# print('No elevator')
	# Parking
	if 'Parking' in apt['amenities'] or 'parking' in apt['amenities']:
		parking = 1
		# print('Yes parking')
	else:
		parking = 0
		# print('No parking')
	# TV
	if 'TV' in apt['amenities'] or 'Television' in apt['amenities']:
		TV = 1
		# print('Yes TV')
	else:
		TV = 0
		# print('No TV')
	# WiFi
	if 'Wireless' in apt['amenities'] or 'wireless' in apt['amenities'] or 'WiFi' in apt['amenities']:
		WiFi = 1
		# print('Yes WiFi')
	else:
		WiFi = 0
		# print('No WiFi')
	# Air Condition
	if 'Air Conditioning' in apt['amenities'] or 'air conditioning' in apt['amenities'] or 'AC' in apt['amenities'] or 'A/C' in apt['amenities']:
		air_condition = 1
		# print('Yes air condition')
	else:
		air_condition = 0
		# print('No air condition')
	id_available = 0 # id_available DOESN'T SAY, THIS WAS GEORGE'S IDEA
	latitude = apt['latitude']
	# print('latitude: ', latitude) # Latitude
	# Location
	location = apt['country'] + '+' + apt['city'] + '+' + apt['neighbourhood_cleansed']
	# print('location: ', location)
	longitude = apt['longitude']
	# print('longitude: ', longitude)
	Main_pic = 0 # Main_pic NO PIC AT ALL
	beds = apt['beds']
	if beds == None:
		beds = 0
	# print('beds: ', beds) # Number_of_beds
	host_name = apt['host_name']
	# print('host_name: ', host_name) # ownername
	price = str(apt['price'])
	price = price[1:]
	# print('price: ', price) # Price IT'S A STRING WITH $, make it an INT
	if None != apt['square_feet'] and 0 != apt['square_feet'] and 'null' != apt['square_feet']:
		square_meters = apt['square_feet'] / 10.76
		square_meters = int(square_meters)
	else:
		square_meters = 0
	# print('square_meters: ', square_meters) # size
	# Type
	if 'Shared room' in apt['room_type']:
		aptype = 'shared_room'
	elif 'Entire home/apt' in apt['room_type']:
		if 'House' in apt['property_type']:
			aptype = 'full house'
		else:
			aptype = 'private flat'
	else:
		aptype = 'private flat'
	# print('aptype: ', aptype)
	owner_user_name = apt['host_id']
	# print('owner_user_name: ', owner_user_name) # owner_user_name
	bedrooms = apt['bedrooms']
	if bedrooms == None:
		bedrooms = 0
	# print('bedrooms: ', bedrooms) # number_of_bedrooms
	extra_people = str(apt['extra_people'])
	extra_people = extra_people[1:]
	# print('extra_people: ', extra_people) # cost_per_person IT'S A STRING WITH $, make it an INT
	# has_living_room FIND IT IN DESCRIPTION, OTHERWISE NO LIVING ROOM
	if 'living room' in apt['description'] or 'living room' in apt['space']:
		has_living_room = 1
	else:
		has_living_room = 0
	# print('living_room: ', has_living_room)
	minimum_nights = apt['minimum_nights']
	# print('minimum_nights: ', minimum_nights) # min_dates_to_book
	bathrooms = apt['bathrooms']
	if bathrooms == None:
		bathrooms = 0
	# print('bathrooms: ', bathrooms) # number_of_bathrooms
	########################################## Insert user if they're not in already
	sql = 'SELECT * FROM user WHERE user.user_name = ' + str(owner_user_name)
	# val = (owner_user_name)
	# print('sql command: ', sql)
	cursor.execute(sql)
	result = cursor.fetchall()
	# print('looking for 748818: ', result)

	if not result: # User who owns current apartment is not in the database, so put him in
		# print('NEW USER')
		different_users+=1
		sql = 'INSERT INTO user (user_name, password, email, first_name, is_owner, is_renter, last_name, phone_number, pic, requestfor_owner)\
		VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
		val = (owner_user_name, '1234', str(owner_user_name)+'@di.uoa.gr', host_name, 1, 0, 'Raptis', '2235091023', 0, 0)
		cursor.execute(sql, val)
	############################################
	sql = "INSERT INTO appartment (id, access_info, address, allow_pets, allow_smoking, capacity, description, floor, has_elevator,\
	has_parking, has_tv, has_wifi, hasheat, id_available, latitude, location, longitude, main_pic, number_of_beds, ownername, price,\
	size, type, owner_user_name, number_of_bedrooms, cost_per_person, has_living_room, min_dates_to_book, number_of_bathrooms)\
	VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
	val = (apt_id, transit, street, pets, smoking, capacity, description, floor, elevator, parking, TV, WiFi, air_condition,\
		id_available, latitude, location, longitude, Main_pic, beds, host_name, price, square_meters, aptype, owner_user_name,\
		bedrooms, extra_people, has_living_room, minimum_nights, bathrooms)
	cursor.execute(sql, val)
	iteration+=1
	# break
print("   Apartments: ", iteration)
print("   Different users: ", different_users)

# cnx.commit()
cursor.close()
cnx.close()
exit()