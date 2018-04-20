# apple-music-token-generator

Some steps that help getting started creating the Apple Music JWT tokens needed to use MusicKit on iOS

## Recent Change

Added a Ruby version of the solution.


## Getting Started

These instructions supplement the information found in the Get Started section of the Apple Music API Reference documents.

First, you must follow the instructions at [Apple Music API Reference](https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/AppleMusicWebServicesReference/SetUpWebServices.html#//apple_ref/doc/uid/TP40017625-CH2-SW1)

Next, follow the instructions below to help create your developer token in the JSON Web Token format.


## Prerequisites

A developer machine running macOS Sierra (10.12.5)
You will need to run Terminal and have root access, or can run sudo
After following the instructions at the URL above, you should now have 3 pieces of data:

- a MusicKit private key in a *.p8 file
- a 10-digit key identifier in your Apple Developer account
- your 10-digit Apple Developer Account Team ID


## Installing

### Step 1

### Easy method:

Run the following on the command line:
```
sudo easy_install pip
```

### Old method: 

Download the Python package manager from [pip](https://pip.pypa.io/en/stable/installing/)

```
Download the get-pip.py script from https://pip.pypa.io/en/stable/installing/
```

Install Python package manager

```
sudo python get-pip.py
```

### Step 2

Now that the Python Package Manager (pip) is installed, use it to install the Python JWT library

```
sudo pip install pyjwt
```

Add the necessary Cryptography package

```
sudo pip install cryptography
```

All of that was just housekeeping to get you ready for the main event... actually generating the token.

Use you favourite editor to customize the script that will create your token.

```
open -e music_token.py
```

Copy your MusicKit private key from the .p8 file you generated and downloaded.

```
secret = """-----BEGIN PRIVATE KEY-----
REPLACE-THIS-WITH-YOUR-OWN-PRIVATE-KEY
-----END PRIVATE KEY-----"""
```

Substitute your 10-digit key identifier (kid) as found in your developer account

```
keyId = "9876543210"
```

Substitute your 10-digit Apple Developer Team ID

```
teamId = "0123456789"
```

Run the script

```
> python music_token.py
```

The script will output a sample curl command you can run to see if you were successful.

```

```


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.


## Authors

* **Anonymous Apple Marketing Guy** - *Initial work* - [Anonymous]
* **Darren Baptiste** - *First Commit* - [Pelau Imagineering](https://github.com/pelauimagineering)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to the folks in the MusicKit Lab at WWDC17

