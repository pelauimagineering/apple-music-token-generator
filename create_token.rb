# Darren Baptiste darren@darrenbaptiste.com
#
# With thanks to https://github.com/jwt/ruby-jwt
# Hat tip to Dan Devine <https://stackoverflow.com/users/611955/dan-devine> for mentioning the need to add the 'typ' when using this gem

require 'jwt'

# ***** BEGIN CONFIGURATION == CHANGE THE ITEMS BELOW ********

private_key = '-----BEGIN PRIVATE KEY-----
ABCDEF123GHIJ456KLMN78900PQR1234STU56VWX789Z0
-----END PRIVATE KEY-----'

keyId = 'YOUR-10-DIGIT-APPLE-MUSIC-KEY-IDENTIFIER'
teamId = 'YOUR-10-DIGIT-APPLE-TEAM-ID'
hours_to_live = 24

# ***** END OF CONFIGURATION == ONLY CHANGE THE ITEMS ABOVE ********


time_now = Time.now.to_i
time_expired = Time.now.to_i + hours_to_live * 3600
algorithm = 'ES256'

headers = {
	'typ': 'JWT',
	'kid': keyId
}

payload = {
	'iss': teamId,
	'exp': time_expired,
	'iat': time_now
}

ecdsa_key = OpenSSL::PKey::EC.new private_key
ecdsa_key.check_key

token = JWT.encode payload, ecdsa_key, algorithm, header_fields=headers

puts token


# Uncomment the following section is for testing our output, including the generation of a curl script
#
# ecdsa_public = OpenSSL::PKey::EC.new ecdsa_key
# ecdsa_public.private_key = nil
# decoded_token = JWT.decode token, ecdsa_public, true, { algorithm: algorithm }
#
# puts decoded_token
#
# puts "curl -v -H \'Authorization: Bearer #{ token }\' \"https://api.music.apple.com/v1/catalog/ca/genres\" "
