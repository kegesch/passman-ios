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
		headerTintColor: DefaultColors.white,
	};

	private BASE_CACHE_DIR = RNFetchBlob.fs.dirs.CacheDir + '/react-native-img-cache';

	constructor(props) {
		super(props);

		this.state = {cacheSize: '0B'};
	}

	clearCache() {
		ImageCache.get().clear();
	}

	async calculateCacheSize(): Promise<string> {
		try {
			const cacheStat = await RNFetchBlob.fs.stat(this.BASE_CACHE_DIR);
			return this.humanFileSize(cacheStat.size, false);
		} catch (err) {
			console.error('could not calculate cache size.', err);
			return '0B';
		}
	}

	humanFileSize(bytes, si) {
		let thresh = si ? 1000 : 1024;
		if (Math.abs(bytes) < thresh) {
			return bytes + ' B';
		}
		let units = si
			? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
			: ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
		let u = -1;
		do {
			bytes /= thresh;
			++u;
		} while (Math.abs(bytes) >= thresh && u < units.length - 1);
		return bytes.toFixed(1) + ' ' + units[u];
	}

	async UNSAFE_componentWillMount() {
		this.setState({cacheSize: await this.calculateCacheSize()});
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
					<List>
						<SettingsTouchTextItem highlighted label={'Clear Cache'} rightText={this.state.cacheSize} onPress={() => this.clearCache()} />
					</List>
				</ScrollView>
			</StyledRootView>
		);
	}
}