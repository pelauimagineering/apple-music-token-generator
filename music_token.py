# requires pyjwt (https://pyjwt.readthedocs.io/en/latest/)
# pip install pyjwt


import datetime
import jwt


secret = open('YourAuthFileNameHere.p8', 'rb').read()
keyId = "0123456789"
teamId = "9876543210"
alg = 'ES256'

time_now = datetime.datetime.now()
time_expired = datetime.datetime.now() + datetime.timedelta(hours=12)

headers = {
	"alg": alg,
	"kid": keyId
}

payload = {
	"iss": teamId,
	"exp": int(time_expired.strftime("%s")),
	"iat": int(time_now.strftime("%s"))
}


if __name__ == "__main__":
	"""Create an auth token"""
	token = jwt.encode(payload, secret, algorithm=alg, headers=headers)

	print "----TOKEN----"
	print token

	print "----CURL----"
	print "curl -v -H 'Authorization: Bearer %s' \"https://api.music.apple.com/v1/catalog/us/artists/36954\" " % (token)
