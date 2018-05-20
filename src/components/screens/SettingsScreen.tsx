import React from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {Image, Linking, ScrollView, Text} from 'react-native';
import {
	CenteredView,
	CredentialInfo,
	CredentialInfoText,
	IconText,
	List,
	SettingsListItem,
	SettingsListSeperator,
	StyledRootView
} from '../StyledComponents';
import {INavigationScreenProps} from '../../lib/Interfaces';
import DefaultColors from '../DefaultColors';
import VersionNumber from 'react-native-version-number';

interface ISettingsScreenProps extends INavigationScreenProps {
	style?: string;
}

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
					<CenteredView>
						<Image
							style={{width: 100, height: 100, marginTop: 20, marginBottom: 5}}
							borderRadius={100 * 10 / 57} source={require('../../../resources/apple-touch-icon.png')}/>
						<CredentialInfoText>Version {VersionNumber.appVersion}</CredentialInfoText>
					</CenteredView>
					<List separatorComponent={SettingsListSeperator}>
						<SettingsListItem
							icon={
								<IconText style={{color: DefaultColors.blue}}><FontAwesome>{Icons.server}</FontAwesome></IconText>
							}
							label={'nextcloud connection'}
							onPress={() => this.props.navigation.navigate('ConnectionSettings')}
						/>
						<SettingsListItem
							icon={
								<IconText style={{color: DefaultColors.orange}}><FontAwesome>{Icons.lock}</FontAwesome></IconText>
							}
							label={'masterpassword'}
							onPress={() => this.props.navigation.navigate('MasterPasswordSettings')}
						/>
						<SettingsListItem
							icon={
								<IconText style={{color: DefaultColors.grey}}><FontAwesome>{Icons.cogs}</FontAwesome></IconText>
							}
							label={'vaults'}
							onPress={() => console.log('pressed vaults')}
						/>
					</List>
					<List separatorComponent={SettingsListSeperator}>
						<SettingsListItem
							icon={
								<IconText style={{color: DefaultColors.darkGrey}}><FontAwesome>{Icons.githubSquare}</FontAwesome></IconText>
							}
							label={'feedback'}
							onPress={() => Linking.openURL('https://github.com/Y0nnyy/passman-ios/issues/new/choose')}
						/>
					</List>
				</ScrollView>
			</StyledRootView>
		);
	}
}