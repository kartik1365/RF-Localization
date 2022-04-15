import requests

#client 1

msg1=requests.get("https://api.thingspeak.com/channels/1705104/feeds.json?api_key=FQEJ276LIIJYWRFA&results=2")
#print("\n" + str(msg))
if(len(msg1.json()['feeds']) >= 1):
	msg1=msg1.json()['feeds'][-1]['field1']
	print("\nThe Data Received from client 1 : \n\n"+str(msg1))


#client 2

msg1=requests.get("https://api.thingspeak.com/channels/1705106/fields/1.json?api_key=3LJUY6013H717R2V&results=2")
#print("\n" + str(msg))
if(len(msg1.json()['feeds']) >= 1):
	msg1=msg1.json()['feeds'][-1]['field1']
	print("\nThe Data Received from client 2 : \n\n"+str(msg1))

#client 3

msg1=requests.get("https://api.thingspeak.com/channels/1705107/feeds.json?api_key=RO3OW3FDNRRUGQYH&results=2")
#print("\n" + str(msg))
if(len(msg1.json()['feeds']) >= 1):
	msg1=msg1.json()['feeds'][-1]['field1']
	print("\nThe Data Received from client 3 : \n\n"+str(msg1))
