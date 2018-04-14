import StorageService from './StorageService'
import {ISettings} from '../Interfaces'

export default class SettingsService {

	static isLoaded = false;
	static cachedSettings: ISettings = null;


	private static initialize() {
		SettingsService.cachedSettings = {
			activateBiometrics: false,
		};
	}

	public static async getSetting(key: string): Promise<any> {
		if (!SettingsService.isLoaded) {
			try {
				SettingsService.cachedSettings = await StorageService.loadSettings();
				SettingsService.isLoaded = true;
			} catch(error) {
				throw new Error("Could not load settings " + error);
			}
		}

		if (!SettingsService.cachedSettings || !(key in SettingsService.cachedSettings))  throw new Error("Could not get setting with key " + key);
		return SettingsService.cachedSettings[key];
	}

	public static async setSetting(key: string, object: any): Promise<void> {
		if(SettingsService.cachedSettings === null) SettingsService.initialize();
		const recovery = Object.assign({}, SettingsService.cachedSettings);

		try {
			SettingsService.cachedSettings[key] = object;

			await StorageService.saveSettings(this.cachedSettings);
		} catch(error) {
			SettingsService.cachedSettings = recovery;
			throw new Error("Could not save setting with key " + key);
		}
	}


}