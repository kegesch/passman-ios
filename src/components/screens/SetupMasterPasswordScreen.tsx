import * as React from 'react';
import {
	StyledRootView, Header, StyledActivityIndicator, SettingsList, SettingsInput, SettingsListSeparator,
	SettingsButton, CenteredView, SettingsSwitch
} from '../StyledComponents';
import ConnectionStore from '../stores/ConnectionStore';
import {INavigationScreenProps} from '../../lib/Interfaces';
import {inject, observer} from 'mobx-react/native';
import {Alert} from 'react-native';
import { NavigationActions } from "react-navigation";

interface ISetupMasterPasswordScreenProps extends INavigationScreenProps {
	style?: string;
	masterPasswordStore?: ConnectionStore;
}

@inject('masterPasswordStore')
@observer
export default class SetupMasterPasswordScreen extends React.Component<ISetupMasterPasswordScreenProps, {}> {

	static navigationOptions = { header: null };

	async save() {
		console.log("Save");
		const successful = await this.props.masterPasswordStore.saveMasterPassword();
		if(successful) {
			this.navigateFurther();
		} else {
			Alert.alert("Passwords are not equal or could not be saved! Try again!");
		}
	}

	navigateFurther() {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'AppNavigator'})
			]
		})
		this.props.navigation.dispatch(resetAction)
	}

	render() {
		return (
			<StyledRootView>
				<Header />
				<StyledActivityIndicator animating={this.props.masterPasswordStore.isLoading}/>
				<SettingsList button={
					<CenteredView>
						<SettingsButton
							title="Save"
							onPress={() => this.save()}
						/>
					</CenteredView>
				}>
					<SettingsInput
						secure
						label="Password"
						placeholder="masterpassword"
						returnKeyType="next"
						onChangeText={(pw) => this.props.masterPasswordStore.setMasterPassword(pw)}
					/>
					<SettingsListSeparator />
					<SettingsInput
						secure
						label="Again"
						placeholder="masterpassword"
						returnKeyType="done"
						onChangeText={(pw) => this.props.masterPasswordStore.setMasterPasswordAgain(pw)}
					/>
					<SettingsListSeparator />
					<SettingsSwitch
						label={"TouchID"}
						value={this.props.masterPasswordStore.activateBiometrics}
						onValueChange={(value) => this.props.masterPasswordStore.setBiometricsActivation(value)}
					/>
				</SettingsList>
			</StyledRootView>
		)
	}

}