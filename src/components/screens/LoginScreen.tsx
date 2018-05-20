import React, { Component } from 'react';
import {Alert} from 'react-native';
import ConnectionStore from '../stores/ConnectionStore';
import {
	StyledRootView, CenteredView, List, ListInput,
	ListButton, StyledActivityIndicator, Header
} from '../StyledComponents';
import {inject, observer} from 'mobx-react/native';
import {INavigationScreenProps} from '../../lib/Interfaces';
import MasterPasswordStore from '../stores/MasterPasswordStore';

interface ILoginScreenProps extends INavigationScreenProps {
	style?: string;
	connectionStore?: ConnectionStore;
	masterPasswordStore?: MasterPasswordStore;
}

@inject('connectionStore')
@inject('masterPasswordStore')
@observer
export default class LoginScreen extends Component<ILoginScreenProps, {}> {

	static navigationOptions = { title: 'Welcome', header: null };

	async componentWillMount() {
		// await this.props.connectionStore.loadConnection();

		// nextcloud credentials already saved?
		const isConnectionSaved = this.props.connectionStore.isConnectionSaved;
		if (isConnectionSaved) {
			console.log('Connection is Saved! -> Navigating further');
			this.navigateFurther();
		} else {
			console.log('Connection is not Saved!');
		}
	}

	navigateFurther() {
		let routeName = 'SetupMasterPasswordScreen';
		if (this.props.masterPasswordStore.isMasterPasswordValid) routeName = 'LockScreen';

		this.props.navigation.replace(routeName);
	}

	async saveLoginData() {
		if (this.props.connectionStore.isConnectionValid) {
			if (await this.props.connectionStore.saveConnection(this.props.connectionStore.connection)) {
				this.navigateFurther();
			} else {
				Alert.alert('Credentials could not be saved! Try again!');
			}

		} else {
			Alert.alert('Credentials are not valid.');
		}
	}

	render() {
		const loading = <StyledActivityIndicator animating={this.props.connectionStore.isLoading}/>;

		const connectionSettings =
			<List
				scrollable
				button={
					<CenteredView>
						<ListButton
							title="Next"
							onPress={() => this.saveLoginData()}
						/>
					</CenteredView>
				}
			>
				<ListInput
					label="Address"
					placeholder="https://next.cloud.com"
					keyboardType="url"
					returnKeyType="next"
					onChangeText={(url) => this.props.connectionStore.setConnectionInfo('url', url)}
				/>
				<ListInput
					label="Username"
					placeholder="John Appleseed"
					returnKeyType="next"
					onChangeText={(username) => this.props.connectionStore.setConnectionInfo('username', username)}
				/>
				<ListInput
					secureTextEntry
					label="Password"
					placeholder="password"
					returnKeyType="done"
					onChangeText={(password) => this.props.connectionStore.setConnectionInfo('password', password)}
				/>
			</List>;

		return (
			<StyledRootView>
				<Header />
				{this.props.connectionStore.isLoading
					? loading
					: connectionSettings
				}
			</StyledRootView>
		);
	}
}
