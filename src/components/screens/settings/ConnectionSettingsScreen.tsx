import ConnectionStore from '../../stores/ConnectionStore';
import {inject, observer} from 'mobx-react/native';
import React from 'react';
import {List, ListButton, ListText, StyledRootView} from '../../StyledComponents';
import DefaultColors from '../../DefaultColors';
import {StackActions, NavigationActions} from 'react-navigation';
import {INavigationScreenProps} from '../../../lib/Interfaces';
import MasterPasswordStore from '../../stores/MasterPasswordStore';
import VaultStore from '../../stores/VaultStore';

interface IConnectionSettingsScreenProps extends INavigationScreenProps {
	style?: string;
	connectionStore: ConnectionStore;
	masterPasswordStore: MasterPasswordStore;
	vaultStore: VaultStore;
}

@inject('connectionStore')
@inject('masterPasswordStore')
@inject('vaultStore')
@observer
export default class ConnectionSettingsScreen extends React.Component<IConnectionSettingsScreenProps, {}> {

	static navigationOptions = {
		title: '',
		headerTitleStyle: {
			color: DefaultColors.white
		},
		headerStyle: {
			backgroundColor: DefaultColors.blue
		},
		headerTintColor: DefaultColors.white
	};

	async resetApp() {
		await this.props.connectionStore.resetConnection();
		await this.props.masterPasswordStore.reset();
		await this.props.vaultStore.reset();

		const resetAction = StackActions.reset({
			index: 0,
			key: null,
			actions: [
				NavigationActions.navigate({ routeName: 'LoginScreen', params: { resetOrder: 1 }})
			]
		});
		this.props.navigation.dispatch(resetAction);
	}

	render() {
		const button = <ListButton title={'Reset'} onPress={() => this.resetApp()}/>

		return (
			<StyledRootView>
				<List
					scrollable
					button={button}
					info={'With "Reset", the connection-data and the app with it will be reset.'}
				>
					<ListText label={'Url'} text={this.props.connectionStore.connection.url}/>
					<ListText label={'Username'} text={this.props.connectionStore.connection.username}/>
					<ListText label={'Password'} text={this.props.connectionStore.connection.password}/>
				</List>
			</StyledRootView>
		);
	}

}