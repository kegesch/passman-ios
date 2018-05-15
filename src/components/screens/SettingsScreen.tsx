import React from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {ScrollView, Text} from 'react-native';
import {StyledRootView} from '../StyledComponents';
import {inject, observer} from 'mobx-react/native';
import {INavigationScreenProps} from '../../lib/Interfaces';
import VaultStore from '../stores/VaultStore';
import ConnectionStore from '../stores/ConnectionStore';
import MasterPasswordStore from '../stores/MasterPasswordStore';
import DefaultColors from '../DefaultColors';

interface ISettingsScreenProps extends INavigationScreenProps {
	style?: string;
	vaultStore: VaultStore;
	connectionStore: ConnectionStore;
	masterPasswordStore: MasterPasswordStore;
}

@inject('connectionStore', 'vaultStore', 'masterPasswordStore')
@observer
export default class SettingsScreen extends React.Component<ISettingsScreenProps, {}> {

	static navigationOptions = {
		title: 'Settings',
		tabBarLabel: 'Settings',
		headerTitleStyle: {
			color: DefaultColors.white
		},
		headerStyle: {
			backgroundColor: DefaultColors.blue
		},
		headerTintColor: DefaultColors.white,
		tabBarIcon: ({tintColor}) => ((<Text style={{color: tintColor, fontSize: 24}}><FontAwesome>{Icons.cogs}</FontAwesome></Text>))
	};

	render() {
		return (
			<StyledRootView>
				<ScrollView>
					<Text>Connection</Text>
					<Text>{JSON.stringify(this.props.connectionStore.connection, null, 2)}</Text>
					<Text>MasterPassword</Text>
					<Text>{JSON.stringify(this.props.masterPasswordStore.masterpassword, null, 2)}</Text>
					<Text>{JSON.stringify(this.props.masterPasswordStore.activateBiometrics, null, 2)}</Text>
					<Text>Vaults</Text>
					<Text>{JSON.stringify(this.props.vaultStore.vaults, null, 2)}</Text>
					<Text>{JSON.stringify(this.props.vaultStore.selectedVault, null, 2)}</Text>
					<Text>{JSON.stringify(this.props.vaultStore.vaultKeys, null, 2)}</Text>
					<Text>{JSON.stringify(this.props.vaultStore.selectedVaultKey, null, 2)}</Text>
				</ScrollView>
			</StyledRootView>
		);
	}
}