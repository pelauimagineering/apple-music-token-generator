require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const inquirer = require('inquirer');
const fetch = require("node-fetch");

const now = Math.floor((Date.now() / 1000));
const alg = 'ES256';
const headers = {
    'alg': alg,
	'kid': ''
}
// Exp is set to now + 6 months
// which is the max time allowed for a 
// jwt to exist for the Apple Music API.
// Change 15777000 to something else
// if you want it to expires sooner.
const payload = {
	'iss': '',
	'exp': now + 15777000,
	'iat': now
}

let privateKey;
let dataReady = false;

// You can configure your teamID and Key ID 
// by adding a .env file to this directory 
// and setting TEAM_ID and KEY_ID
// the pass your .p8 private key path in as an 
// argument to `npm run generate`

if(process.argv.length >= 3 && process.env.TEAM_ID && process.env.KEY_ID){
    if(process.argv.indexOf('--test') > -1){
        console.log('Generating test token\n');
        privateKey = fs.readFileSync('too-many-requests.p8');
        headers.kid = 'CapExedKid';
        payload.iss = 'CapExdTeam';
    } else {
        privateKey = fs.readFileSync(process.argv[2]);
        payload.iss = process.env.TEAM_ID;
        headers.kid = process.env.KEY_ID;
    }
    dataReady = true;
} else {
    // Use inquirer to collect information from user via command line
    // if nothing passed
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
            try {
                privateKey = fs.readFileSync(response.privateKeyFilename);
            } catch (error) {
                console.error(error);
            }
            payload.iss = response.teamId;
            headers.kid = response.kid;
            dataReady = true;
        })
        .catch(error => {
            console.error(error);
        })
}

// JWT are formed formed like:
// jwt.sign(payload, secretOrPrivateKey, [options, callback])
if(dataReady) {
    try {
    jwt.sign(payload, privateKey, {header: headers}, async function(error, token) {
        if(error){
            console.error(error);
        }
        console.log(token);
        console.log("Testing token... \n")
        // test token...
        let url = 'https://api.music.apple.com/v1/catalog/ca/genres';
        if(process.argv.indexOf('--test') > -1){
            url = 'https://api.music.apple.com/v1/test';
        }
        await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if(response.status == 401){
                console.log('401');
            } else {
                console.log(response);
            }
            return response.json();
        })
        .then(json => console.log(json))
        .catch(error => {
            console.error(error);
        })
    });
    } catch(error) {
        console.error(error);
    }
} else {
    console.error("The data was not properly processed to create a JWT.");
}