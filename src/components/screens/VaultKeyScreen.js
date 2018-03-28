import React, { Component } from 'react';
import {Button, Switch, Text, TextInput, View, AsyncStorage, StyleSheet} from "react-native";
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { NavigationActions } from "react-navigation";
import RNSecureKeyStore from 'react-native-secure-key-store';

export default class VaultKeyScreen extends Component {

    static navigationOptions = {
        title: 'Key',
        tabBarLabel: 'Credentials',
        tabBarIcon: ({tintColor}) => ((<Text style={{color: tintColor, fontSize: 24}}><FontAwesome>{Icons.key}</FontAwesome></Text>))};

    constructor() {
        super()
        this.state = {save: true};
    }

    _okay() {
        const { params } = this.props.navigation.state

        if(this.state.save) {
            RNSecureKeyStore.get('vaultKeys').then((response) => JSON.parse(response), (err) => {
                let responseJson = {};
                responseJson[params.vaultGuid] = this.state.key;
                console.log(responseJson)
                RNSecureKeyStore.set('vaultKeys', JSON.stringify(responseJson))
                this.navigateToCredentialScreen({});
            }).then((responseJson) => {
                responseJson[params.vaultGuid] = this.state.key
                console.log(responseJson)
                RNSecureKeyStore.set('vaultKeys', JSON.stringify(responseJson))
                this.navigateToCredentialScreen({})
            })
        } else {
            this.navigateToCredentialScreen({vaultKeys: this.state.key})
        }
    }

    navigateToCredentialScreen(params) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'CredentialsScreen', params: params})
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.contentContainer}>
                    <Text>
                        Key
                    </Text>
                    <TextInput onChangeText={(value) => this.setState({key: value})}
                               secureTextEntry={true}
                               placeholder="password"
                               autoCorrect={false}
                               autoCapitalize={'none'}
                               returnKeyType={'done'} />
                    <Switch value={this.state.save} onValueChange={(value) => this.setState({save: value})}/>
                    <Text>
                        Save Key
                    </Text>
                    <Button title="Okay" onPress={() => {this._okay()}} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#FAFAFA',
        flex: 1,
    },
    contentContainer: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f1f1f1',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        padding: 8,
        paddingLeft: 12
    }
})