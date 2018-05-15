import {action, computed, flow, observable} from 'mobx';
import {IConnection, IStore} from '../../lib/Interfaces';
import StorageService from '../../lib/services/StorageService';
import PassmanService from '../../lib/services/PassmanService';

export default class ConnectionStore implements IStore {

	@observable connection: IConnection = {
		url: '',
		username: '',
		password: ''
	};

	@observable isLoading: boolean = false;

	@computed
	get isConnectionValid() {
		if (this.connection === null) return false;
		if (!(this.connection && this.connection.url && this.connection.username && this.connection.password)) {
			return false;
		}

		const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
		if (!this.connection.url.match(expression)) return false;

		return true;
	}

	@computed
	get isConnectionSaved() {
		return (this.connection !== null && this.isConnectionValid);
	}

	loadConnection = flow(function * () {
		try {
			this.isLoading = true;
			const connection = yield StorageService.loadConnection();
			this.setConnection(connection);
		} catch {
			// do nothing
		} finally {
			this.isLoading = false;
		}
	});

	saveConnection = flow(function * (connection: IConnection) {
		try {
			this.isLoading = true;
			const isAuthorized = yield this.passmanService.checkAuth();
			if (isAuthorized) {
				yield StorageService.saveConnection(connection);
				this.setConnection(connection);
				return true;
			}
			return false;
		} catch {
			return false;
		} finally {
			this.isLoading = false;
		}
	});

	private passmanService: PassmanService;

	constructor(passmanService: PassmanService) {
		this.passmanService = passmanService;
	}

	async initialize(): Promise<void> {
		await this.loadConnection();
	}

	@action('Set partial connection data')
	setConnectionInfo(key: string, info: string) {
		if (!(key === 'url' || key === 'username' || key === 'password')) return;

		this.connection[key] = info;
		this.passmanService.setAuth(this.connection.url, this.connection.username, this.connection.password);
	}

	@action('Set connection')
	setConnection(connection: IConnection) {
		this.connection = connection;
		this.passmanService.setAuth(connection.url, connection.username, connection.password);
	}
}