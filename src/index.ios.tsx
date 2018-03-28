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

const credentialsNavigator = StackNavigator({
	CredentialsScreen: { screen: CredentialsScreen },
	VaultsScreen: {screen: VaultsScreen},
	VaultKeyScreen: {screen: VaultKeyScreen},
	CredentialInfoScreen: { screen: CredentialInfoScreen }
}, {
	navigationOptions: {
		headerTitleStyle: {
			color: '#fff'
		},
		headerStyle: {
			backgroundColor: '#007AC7'
		},
		headerTintColor: '#fff'
	}
})

const optionsNavigator = StackNavigator({
	OptionsScreen: {screen: SettingsScreen},
	LoginSettingsScreen: {screen: LoginSettingsScreen}
}, {
	navigationOptions: {
		headerTitleStyle: {
			color: '#fff'
		},
		headerStyle: {
			backgroundColor: '#007AC7'
		},
		headerTintColor: '#fff'
	}
})

const appNavigator = TabNavigator({
	CredentialsTab: {screen: credentialsNavigator},
	OptionsTab: {screen: optionsNavigator}
}, {
	swipeEnabled: false,
	tabBarOptions: {
		activeTintColor: '#007AC7'
	}
})

const baseAppNavigator = StackNavigator({
	LoginScreen: {screen: LoginScreen},
	LockScreen: {screen: LockScreen},
	AppNavigator: {screen: appNavigator}
}, {
	navigationOptions: {
		header: undefined,
		swipeEnabled: false
	}
})

const passmanService = new PassmanService();

const stores = {
	vaultStore: new VaultStore(passmanService),
}

export const App = () => {
	return (
		<Provider vaultStore={stores.vaultStore}>
			{baseAppNavigator}
		</Provider>
	)
}