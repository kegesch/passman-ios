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
}

export class App extends React.Component<{}, IAppState> {

	constructor(props) {
		super(props);

		this.state = {isLoading: true};
	}

	componentDidMount() {
		AppState.addEventListener('change', this._handleAppStateChange);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
	}

	_handleAppStateChange = (nextAppState) => {
		if (nextAppState === /inactive|background/) {
			console.log('Replace screen with LockScreen'); // TODO
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
					<Navigator/>
				</Provider>
			</Loader>
		);
	}

}