import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DefaultColors from './DefaultColors';
import SettingsScreen from './screens/SettingsScreen';
import VaultKeyScreen from './screens/VaultKeyScreen';
import CredentialsScreen from './screens/CredentialsScreen';
import CredentialInfoScreen from './screens/CredentialInfoScreen';
import SetupMasterPasswordScreen from './screens/SetupMasterPasswordScreen';
import LoginScreen from './screens/LoginScreen';
import LockScreen from './screens/LockScreen';
import ConnectionSettingsScreen from './screens/settings/ConnectionSettingsScreen';
import MasterPasswordSettingsScreen from './screens/settings/MasterPasswordSettingsScreen';
import VaultSettingsScreen from './screens/settings/VaultSettingsScreen';

const CredentialsNavigator = createStackNavigator({
	CredentialsScreen: { screen: CredentialsScreen },
	VaultKeyScreen: {screen: VaultKeyScreen},
	CredentialInfoScreen: { screen: CredentialInfoScreen }
}, {
	header: null
});

const OptionsNavigator = createStackNavigator({
	OptionsScreen: {screen: SettingsScreen},
	ConnectionSettings: {screen: ConnectionSettingsScreen},
	MasterPasswordSettings: {screen: MasterPasswordSettingsScreen},
	VaultSettings: {screen: VaultSettingsScreen}
}, {
	header: null
});

const TabNavigator = createBottomTabNavigator(
	{
		CredentialsTab: CredentialsNavigator,
		OptionsTab: OptionsNavigator
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'CredentialsTab') {
					iconName = 'ios-key';
				} else if (routeName === 'OptionsTab') {
					iconName = 'ios-cog';
				}
				return <Icon name={iconName} size={30} color={tintColor} />;
			},
			tabBarLabel: (navigation.state.routeName === 'CredentialsTab' ? 'Credentials' : 'Settings')
		}),
		tabBarOptions: {
			inactiveTintColor: DefaultColors.grey,
			activeTintColor: DefaultColors.blue,
			borderTopColor: DefaultColors.darkGrey
		}
	}
);

export default createStackNavigator({
	LoginScreen: {screen: LoginScreen},
	SetupMasterPasswordScreen: {screen: SetupMasterPasswordScreen},
	LockScreen: {screen: LockScreen},
	AppNavigator: {screen: TabNavigator}
}, {
	navigationOptions: {
		header: null,
		swipeEnabled: false
	}
});