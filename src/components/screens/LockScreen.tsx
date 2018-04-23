import React from 'react'
import {Text, Alert} from 'react-native'
import { NavigationActions } from "react-navigation"
import {inject, observer} from 'mobx-react/native'
import {INavigationScreenProps} from '../../lib/Interfaces'
import MasterPasswordStore from '../stores/MasterPasswordStore'
import BiometricService from '../../lib/services/BiometricService'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {
	CenteredView, Header, SettingsButton, SettingsInput, SettingsList, StyledActivityIndicator,
	StyledRootView
} from '../StyledComponents'
import DefaultColors from '../DefaultColors'

interface ILockScreenProps extends INavigationScreenProps {
    style?: string;
    masterPasswordStore: MasterPasswordStore;
}

@inject('masterPasswordStore')
@observer
export default class LockScreen extends React.Component<ILockScreenProps, {}> {

	static navigationOptions = { header: null }

	async componentDidMount() {
		//will be false, if not authentication method is supported
		if(this.props.masterPasswordStore.activateBiometrics) {
		    const isAuthorized = await BiometricService.authenticate()
		    if(isAuthorized) {
		        this.navigateToAppScreen()
		    }
		}
	}

    async authorize() {
	    if(this.props.masterPasswordStore.activateBiometrics) {
		    const isAuthorized = await BiometricService.authenticate()
		    if(isAuthorized) {
			    this.navigateToAppScreen()
		    }
	    }
    }

    authenticate(pw) {
		if(this.props.masterPasswordStore.masterpassword === pw) {
			this.navigateToAppScreen()
		}
    }

	authenticateFinal() {
		Alert.alert("Wrong password!")
	}

    navigateToAppScreen() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'AppNavigator'})
            ]
        })
       this.props.navigation.dispatch(resetAction);
    }

    render() {
    	let button = null
    	if(this.props.masterPasswordStore.supportedBiometrics !== null) {
    		button = <CenteredView>
					    <SettingsButton
						    title={this.props.masterPasswordStore.supportedBiometrics}
						    onPress={() => this.authorize()}
					    />
				    </CenteredView>
	    }

	    const loading = <StyledActivityIndicator animating={this.props.masterPasswordStore.isLoading}/>;

	    const masterPasswordSettings =
		    <SettingsList button={button}>
			    <SettingsInput
				    secureTextEntry
				    label="Password"
				    placeholder="masterpassword"
				    returnKeyType="done"
				    onChangeText={(pw) => this.authenticate(pw)}
				    onEndEditing={() => this.authenticateFinal()}
			    />
		    </SettingsList>;

	    return (
	    	<StyledRootView>
			    <Header />
			    {this.props.masterPasswordStore.isLoading
				    ? loading
				    : masterPasswordSettings
			    }
		    </StyledRootView>
	    )
    }
}
