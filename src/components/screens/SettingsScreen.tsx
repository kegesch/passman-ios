import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image, Linking, ScrollView, Text} from 'react-native';
import {
	CenteredView,
	CredentialInfoText,
	IconView,
	List, SettingsIcon,
	SettingsListItem,
	SettingsListSeperator, SettingsTouchTextItem,
	StyledRootView
} from '../StyledComponents';
import {INavigationScreenProps} from '../../lib/Interfaces';
import DefaultColors from '../DefaultColors';
import VersionNumber from 'react-native-version-number';

interface ISettingsScreenProps extends INavigationScreenProps {
	style?: string;
}

interface ISettingsScreenState {
	cacheSize?: string;
}

export default class SettingsScreen extends React.Component<ISettingsScreenProps, ISettingsScreenState> {

	static navigationOptions = {
		title: 'Settings',
		tabBarLabel: 'Settings',
		headerTitleStyle: {
			color: DefaultColors.white
		},
		headerStyle: {
			backgroundColor: DefaultColors.blue
		},
		headerTintColor: DefaultColors.white
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<StyledRootView>
				<ScrollView>
					<CenteredView>
						<Image
							style={{width: 100, height: 100, marginTop: 20, marginBottom: 5}}
							borderRadius={100 * 1 / 4} source={require('../../../resources/apple-touch-icon.png')}/>
						<CredentialInfoText>Version {VersionNumber.appVersion}</CredentialInfoText>
					</CenteredView>
					<List separatorComponent={SettingsListSeperator}>
						<SettingsListItem
							icon={
								<IconView><SettingsIcon name={'ios-contacts'} backgroundColor={DefaultColors.blue} /></IconView>
							}
							label={'nextcloud connection'}
							onPress={() => this.props.navigation.navigate('ConnectionSettings')}
						/>
						<SettingsListItem
							icon={
								<IconView><SettingsIcon name={'ios-lock'} backgroundColor={DefaultColors.orange} /></IconView>
							}
							label={'masterpassword'}
							onPress={() => this.props.navigation.navigate('MasterPasswordSettings')}
						/>
						<SettingsListItem
							icon={
								<IconView><SettingsIcon name={'ios-list'} backgroundColor={DefaultColors.grey} /></IconView>
							}
							label={'vaults'}
							onPress={() => this.props.navigation.navigate('VaultSettings')}
						/>
					</List>
					<List separatorComponent={SettingsListSeperator}>
						<SettingsListItem
							icon={
								<IconView><SettingsIcon name={'logo-github'} backgroundColor={DefaultColors.darkGrey} /></IconView>
							}
							label={'feedback'}
							onPress={() => Linking.openURL('https://github.com/Y0nnyy/passman-ios/issues')}
						/>
					</List>
				</ScrollView>
			</StyledRootView>
		);
	}
}