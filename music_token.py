# requires pyjwt (https://pyjwt.readthedocs.io/en/latest/)
# pip install pyjwt


import datetime
import jwt


secret = """-----BEGIN PRIVATE KEY-----
ENTER PRIVATE KEY FROM .p8 file
-----END PRIVATE KEY-----"""
keyId = "ENTER KEY ID"
teamId = "ENTER TEAM ID"
alg = "ES256"

time_now = datetime.datetime.now()
time_expired = datetime.datetime.now() + datetime.timedelta(hours=730)

headers = {
	"alg": alg,
	"kid": keyId
}

payload = {
	"iss": teamId,
	"iat": time_now
	"exp": time_expired
}


if __name__ == "__main__":
	"""Create an auth token"""
	token = jwt.encode(payload, secret, algorithm=alg, headers=headers)

	print "----TOKEN----"
	print (token)

	print "----CURL----"
	print ("curl -v -H 'Authorization: Bearer %s' \"https://api.music.apple.com/v1/catalog/us/artists/36954\" " % (token))
