import LockScreen from "./components/screens/LockScreen"
import LoginScreen from './components/screens/LoginScreen'
import VaultKeyScreen from './components/screens/VaultKeyScreen'
import CredentialsScreen from './components/screens/CredentialsScreen'
import CredentialInfoScreen from './components/screens/CredentialInfoScreen'
import SettingsScreen from './components/screens/SettingsScreen'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import {Provider} from 'mobx-react'
import VaultStore from './components/stores/VaultStore'
import * as React from 'react'
import PassmanService from './lib/services/PassmanService'
import ConnectionStore from './components/stores/ConnectionStore'
import DefaultColors from './components/DefaultColors'
import SetupMasterPasswordScreen from './components/screens/SetupMasterPasswordScreen'
import MasterPasswordStore from './components/stores/MasterPasswordStore'
import {AppState, View} from 'react-native'
import CredentialsStore from './components/stores/CredentialsStore'

const CredentialsNavigator = createStackNavigator({
	CredentialsScreen: { screen: CredentialsScreen },
	VaultKeyScreen: {screen: VaultKeyScreen},
	CredentialInfoScreen: { screen: CredentialInfoScreen }
}, {
	header: null
});

const OptionsNavigator = createStackNavigator({
	OptionsScreen: {screen: SettingsScreen}
}, {
    header: null
});

const AppNavigator = createBottomTabNavigator({
	CredentialsTab: {screen: CredentialsNavigator},
	OptionsTab: {screen: OptionsNavigator}
}, {
	swipeEnabled: false,
	tabBarOptions: {
		activeTintColor: DefaultColors.blue,
		borderTopColor: DefaultColors.darkGrey,
	}
});

const BaseAppNavigator = createStackNavigator({
	LoginScreen: {screen: LoginScreen},
	SetupMasterPasswordScreen: {screen: SetupMasterPasswordScreen},
	LockScreen: {screen: LockScreen},
	AppNavigator: {screen: AppNavigator}
}, {
	navigationOptions: {
        header: null,
		swipeEnabled: false
	}
});

const passmanService = new PassmanService();
const vaultStore = new VaultStore(passmanService);

const stores = {
	connectionStore: new ConnectionStore(passmanService),
	vaultStore: vaultStore,
	credentialsStore: new CredentialsStore(passmanService, vaultStore),
	masterPasswordStore: new MasterPasswordStore(),
};

interface IAppState {
	isLoading: boolean;
}

export class App extends React.Component<{}, IAppState> {

	constructor(props) {
		super(props);

		this.state = {isLoading: true};
	}


    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === /inactive|background/) {
            console.log("Replace screen with LockScreen"); //TODO
        }
    }

	async componentWillMount() {
        console.log("initializing stores")

		//make sure connection is loaded (and passmanservice knows it)
		await stores.connectionStore.initialize();

		// initialize all stores
		await Promise.all(Object.keys(stores).map((key) => stores[key].initialize()));
		this.setState({isLoading: false})
	}

	render() {
		if(this.state.isLoading) return <View />;
		return (
			<Provider {...stores}>
				<BaseAppNavigator/>
			</Provider>
		)
	}

}