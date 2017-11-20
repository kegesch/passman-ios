import React, { Component } from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    StatusBar,
    Alert,
    Image,
    TouchableHighlight,
    ActivityIndicator, Button, SectionList, ListItem, ScrollView
} from 'react-native';
import { passmanAppUri } from '../index'
import Credential from '../model/Credential'
import Vault from '../model/Vault'
import Base64 from '../model/Base64'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';

export default class CredentialsScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'Credentials',
        headerTitleStyle: {
            color: '#fff'
        },
        headerStyle: {
            backgroundColor: '#007AC7'
        },
        headerTintColor: '#fff',
        headerLeft: (

            <TouchableHighlight underlayColor={"transparent"} onPress={() => {navigation.navigate("VaultsScreen")}}>
                <Text style={{
                    color: 'white',
                    padding: 10,
                    paddingLeft: 15,
                    fontSize: 16
                }}><FontAwesome>{Icons.database}</FontAwesome></Text>
            </TouchableHighlight>
        ),
        tabBarLabel: 'Credentials',
        tabBarIcon: ({tintColor}) => ((<Text style={{color: tintColor, fontSize: 24}}><FontAwesome>{Icons.key}</FontAwesome></Text>))
    });

    constructor(props) {
        super(props)
        this.state = {vaults: [], isLoading: true, imagesLoaded: false, currentVault: null}
    }

    componentWillMount() {
        const { params } = this.props.navigation.state
        AsyncStorage.getItem("defaultVault").then((response) => JSON.parse(response)).then((responseJson) => {
            if(responseJson == null) {
                this.props.navigation.navigate("VaultsScreen")
                return
            }

            if(params == null || params.vaultKeys == null) {
                AsyncStorage.getItem("vaultKeys").then((response) => JSON.parse(response)).then((responseJsonKeys) => {
                    console.log(responseJsonKeys)
                    if(responseJsonKeys == null || responseJsonKeys == {} || responseJsonKeys[responseJson] == null) {
                        this.props.navigation.navigate("VaultsScreen")
                        return
                    }
                    this.setState({vaultKeys: responseJsonKeys})
                    this.setState({currentVault: responseJson})
                    this.loadCredentials(responseJson).then(() => {
                        this.setState({isLoading: false})
                    })
                })
            } else {
                var vaultKeys = []
                vaultKeys[responseJson] = params.vaultKeys
                this.setState({vaultKeys: vaultKeys})
                this.setState({currentVault: responseJson})
                this.loadCredentials(responseJson).then(() => {
                    this.setState({isLoading: false})
                })
            }

        })
    }

    _selectVaults() {
        this.props.navigation.navigate("VaultsScreen")
    }

    _pressCredential(credential) {
        this.props.navigation.navigate("CredentialInfoScreen", {credential: credential})
    }

    async loadCredentials(vaultGuid) {
        server = await AsyncStorage.getItem("url")
        login = await AsyncStorage.getItem("login")
        password = await AsyncStorage.getItem("password")

        this.setState({"url": server})
        this.setState({"login": login})
        this.setState({"password": password})

        try {
            let response =  await fetch(this.state.url + "/" + passmanAppUri + Vault.generateSubUrl(vaultGuid), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Authorization': 'Basic ' + Base64.btoa(this.state.login +':'+this.state.password),
                }
            })

            let responseJson = await response.json()
            let credentials = []

            v = new Vault()
            v.vault_id = responseJson.vault_id
            v.guid = responseJson.guid
            v.name = responseJson.name
            v.created = responseJson.created
            v.private_sharing_key = responseJson.private_sharing_key
            v.public_sharing_key = responseJson.public_sharing_key
            v.last_access = responseJson.last_access
            v.challenge_password = responseJson.challenge_password
            for(i = 0; i < responseJson.credentials.length; i++) {
                let credj = responseJson.credentials[i]

                cre = new Credential();
                cre.credential_id = credj.credential_id
                cre.guid = credj.guid
                cre.vault_id = credj.vault_id
                cre.label = credj.label
                cre.username = credj.username
                cre.password = credj.password
                cre.login = credj.login
                cre.url = credj.url
                cre.description = credj.description
                cre.email = credj.email
                cre.tags = credj.tags
                cre.otp = credj.otp
                cre.custom_fields = credj.custom_fields
                cre.changed = credj.changed
                cre.created = credj.created
                cre.favicon = credj.favicon
                cre.hidden = credj.hidden
                cre.delete_time = credj.delete_time
                cre.expire_time = credj.delete_time

                date = new Date()
                zeroDate = new Date(0 * 1000)
                if(!cre.hidden && !(cre.delete_time > zeroDate && cre.delete_time<date) && !(cre.expire_time > zeroDate && cre.expire_time<date)) {
                    cre.decrypt(this.state.vaultKeys[vaultGuid])
                    credentials.push(cre)
                }
            }
            v.credentials = credentials

            oldvaults = this.state.vaults
            oldvaults[vaultGuid] = v
            this.setState({vaults: oldvaults})
        } catch(e) {
            console.log(e)
            if (e.message == "ccm: tag doesn't match") {
                Alert.alert("Wrong Password", "Please try another password.")
            } else {
                Alert.alert("Loading Error", "Credentials could not be fetched.")
            }
            this.props.navigation.goBack()
        }
    }

    mergeCredentials() {
        credentials = []
        for(i in this.state.vaults) {
            credentials = credentials.concat(this.state.vaults[i].credentials)
        }
        credentials.sort((a, b) => {
            return a.label.localeCompare(b.label)
        })
        return credentials
    }

    sectionize(credentials) {
        var sections = []
        var lastchar = null;
        var currentsection = null;
        for(i in credentials) {
            firstchar = credentials[i].label.charAt(0).toUpperCase()
            if(lastchar != firstchar) {
                if(currentsection != null) sections.push(currentsection)
                currentsection = {data: [], title: firstchar}
            }
            currentsection.data.push(credentials[i])
            lastchar = firstchar
        }
        return sections
    }


    render() {

        let sections = this.sectionize(this.mergeCredentials())
        return (
            <View style={styles.root}>
                <StatusBar
                    barStyle="light-content"
                />
                <SectionList
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={({item}) => <CredentialItem key={item.guid} title={item.label} subTitle={item.url} url={item.url} onPress={() => {this._pressCredential(item)}} />}
                    renderSectionHeader={({section}) =>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>{section.title}</Text>
                        </View>}
                    stickySectionHeadersEnabled={true}
                    renderSectionFooter={() => <View style={styles.sectionSeperator}/>}
                    sections={sections}
                    refreshing={this.state.isLoading}
                    onRefresh={() => {
                        this.loadCredentials(this.state.currentVault).then(() => {
                            this.setState({isLoading: false})
                        })
                    }}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#FAFAFA',
        flex: 1,
    },
    credentialItem: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 0,
        padding: 8,
        paddingLeft: 12
    },
    sectionSeperator: {
        borderTopWidth: 1,
        borderTopColor: '#f1f1f1',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    credentialsTextTitle: {
        paddingLeft: 10,
    },
    credentialsTextDesc: {
        color: '#777',
        fontSize: 10,
        paddingLeft: 10,
    },
    vaultsButton : {
        color: 'white',
        padding: 10,
    },
    sectionHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    sectionHeaderText: {
        fontSize: 20,
        color: '#777',
        paddingLeft: 10,
        paddingTop: 5
    }
})

class CredentialItem extends Component {

    render() {
        return (
            <TouchableHighlight underlayColor='transparent' onPress={this.props.onPress}>
                <View style={styles.credentialItem}>
                    <Image style={{height: 30, width: 30}} source={{uri: "https://icons.better-idea.org/icon?url="+this.props.url+"&size=30..30..256"}}/>
                    <View Style={{flex: 0, flexDirection: 'vertical'}}>
                        <Text style={styles.credentialsTextTitle}>
                            {this.props.title}
                        </Text>
                        <Text style={styles.credentialsTextDesc}>
                            {this.props.subTitle}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

class ItemSeparator extends Component {
    render() {
        return (
            <View style={{height: 1, paddingLeft: 50, backgroundColor: "#fff"}}>
                <View style={{backgroundColor: '#f1f1f1', height: 1}}/>
            </View>)
    }
}