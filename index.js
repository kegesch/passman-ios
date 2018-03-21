import "node-libs-react-native/globals";
import {AppRegistry, AppState} from 'react-native';
import LockScreen from './src/components/LockScreen';
import LoginScreen from './src/components/LoginScreen';
import VaultsScreen from './src/components/VaultsScreen';
import VaultKeyScreen from './src/components/VaultKeyScreen'
import CredentialsScreen from './src/components/CredentialsScreen'
import CredentialInfoScreen from './src/components/CredentialInfoScreen'
import SettingsScreen from './src/components/SettingsScreen'
import LoginSettingsScreen from './src/components/LoginSettingsScreen'
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';

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
    LockScreen: {screen: LockScreen},
    AppNavigator: {screen: AppNavigator}
}, {
    navigationOptions: {
        header: null,
        swipeEnabled: false,
    }
});

AppRegistry.registerComponent('Passman', () => BaseAppNavigator);




