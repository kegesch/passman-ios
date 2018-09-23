import {Provider} from 'mobx-react';
import VaultStore from './components/stores/VaultStore';
import * as React from 'react';
import PassmanService from './lib/services/PassmanService';
import ConnectionStore from './components/stores/ConnectionStore';
import MasterPasswordStore from './components/stores/MasterPasswordStore';
import {AppState} from 'react-native';
import CredentialsStore from './components/stores/CredentialsStore';
import {Loader} from './components/screens/Loader';
import Navigator from './components/Navigator';
import {StackActions, NavigationActions} from 'react-navigation';

const passmanService = new PassmanService();
const vaultStore = new VaultStore(passmanService);

const stores = {
	connectionStore: new ConnectionStore(passmanService),
	vaultStore: vaultStore,
	credentialsStore: new CredentialsStore(passmanService, vaultStore),
	masterPasswordStore: new MasterPasswordStore()
};

interface IAppState {
	isLoading: boolean;
	navigationState: any;
}

export class App extends React.Component<{}, IAppState> {

	private navigator: any;

	constructor(props) {
		super(props);

		this.state = {isLoading: true, navigationState: null};
	}

	componentDidMount() {
		AppState.addEventListener('change', this._handleAppStateChange);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
	}

	_handleAppStateChange = (nextAppState) => {
		if (
			nextAppState === 'inactive' &&
			this.state.navigationState &&
			this.getActiveRouteName(this.state.navigationState).indexOf('AppNavigator') > -1 &&
			this.navigator !== undefined) {
			this.navigateToLockScreen();
		}
	}

	async componentWillMount() {
		console.log('initializing stores');

		// make sure connection is loaded (and passmanservice knows it)
		await stores.connectionStore.initialize();

		// initialize all stores
		await Promise.all(Object.keys(stores).map((key) => stores[key].initialize()));
		this.setState({isLoading: false});
	}

	render() {
		return (
			<Loader isLoading={this.state.isLoading}>
				<Provider {...stores}>
					<Navigator
						ref={navigator => this.navigator = navigator}
						onNavigationStateChange={(currentState) => {
							this.setState({navigationState: currentState});
						}}
					/>
				</Provider>
			</Loader>
		);
	}

	private navigateToLockScreen() {
		const resetAction = StackActions.reset({
			index: 0,
			key: null,
			actions: [
				NavigationActions.navigate({ routeName: 'LockScreen', params: { resetOrder: 1 }})
			]
		});
		this.navigator.dispatch(resetAction);
	}

	private getActiveRouteName(navigationState) {
		if (!navigationState) {
			return null;
		}
		const route = navigationState.routes[navigationState.index];
		// dive into nested navigators
		if (route.routes) {
			return this.getActiveRouteName(route) + '/' + route.routeName;
		} else {
			return route.routeName;
		}
	}

}