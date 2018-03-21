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
import { NavigationActions  } from "react-navigation";
import VaultContainer from "./container/VaultContainer";
import {Provider, Subscribe} from "../../node_modules/unstated/lib/unstated";

export default class VaultsScreen extends Component {

    static navigationOptions = {
        title: 'Vaults',
        tabBarLabel: 'Credentials',
        tabBarIcon: ({tintColor}) => ((<Text style={{color: tintColor, fontSize: 24}}><FontAwesome>{Icons.key}</FontAwesome></Text>))};

    _pressVault(vault) {
        AsyncStorage.setItem("defaultVault", JSON.stringify(vault.guid))
        AsyncStorage.getItem('vaultKeys').then((response) => JSON.parse(response)).then((responseJson) => {
            if(responseJson === null || responseJson[vault.guid] === null) {
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
         return (
            <Provider>
                <Subscribe to={[VaultContainer]}>
                    {
                        (vaultContainer) => (
                            <View style={styles.root}>
                                <ActivityIndicator style={styles.loading} animating={vaultContainer.state.isLoading}/>
                                <ScrollView style={styles.vaultList}>
                                    {
                                        vaultContainer.state.vaults.map((v) => <VaultItem vault={v} onPress={() => this._pressVault(v)} key={v.guid} />)
                                    }
                                </ScrollView>
                            </View>
                        )
                    }
                </Subscribe>
            </Provider>
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
        paddingLeft: 12,
    }
});

const VaultItem = (props) => {
    console.log(props)
    return (
        <TouchableHighlight key={props.vault.guid} onPress={props.onPress}>
            <View style={styles.contentContainer}>
                <Text>{props.vault.name}</Text>
            </View>
        </TouchableHighlight>
    )
};


