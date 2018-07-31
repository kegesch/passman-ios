import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image, Linking, ScrollView, Text} from 'react-native';
import {
	CenteredView,
	CredentialInfoText,
	IconView,
	List,
	SettingsListItem,
	SettingsListSeperator, SettingsTouchTextItem,
	StyledRootView
} from '../StyledComponents';
import {INavigationScreenProps} from '../../lib/Interfaces';
import DefaultColors from '../DefaultColors';
import VersionNumber from 'react-native-version-number';
import RNFetchBlob from 'react-native-fetch-blob';
import {ImageCache} from 'react-native-img-cache';

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
								<IconView><Icon name={'ios-contacts'} size={30} color={DefaultColors.blue}/></IconView>
							}
							label={'nextcloud connection'}
							onPress={() => this.props.navigation.navigate('ConnectionSettings')}
						/>
						<SettingsListItem
							icon={
								<IconView><Icon name={'ios-lock'}  size={30} color={DefaultColors.orange}/></IconView>
							}
							label={'masterpassword'}
							onPress={() => this.props.navigation.navigate('MasterPasswordSettings')}
						/>
						<SettingsListItem
							icon={
								<IconView><Icon name={'ios-list'}  size={30} color={DefaultColors.grey}/></IconView>
							}
							label={'vaults'}
							onPress={() => this.props.navigation.navigate('VaultSettings')}
						/>
					</List>
					<List separatorComponent={SettingsListSeperator}>
						<SettingsListItem
							icon={
								<IconView><Icon name={'logo-github'}  size={30} color={DefaultColors.darkGrey}/></IconView>
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