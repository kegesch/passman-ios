import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    StatusBar,
    Alert,
    TouchableHighlight,
    AlertIOS,
    ActivityIndicator,
    TextInput,
    Switch,
    Button, ScrollView
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { passmanAppUri } from '../index'
import Vault from '../model/Vault'
import Base64 from '../model/Base64'
import { NavigationActions  } from "react-navigation";

export default class VaultsScreen extends Component {

    static navigationOptions = {
        title: 'Vaults',
        tabBarLabel: 'Credentials',
        tabBarIcon: ({tintColor}) => ((<Text style={{color: tintColor, fontSize: 24}}><FontAwesome>{Icons.key}</FontAwesome></Text>))};

    constructor(props) {
        super(props);
        this.state = {vaults: [], isLoading: true}
    }

    async loadVaults() {
        server = await AsyncStorage.getItem("url")
        login = await AsyncStorage.getItem("login")
        password = await AsyncStorage.getItem("password")

        this.setState({"url": server})
        this.setState({"login": login})
        this.setState({"password": password})

        try {
            let response = await fetch(this.state.url + "/" + passmanAppUri + "vaults", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Authorization': 'Basic ' + Base64.btoa(this.state.login +':'+this.state.password),
                }
            })
            let responseJson = await response.json()
            let vaults = []
            for(i = 0; i < responseJson.length; i++) {
                var v = new Vault()
                v.vault_id = responseJson[i].vault_id
                v.guid = responseJson[i].guid
                v.name = responseJson[i].name
                v.created = responseJson[i].created
                v.public_sharing_key = responseJson[i].public_sharing_key
                v.last_access = responseJson[i].last_access
                v.challenge_password = responseJson[i].challenge_password
                vaults[v.guid] = v
            }
            this.setState({vaults: vaults})
        } catch(e) {
            console.log(e.message)
            Alert.alert("Could not fetch Vaults. Please try again.")
        }

    }

    componentWillMount() {
        this.loadVaults().then(
            this.setState({isLoading: false})
        )
    }

    _pressVault(vault) {
        AsyncStorage.setItem("defaultVault", JSON.stringify(vault.guid))
        AsyncStorage.getItem('vaultKeys').then((response) => JSON.parse(response)).then((responseJson) => {
            if(responseJson == null || responseJson[vault.guid] == null) {
                this.props.navigation.navigate("VaultKeyScreen", {vaultGuid: vault.guid})
            } else {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'CredentialsScreen' })
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            }
        })
    }

    render() {
        var vaults = [];
        for(i in this.state.vaults) {
            let guid = this.state.vaults[i].guid;
            let vault = this.state.vaults[i]
            vaults.push(
                <TouchableHighlight key={guid} onPress={() => {this._pressVault(vault)}}>
                    <View style={styles.contentContainer}>
                        <Text>{this.state.vaults[i].name}</Text>
                    </View>
                </TouchableHighlight>
            )
        }

        return (
            <View style={styles.root}>
                <ActivityIndicator style={styles.loading} animating={this.state.isLoading}/>
                <ScrollView style={styles.vaultList}>
                    {vaults}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#FAFAFA',
        flex: 1,
    },
    vaultList: {
        borderTopWidth: 1,
        borderTopColor: '#f1f1f1',
    },
    contentContainer: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        padding: 8,
        paddingLeft: 12
    }
})


