# Passman App for iOS <img src="https://passman.cc/img/icon128.png" height="30" />
iOS client for nextclouds password-manager extension [Passman](https://passman.cc/) 

<img src="https://github.com/Y0nnyy/passman-ios/raw/master/resources/screenshots/screenshot-setup.png" width="285"/> <img src="https://github.com/Y0nnyy/passman-ios/raw/master/resources/screenshots/screenshot-master-password.png" width="285"/> <img src="https://github.com/Y0nnyy/passman-ios/raw/master/resources/screenshots/screenshot-credentials.png" width="285"/>

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

### Troubleshooting
#### Shims
1. Install RN-Nodeify with ````npm install --gobal rn-nodeify````
2. Run ````rn-nodeify --install --hacks````

#### Linking new dependencies
Run ```react-native  link```. This should do it unless the library says otherwise.
