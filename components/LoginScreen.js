import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    StatusBar,
    AsyncStorage,
    Alert
} from 'react-native';

import TouchId from 'react-native-smart-touch-id';
import { passmanAppUri } from '../index'
import Base64 from '../model/Base64'
import { NavigationActions } from "react-navigation";
export default class LoginScreen extends Component {

    static navigationOptions = { title: 'Welcome', header: null };

    constructor() {
        super()
    }

    componentDidMount() {
        this.setState({url: ""})
        this.setState({login: ""})
        this.setState({password: ""})

        this.isDataAlreadySaved().then(bool => {
            if(bool) {
                this.navigateToCredentialsScreen();
            }
        })
    }

    saveData(key, value) {
        AsyncStorage.setItem(key, value);
    }

    async checkAuth() {
        try {
            let response = await fetch(this.state.url + "/" + passmanAppUri + "vaults", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Base64.btoa(this.state.login + ":" + this.state.password)
                }
            })
            return (response.status === 200)
        } catch(e) {
            return false
        }
    }

    navigateToCredentialsScreen() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'AppNavigator'})
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    async dataAreValid() {
        if(this.state.url == "" || this.state.login == "" || this.state.password == "") {
            Alert.alert("Error", "Data must not be empty")
            return false;
        }
        expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        if(!this.state.url.match(expression)) {
            Alert.alert("Error", "Server address must be valid")
            return false
        }

        checked = await this.checkAuth()
        if(!checked) {
            Alert.alert("Authentication Error", "given username with password has no rights")
            return false
        }
        return true
    }

    async saveLoginData() {
        if(await this.dataAreValid()) {
            this.saveData("url", this.state.url);
            this.saveData("login", this.state.login);
            this.saveData("password", this.state.password);

            this.navigateToCredentialsScreen();
        }
    }

    async isDataAlreadySaved() {
        try {
            const url =  await AsyncStorage.getItem("url")
            const login =  await AsyncStorage.getItem("login")
            const password = await AsyncStorage.getItem("password")
            if(url !== null && login !== null && password !== null) return true
            return false
        } catch(e) {
            return false;
        }

    }

    render() {
        return (
          <View style={styles.root}>
              <StatusBar
                  barStyle="light-content"
              />
              <View style={{marginTop: 60, justifyContent: 'center', alignItems: 'center',}}>
                  <Image
                      style={styles.logo}
                      source={require('../resources/app.png')}
                  />
                  <Text style={styles.logoText}>
                      Passman
                  </Text>
              </View>
              <View style={{marginTop: 40, justifyContent: 'center', alignItems: 'center',}}>
                  <View style={styles.formview}>
                      <Text style={styles.label}>
                          Server address
                      </Text>
                      <TextInput
                          style={styles.input}
                          placeholder="https://localhost"
                          autoCorrect={false}
                          autoCapitalize={'none'}
                          keyboardType={'url'}
                          returnKeyType={'next'}
                          onChangeText={(url) => this.setState({url})}
                      />
                  </View>
                  <View style={styles.formview}>
                      <Text style={styles.label}>
                          Username
                      </Text>
                      <TextInput
                          style={styles.input}
                          placeholder="username"
                          autoCorrect={false}
                          autoCapitalize={'none'}
                          returnKeyType={'next'}
                          onChangeText={(login) => this.setState({login})}
                      />
                  </View>
                  <View style={styles.formview}>
                      <Text style={styles.label}>
                          Password
                      </Text>
                      <TextInput
                          style={styles.input}
                          secureTextEntry={true}
                          placeholder="password"
                          autoCorrect={false}
                          autoCapitalize={'none'}
                          returnKeyType={'done'}
                          onChangeText={(password) => this.setState({password})}
                      />
                  </View>
                  <Button
                      title="Login"
                      onPress={() => this.saveLoginData()}
                      color="#fff"
                  />
              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#007AC7',
        flex: 1
    },
    logo: {
        height: 100,
        width: 100,
    },
    logoText: {
      fontWeight: 'bold',
        fontSize: 40,
        color: '#ffffff',
    },
    label: {
        color: '#ffffff',
    },
    input: {
        color: '#007AC7',
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        padding: 4,
        borderRadius: 5,
        borderWidth: 1
    },
    formview: {
        width: 230,
        marginBottom: 20,
    },
});