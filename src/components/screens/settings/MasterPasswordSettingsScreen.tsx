import {inject, observer} from 'mobx-react/native';
import React from 'react';
import {
	CenteredView,
	Header,
	List,
	ListButton,
	ListInput,
	ListSwitch,
	ListText,
	StyledActivityIndicator,
	StyledRootView
} from '../../StyledComponents';
import DefaultColors from '../../DefaultColors';
import MasterPasswordStore from '../../stores/MasterPasswordStore';
import {Alert, ScrollView} from 'react-native';
import {INavigationScreenProps} from '../../../lib/Interfaces';

interface IMasterPasswordSettingsScreenProps extends INavigationScreenProps {
	style?: string;
	masterPasswordStore: MasterPasswordStore;
}

@inject('masterPasswordStore')
@observer
export default class MasterPasswordSettingsScreen extends React.Component<IMasterPasswordSettingsScreenProps, {}> {

	static navigationOptions = {
		title: '',
		headerTitleStyle: {
			color: DefaultColors.white
		},
		headerStyle: {
			backgroundColor: DefaultColors.blue,
		},
		headerTintColor: DefaultColors.white,
	};

	async save() {
		if (this.props.masterPasswordStore.isMasterPasswordValid) {
			await this.props.masterPasswordStore.save();
			console.log('MasterPassword was saved successfully.');
			Alert.alert('MasterPassword was changed!');
			this.props.navigation.goBack();
		} else {
			Alert.alert('Passwords are not equal or could not be saved! Try again!');
		}
	}

	render() {
		let biometricsSwitch = null;
		if (this.props.masterPasswordStore.supportedBiometrics) {
			biometricsSwitch = <ListSwitch
				label={this.props.masterPasswordStore.supportedBiometrics}
				value={this.props.masterPasswordStore.activateBiometrics}
				onValueChange={(value) => this.props.masterPasswordStore.setBiometricsActivation(value)}
			/>;
		}

		const settingsPassword =
			<List
				scrollable
				button={
					<CenteredView>
						<ListButton
							title="Save"
							onPress={() => this.save()}
						/>
					</CenteredView>
				}>
				<ListInput
					secureTextEntry
					label="Password"
					placeholder="masterpassword"
					returnKeyType="next"
					onChangeText={(pw) => this.props.masterPasswordStore.setMasterPassword(pw)}
				/>
				<ListInput
					secureTextEntry
					label="Again"
					placeholder="masterpassword"
					returnKeyType="done"
					onChangeText={(pw) => this.props.masterPasswordStore.setMasterPasswordAgain(pw)}
				/>
				{biometricsSwitch}
			</List>;

		const loading = <StyledActivityIndicator animating={this.props.masterPasswordStore.isLoading}/>;

		return (
			<StyledRootView>
				{this.props.masterPasswordStore.isLoading
					? loading
					: settingsPassword
				}
			</StyledRootView>
		);
	}

}