# Passman App for iOS
## Setup
1. Clone Project
2. Run ```npm install``` in the folder
3. Run  ````npm start```` and ```` npm run-ios````

## Creating App-Icon
We are usign RN-Toolbox
1. Installing RN-Toolbox with ```npm install -g yo generator-rn-toolbox```
2. Installing ImageMagick (dependency) with ```brew install imagemagick```
3. Having a single .png file for the App-Icon we can run ```yo rn-toolbox:assets --icon resources/apple-touch-icon.png```
4. When asked for overwriting, reply with ```y```

## Troubleshooting
### Shims
1. Install RN-Nodeify with ````npm install --gobal rn-nodeify````
2. Run ````rn-nodeify --install --hacks````

### Linking new dependencies
Run ```react-native  link```. This should do it unless the library says otherwise.
