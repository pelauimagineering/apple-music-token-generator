require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const inquirer = require('inquirer');

const hours_to_live = 24
const header = {
	'typ': 'JWT',
	'kid': ''
}
const payload = {
	'iss': '',
	'exp': Math.floor((Date.now() / 1000) + hours_to_live * 3600),
	'iat': Math.floor(Date.now() / 1000)
}

//const privateKey = fs.readFileSync('private.key');
//const keyId = 'YOUR-10-DIGIT-APPLE-MUSIC-KEY-IDENTIFIER'
//const teamId = 'YOUR-10-DIGIT-APPLE-TEAM-ID'

let privateKey;

if(process.argv.length === 3){
    // arg[0] - private key
    // arg[1] - keyId
    // arg[2] - teamId
} else if(process.argv.length === 1 && process.env.TEAM_ID && process.env.KEY_ID){
    privateKey = fs.readFileSync(response.privateKeyFilename);
} else {
    // Use inquirer to collect information from user via command line
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Private key file name:',
                name: 'privateKeyFilename',
            },
            {
                type: 'input',
                message: 'Key ID:',
                name: 'kid',
            },
            {
                type: 'input',
                message: 'Team ID:',
                name: 'teamID',
            },
        ])
        .then((response) => {
            privateKey = fs.readFileSync(response.privateKeyFilename);
            payload.iss = response.teamId;
            header.kid = response.kid;
        })
}

// formed like:
// jwt.sign(payload, secretOrPrivateKey, [options, callback])
jwt.sign(payload, privateKey, { algorithm: 'RS256', header }, function(error, token) {
    console.log(token);
});