import React, {Component} from 'react';
import {AppState, Button, Image, StatusBar, StyleSheet, Text, TextInput, View, Alert} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import TouchId from 'react-native-smart-touch-id'
import RNSecureKeyStore from 'react-native-secure-key-store';
import { NavigationActions } from "react-navigation";

export default class LockScreen extends Component {

    handleAppStateChange = (nextAppState) => {
        if (nextAppState.match(/inactive|background/)) {
            const reset = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: "LockScreen"})
                ]
            })
            this.props.navigation.dispatch({
                type: 'Navigation/NAVIGATE',
                routeName: 'LockScreen'
            })
            this.props.navigation.dispatch(reset)
        }
    };

    constructor(props) {
        super(props)
        this.state = {screen: "unlock"}
        AppState.addEventListener('change', this.handleAppStateChange)
    }

    componentWillMount() {
        LockScreen.isMasterPasswordSet().then((res) => {
            if (res) {
                this.setState({screen: "unlock"})
            } else {
                this.setState({screen: "setmaster"})
            }
        })
    }

     componentDidMount() {
         this.isFingerPrintSupported().then((supported) => {
             if(supported) {
                 this.checkFingerprint()
             }
         })
    }

    static async isMasterPasswordSet() {
        let pw = await RNSecureKeyStore.get("masterPassword");
        return pw !== null;
    }

    saveMasterPassword(masterPassword) {
        RNSecureKeyStore.set("masterPassword", masterPassword)
            .then((res) => {
                console.log(res);
                this.navigateToAppScreen()
            }, (err) => {
                console.log(err);
            });

    }


    async isFingerPrintSupported() {
        try {
            await TouchId.isSupported()
            return true;
        } catch(e) {
            return false;
        }
    }

    async checkFingerprint() {
        let description = 'Verify to access your vaults.'
        let title = "Verify Password"   //fallback button title will be 'Verify Password'(unlocalized)
        try {
            await TouchId.verify({
                description,
                title,
            });
            return true;
        } catch(e) {
            if (e.code == '-3') {
                //fallback button is pressed
                Alert.alert('errorCode: ' + e.code + ' verify failed, user wants to ' + title)
            }
            else {
                return false;
            }
        }
    }


    checkAuth() {
        RNSecureKeyStore.get("masterPassword")
            .then((res) => {
                console.log(res);
                var res = this.state.masterPasswordInput == res;
                if(res) {
                    this.navigateToAppScreen()
                }
            }, (err) => {
                console.log(err);
                return false;
            });
    }

    navigateToAppScreen() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'AppNavigator'})
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        if(this.state.screen === "unlock") {
            return (<UnlockComponent
                onChangeText={(masterPasswordInput) => this.setState({masterPasswordInput: masterPasswordInput})}
                onSubmit={() => {this.checkAuth()}}
            />);
        } else {
            return (
                <SetMasterPasswordComponent
                    onSubmitCorrectly={(password) => {this.saveMasterPassword(password)}}
                />
            );
        }
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
    headerText: {
        fontWeight: 'bold',
        fontSize: 34,
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
    inputError: {
        backgroundColor: "#ffdfe3",
        borderColor: "#ffdfe3",
    },
    formview: {
        width: 230,
        marginBottom: 20,
    },
});

class UnlockComponent extends Component {

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
                <View style={{marginTop: 100, justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{color: "#fff", fontSize: 70}}><FontAwesome>{Icons.lock}</FontAwesome></Text>
                    <View style={styles.formview}>
                        <Text style={styles.label}>
                            Password
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            secureTextEntry={true}
                            keyboardType={'url'}
                            returnKeyType={'done'}
                            onChangeText={this.props.onChangeText}
                            onSubmitEditing={this.props.onSubmit}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

class SetMasterPasswordComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {passwordCorrect: true}
    }

    checkPasswords() {
        console.log(this.state)
        if(this.state.pw1 == this.state.pw2) {
            this.setState({passwordCorrect: true})
            this.props.onSubmitCorrectly(this.state.pw1);
        } else {
            this.setState({passwordCorrect: false})
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
                <View style={{marginTop: 50, justifyContent: 'center', alignItems: 'center',}}>

                    <Text style={styles.headerText}>master password</Text>

                    <View style={[styles.formview, {marginTop: 20}]}>
                        <Text style={styles.label}>
                            Enter Password
                        </Text>
                        <TextInput
                            style={[styles.input, !this.state.passwordCorrect  && styles.inputError]}
                            placeholder="Password"
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            secureTextEntry={true}
                            keyboardType={'url'}
                            returnKeyType={'done'}
                            onChangeText={(pw1) => {
                                this.setState({pw1}); this.setState({passwordCorrect: true})
                            }}
                        />
                    </View>

                    <View style={styles.formview}>
                        <Text style={styles.label}>
                            Enter Password again
                        </Text>
                        <TextInput
                            style={[styles.input, !this.state.passwordCorrect  && styles.inputError]}
                            placeholder="Password again"
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            secureTextEntry={true}
                            keyboardType={'url'}
                            returnKeyType={'done'}
                            onChangeText={(pw2) => {
                                this.setState({pw2}); this.setState({passwordCorrect: true})
                            }}
                        />
                    </View>

                    <Button
                        title={"Save"}
                        style={{fontSize: 40}}
                        color={"#fff"}
                        onPress={() => {this.checkPasswords()}}
                    />
                </View>
            </View>
        );
    }
}