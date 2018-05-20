import React from 'react';
import {Alert, Text} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {inject, observer} from 'mobx-react/native';
import {INavigationScreenProps} from '../../lib/Interfaces';
import VaultStore from '../stores/VaultStore';
import {
	HeaderButton,
	HeaderView, SettingsInput,
	SettingsList,
	SettingsSwitch,
	StyledActivityIndicator,
	StyledRootView
} from '../StyledComponents';

interface IVaultKeyScreenProps extends INavigationScreenProps {
	style?: string;
	vaultStore?: VaultStore;
	onClose: () => void;
}

@inject('vaultStore')
@observer
export default class VaultKeyScreen extends React.Component<IVaultKeyScreenProps, {}> {

	static navigationOptions = {
		title: 'Key',
		tabBarLabel: 'Credentials',
		tabBarIcon: ({tintColor}) => ((<Text style={{color: tintColor, fontSize: 24}}><FontAwesome>{Icons.key}</FontAwesome></Text>))};

	async onClose() {
		if (await this.props.vaultStore.saveVaultKey()) this.props.onClose();
		else Alert.alert('Key was invalid or could not be saved.');
	}

	render() {

		const settingsList = (
		<SettingsList scrollable
						info={'Please enter the valid key for vault "' + this.props.vaultStore.selectedVault.name +
						'". When the option "save" will be enabled, the vaultkey will be stored securely on your device!'}>
				<SettingsInput label={'Key'}
					secureTextEntry
					placeholder={'password'}
					returnKeyType={'done'}
					onChangeText={(value) => this.props.vaultStore.editVaultKey(value)}
				/>
				<SettingsSwitch
					label={'Save'}
					value={this.props.vaultStore.selectedVaultKey.shouldBeSaved}
					onValueChange={(value) => this.props.vaultStore.selectedVaultKey.shouldBeSaved = value}
			/>
			</SettingsList>
		);

		return (
			<StyledRootView>
				<HeaderView>
					<HeaderButton title={'Done'} onPress={() => this.onClose()}/>
				</HeaderView>
				{this.props.vaultStore.isLoading
					? <StyledActivityIndicator animating={this.props.vaultStore.isLoading}/>
					: settingsList
				}
			</StyledRootView>
		);
	}
}
