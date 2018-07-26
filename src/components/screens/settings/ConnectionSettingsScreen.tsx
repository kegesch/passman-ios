import ConnectionStore from '../../stores/ConnectionStore';
import {inject, observer} from 'mobx-react/native';
import React from 'react';
import {List, ListText, StyledRootView} from '../../StyledComponents';
import DefaultColors from '../../DefaultColors';

interface IConnectionSettingsScreenProps {
	style?: string;
	connectionStore: ConnectionStore;
}

@inject('connectionStore')
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

	render() {
		return (
			<StyledRootView>
				<List scrollable>
					<ListText label={'Url'} text={this.props.connectionStore.connection.url}/>
					<ListText label={'Username'} text={this.props.connectionStore.connection.username}/>
					<ListText label={'Password'} text={this.props.connectionStore.connection.password}/>
				</List>
			</StyledRootView>
		);
	}

}