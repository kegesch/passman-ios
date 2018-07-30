# Passman App for iOS <img src="https://passman.cc/img/icon128.png" height="30" />
iOS client for nextclouds password-manager extension [Passman](https://passman.cc/) 

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c17f8f31c7314def9da0bf68b78369b1)](https://app.codacy.com/app/Y0nnyy/passman-ios?utm_source=github.com&utm_medium=referral&utm_content=Y0nnyy/passman-ios&utm_campaign=badger)
[![Build Status](https://travis-ci.org/Y0nnyy/passman-ios.svg?branch=master)](https://travis-ci.org/Y0nnyy/passman-ios)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FY0nnyy%2Fpassman-ios.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FY0nnyy%2Fpassman-ios?ref=badge_shield)

<img src="https://github.com/Y0nnyy/passman-ios/raw/master/resources/screenshots/mock-ups/screenshot-setup_iphone8spacegrey_portrait.png" width="285"/> <img src="https://github.com/Y0nnyy/passman-ios/raw/master/resources/screenshots/mock-ups/screenshot-master-password_iphone8spacegrey_portrait.png" width="285"/> <img src="https://github.com/Y0nnyy/passman-ios/raw/master/resources/screenshots/mock-ups/screenshot-credentials_iphone8spacegrey_portrait.png" width="285"/>

## Current features
* Setup nextcloud connection
* Setting master password to lock the app
* View the encrypted credential (with custom fields and OTP)

## Development
### Setup
1. Clone Project
2. Run ```npm install``` in the folder
3. Run  ````npm start```` and ```` react-native run-ios````

### Creating App-Icon
We are usign RN-Toolbox
1. Installing RN-Toolbox with ```npm install -g yo generator-rn-toolbox```
2. Installing ImageMagick (dependency) with ```brew install imagemagick```
3. Having a single .png file for the App-Icon we can run ```yo rn-toolbox:assets --icon resources/apple-touch-icon.png```
4. When asked for overwriting, reply with ```y```

## Creating screenshots and mockups
To pimp up the advertizing these tools might be helpful: 
 - [Shotbot](https://app.shotbot.io) to create screenshots for the AppStore
 - [mockuphone](https://mockuphone.com/) to create mockup screenshots of specific device

### Troubleshooting
#### Linking new dependencies
Run ```react-native  link```. This should do it unless the library says otherwise.


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FY0nnyy%2Fpassman-ios.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FY0nnyy%2Fpassman-ios?ref=badge_large)
The source code is available under the MIT license. See the ```LICENSE``` file for more information.

Although technically allowed by the licensing terms, please do not simply submit your own version of passman-ios to the App Store.
