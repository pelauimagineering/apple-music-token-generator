import datetime
import jwt
import click


@click.command()
@click.option('--auth_key', type=click.File('r'), required=True)
@click.option('--key_id', type=str, required=True)
@click.option('--team_id', type=str, required=True)
@click.option('--alg', type=str, default='ES256')
@click.option('--curl', type=bool, default=False, is_flag=True)
def main(auth_key, key_id, team_id, alg, curl):
	'''Create an auth token'''

	time_now = datetime.datetime.now()
	time_expired = datetime.datetime.now() + datetime.timedelta(hours=12)

	headers = {
		'alg': alg,
		'kid': key_id
	}

	payload = {
		'iss': team_id,
		'exp': int(time_expired.strftime('%s')),
		'iat': int(time_now.strftime('%s'))
	}

	token = jwt.encode(payload, auth_key.read(), algorithm=alg, headers=headers).decode()

	if curl:
		click.echo(f"curl -v -H 'Authorization: Bearer {token}' \"https://api.music.apple.com/v1/catalog/us/artists/36954\"")
	else:
		click.echo(token)
	
