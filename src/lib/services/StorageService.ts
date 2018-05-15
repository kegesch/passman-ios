import RNSecureKeyStore from 'react-native-secure-key-store';
import {IConnection, ISettings} from '../Interfaces';
import {AsyncStorage} from 'react-native';

export default class StorageService {

	private static CONNECTION_KEY: string = 'connection';
	private static MP_KEY: string = 'masterpassword';
	private static SETTINGS_KEY: string = 'settings';

	public static async loadConnection(): Promise<IConnection> {
		return await StorageService.loadObjectSecure<IConnection>(StorageService.CONNECTION_KEY);
	}

	public static async saveConnection(connection: IConnection): Promise<void> {
		await StorageService.saveObjectSecure<IConnection>(StorageService.CONNECTION_KEY, connection);
	}

	public static async loadMasterPassword(): Promise<string> {
		let masterPassword = undefined;

		try {
			masterPassword = await RNSecureKeyStore.get(StorageService.MP_KEY);
		} catch (err) {
			throw new Error('Could not fetch masterpassword from secure storage: ' + err);
		}

		return masterPassword;
	}

	public static async saveMasterPassword(masterPassword: string): Promise<void> {
		try {
			await RNSecureKeyStore.set(StorageService.MP_KEY, masterPassword);
		} catch (err) {
			throw new Error('Could not save masterpassword to secure storage: ' + err);
		}
	}

	public static async loadSettings(): Promise<ISettings> {
		return await StorageService.loadObject<ISettings>(this.SETTINGS_KEY);
	}

	public static async saveSettings(settings: ISettings): Promise<void> {
		await StorageService.saveObject<ISettings>(this.SETTINGS_KEY, settings);
	}

	/**
	 * saves an object to device's storage securely
	 * @param {string} key
	 * @param {T} object
	 * @returns {Promise<void>}
	 */
	public static async saveObjectSecure<T>(key: string, object: T): Promise<void> {
		try {
			await RNSecureKeyStore.set(key, JSON.stringify(object));
		} catch (err) {
			throw new Error('Could not save ' + key + ' to secure storage: ' + err);
		}
	}

	/**
	 * loads an object from device's storage securely, must be used if the object was stored with saveObjectSecure()
	 * @param {string} key
	 * @returns {Promise<T>}
	 */
	public static async loadObjectSecure<T>(key: string): Promise<T> {
		let object: T = undefined;

		try {
			const objectString = await RNSecureKeyStore.get(key);
			object = JSON.parse(objectString);
		} catch (err) {
			throw new Error('Could not load ' + key + ' from secure storage: ' + err);
		}

		return object;
	}

	/**
	 * saves an object to device's storage, other apps may read these data
	 * @param {string} key
	 * @param {T} object
	 * @returns {Promise<void>}
	 */
	public static async saveObject<T>(key: string, object: T): Promise<void> {
		try {
			await AsyncStorage.setItem(key, JSON.stringify(object));
		} catch (err) {
			throw new Error('Could not save ' + key + ' to storage: ' + err);
		}
	}

	/**
	 * loads an object from device's storage, must be used if the object was saved by saveObject()
	 * @param {string} key
	 * @returns {Promise<T>}
	 */
	public static async loadObject<T>(key: string): Promise<T> {
		let object: T = undefined;
		try {
			const objectString = await AsyncStorage.getItem(key);
			object = JSON.parse(objectString);
		} catch (err) {
			throw new Error('Could not load ' + key + ' from storage: ' + err);
		}

		return object;
	}

}