# apple-music-token-generator

Some steps that help getting started creating the Apple Music JWT tokens needed to use MusicKit on iOS

## Recent Change

Python command line


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

Run the following on the command line:
```
cd apple-music-token-generator
python setup.py install
```

## Usage

Run the script

```
apple-music-token --auth_key ./AuthKey_0123456789.p8 --key_id 9876543210 --team_id 01234567890123456789 --curl
```

The script will output a sample curl command you can run to see if you were successful.


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.


## Authors

* **Anonymous Apple Marketing Guy** - *Initial work* - [Anonymous]
* **Darren Baptiste** - *First Commit* - [Pelau Imagineering](https://github.com/pelauimagineering)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to the folks in the MusicKit Lab at WWDC17

