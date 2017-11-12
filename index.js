import {
    AppRegistry
} from 'react-native';
import LoginScreen from './components/LoginScreen';
import VaultsScreen from './components/VaultsScreen';
import VaultKeyScreen from './components/VaultKeyScreen'
import CredentialsScreen from './components/CredentialsScreen'
import CredentialInfoScreen from './components/CredentialInfoScreen'
import SettingsScreen from './components/SettingsScreen'
import LoginSettingsScreen from './components/LoginSettingsScreen'
import { StackNavigator, TabNavigator } from 'react-navigation';

export const passmanAppUri = "index.php/apps/passman/api/v2/"

export const CredentialsNavigator = StackNavigator({
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
        headerTintColor: '#fff',
    }
});

export const OptionsNavigator = StackNavigator({
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
        headerTintColor: '#fff',
    }
});

export const AppNavigator = TabNavigator({
    CredentialsTab: {screen: CredentialsNavigator},
    OptionsTab: {screen: OptionsNavigator},
}, {
    swipeEnabled: false,
    tabBarOptions: {
        activeTintColor: '#007AC7',
    },
});

export const BaseAppNavigator = StackNavigator({
    LoginScreen: {screen: LoginScreen},
    AppNavigator: {screen: AppNavigator}
}, {
    navigationOptions: {
        header: null,
        swipeEnabled: false,
    }
});


AppRegistry.registerComponent('Passman', () => BaseAppNavigator);
