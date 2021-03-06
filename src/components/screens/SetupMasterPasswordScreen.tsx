import React from 'react';
import {
	StyledRootView, Header, StyledActivityIndicator, SettingsList, SettingsInput, SettingsButton, CenteredView, SettingsSwitch
} from '../StyledComponents';
import {INavigationScreenProps} from '../../lib/Interfaces';
import {inject, observer} from 'mobx-react/native';
import {Alert} from 'react-native';
import MasterPasswordStore from '../stores/MasterPasswordStore';

interface ISetupMasterPasswordScreenProps extends INavigationScreenProps {
	style?: string;
	masterPasswordStore?: MasterPasswordStore;
}

@inject('masterPasswordStore')
@observer
export default class SetupMasterPasswordScreen extends React.Component<ISetupMasterPasswordScreenProps, {}> {

	static navigationOptions = { header: null };

	async save() {
		if (this.props.masterPasswordStore.isMasterPasswordValid) {
			await this.props.masterPasswordStore.save();
			console.log('MasterPassword was saved successfully.');
			this.navigateFurther();
		} else {
			Alert.alert('Passwords are not equal or could not be saved! Try again!');
		}
	}

	navigateFurther() {
		this.props.navigation.replace('AppNavigator');
	}

	render() {
		let biometricsSwitch = null;
		if (this.props.masterPasswordStore.supportedBiometrics) {
			biometricsSwitch = <SettingsSwitch
					label={this.props.masterPasswordStore.supportedBiometrics}
					value={this.props.masterPasswordStore.activateBiometrics}
					onValueChange={(value) => this.props.masterPasswordStore.setBiometricsActivation(value)}
				/>;
		}

		const settingsPassword =
			<SettingsList
				scrollable
				button={
					<CenteredView>
						<SettingsButton
							title="Save"
							onPress={() => this.save()}
						/>
					</CenteredView>
				}>
				<SettingsInput
					secureTextEntry
					label="Password"
					placeholder="masterpassword"
					returnKeyType="next"
					onChangeText={(pw) => this.props.masterPasswordStore.setMasterPassword(pw)}
				/>
				<SettingsInput
					secureTextEntry
					label="Again"
					placeholder="masterpassword"
					returnKeyType="done"
					onChangeText={(pw) => this.props.masterPasswordStore.setMasterPasswordAgain(pw)}
				/>
				{biometricsSwitch}
			</SettingsList>;

		const loading = <StyledActivityIndicator animating={this.props.masterPasswordStore.isLoading}/>;

		return (
			<StyledRootView>
				<Header />
				{this.props.masterPasswordStore.isLoading
					? loading
					: settingsPassword
				}
			</StyledRootView>
		);
	}

}