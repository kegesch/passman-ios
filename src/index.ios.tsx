import LockScreen from "./components/screens/LockScreen"
import LoginScreen from './components/screens/LoginScreen'
import VaultsScreen from './components/screens/VaultsScreen'
import VaultKeyScreen from './components/screens/VaultKeyScreen'
import CredentialsScreen from './components/screens/CredentialsScreen'
import CredentialInfoScreen from './components/screens/CredentialInfoScreen'
import SettingsScreen from './components/screens/SettingsScreen'
import LoginSettingsScreen from './components/screens/LoginSettingsScreen'
import {StackNavigator, TabNavigator} from 'react-navigation'
import {Provider} from 'mobx-react'
import VaultStore from './components/stores/VaultStore'
import * as React from 'react'
import PassmanService from './lib/services/PassmanService'
import ConnectionStore from './components/stores/ConnectionStore'
import DefaultColors from './components/DefaultColors'
import SetupMasterPasswordScreen from './components/screens/SetupMasterPasswordScreen'
import MasterPasswordStore from './components/stores/MasterPasswordStore'
import StorageService from './lib/services/StorageService'

const CredentialsNavigator = StackNavigator({
	CredentialsScreen: { screen: CredentialsScreen },
	VaultsScreen: {screen: VaultsScreen},
	VaultKeyScreen: {screen: VaultKeyScreen},
	CredentialInfoScreen: { screen: CredentialInfoScreen }
}, {
	navigationOptions: {
		headerTitleStyle: {
			color: DefaultColors.white
		},
		headerStyle: {
			backgroundColor: DefaultColors.blue
		},
		headerTintColor: '#fff'
	}
})

const OptionsNavigator = StackNavigator({
	OptionsScreen: {screen: SettingsScreen},
	LoginSettingsScreen: {screen: LoginSettingsScreen}
}, {
	navigationOptions: {
		headerTitleStyle: {
			color: DefaultColors.white
		},
		headerStyle: {
			backgroundColor: DefaultColors.blue
		},
		headerTintColor: DefaultColors.white
	}
})

const AppNavigator = TabNavigator({
	CredentialsTab: {screen: CredentialsNavigator},
	OptionsTab: {screen: OptionsNavigator}
}, {
	swipeEnabled: false,
	tabBarOptions: {
		activeTintColor: DefaultColors.blue
	}
})

const BaseAppNavigator = StackNavigator({
	LoginScreen: {screen: LoginScreen},
	SetupMasterPasswordScreen: {screen: SetupMasterPasswordScreen},
	LockScreen: {screen: LockScreen},
	AppNavigator: {screen: AppNavigator}
}, {
	navigationOptions: {
		header: undefined,
		swipeEnabled: false
	}
})

const passmanService = new PassmanService();

const stores = {
	vaultStore: new VaultStore(passmanService),
	connectionStore: new ConnectionStore(passmanService),
	masterPasswordStore: new MasterPasswordStore(),
}

export class App extends React.Component {

	async componentWillMount() {
		await stores.connectionStore.loadConnection();
		await stores.masterPasswordStore.load
	}

	render() {
		return (
			<Provider {...stores}>
				<BaseAppNavigator />
			</Provider>
		)
	}

}