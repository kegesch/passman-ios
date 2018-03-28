import RNSecureKeyStore from 'react-native-secure-key-store';
import {IConnection} from '../Interfaces'

export default class StorageService {


	public static async loadConnection(): Promise<IConnection> {

		const connection: IConnection = {
			url: "",
			username: "",
			password: ""
		}

		try {
			connection.url = await RNSecureKeyStore.get('url');
			connection.username = await RNSecureKeyStore.get('username');
			connection.password = await RNSecureKeyStore.get('password');
		} catch(err) {
			throw new Error("Could not fetch connection-data from storage: " + err);
		}

		return connection;
	}

	public static async saveConnection(connection: IConnection): Promise<void> {
		try {
			await RNSecureKeyStore.set('url', connection.url);
			await RNSecureKeyStore.set('username', connection.username);
			await RNSecureKeyStore.set('password', connection.password);
		} catch(err) {
			throw new Error("Could not save connection-data to storage: " + err);
		}

	}

}