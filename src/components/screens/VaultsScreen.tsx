import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { NavigationActions  } from "react-navigation";
import RNSecureKeyStore from 'react-native-secure-key-store';
import {observer} from "mobx-react";
import VaultStore from '../stores/VaultStore'
import {IVault} from '../../lib/Interfaces'

interface IVaultsScreenProps {
    className?: string;
    store: VaultStore;
    navigation?: any;
}

@observer
export default class VaultsScreen extends Component<IVaultsScreenProps, {}> {

    static navigationOptions = {
        title: 'Vaults',
        tabBarLabel: 'Credentials',
        tabBarIcon: ({tintColor}) => ((<Text style={{color: tintColor, fontSize: 24}}><FontAwesome>{Icons.key}</FontAwesome></Text>))};

    _pressVault(vault) {

        RNSecureKeyStore.get('vaultKeys').then((response) => JSON.parse(response), () => {
                console.log("Error: No Key for vault " + vault.name + ". Navigating to VaultKeyScreen")
                this.props.navigation.navigate("VaultKeyScreen", {vaultGuid: vault.guid})
            })
            .then((responseJson) => {
            if(responseJson === null || responseJson[vault.guid] === null) {
                console.log("No Key for vault " + vault.name + ". Navigating to VaultKeyScreen")
                this.props.navigation.navigate("VaultKeyScreen", {vaultGuid: vault.guid})
            } else {
                console.log("Key found for vault " + vault.name + ". Navigating to CredentailsScreen");
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
                <View style={styles.root}>
                    <ActivityIndicator animating={this.props.store.isLoading}/>
                    <ScrollView style={styles.vaultList}>
                        {
                            this.props.store.vaults.map((v: IVault) => <VaultItem vault={v} onPress={() => this._pressVault(v)} key={v.guid} /> )
                        }
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
        paddingLeft: 12,
    }
});

const VaultItem = (props) => {
    return (
        <TouchableHighlight key={props.vault.guid} onPress={props.onPress}>
            <View style={styles.contentContainer}>
                <Text>{props.vault.name}</Text>
            </View>
        </TouchableHighlight>
    )
};


