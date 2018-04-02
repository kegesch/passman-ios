import StorageService from './StorageService'
import {ISettings} from '../Interfaces'

export default class SettingsService {

	static cachedSettings: ISettings = null;

	public static async getSetting(key: string): any {
		try {
			if (!object) {
				SettingsService.cachedSettings = await StorageService.loadSettings();
			}

		} catch(error) {
			throw new Error("Could not get setting with key " + key + ": " + error);
		}

		if (!(key in this.cachedSettings)) throw new Error("Could not get setting with key " + key);
		return SettingsService.cachedSettings[key];
	}

	public static async setSetting(key: string, object: any) {
		const recovery = Object.assign({}, SettingsService.cachedSettings);

		SettingsService.cachedSettings[key] = object;
		try {
			await StorageService.saveObject(this.cachedSettings);
		} catch(error) {
			SettingsService.cachedSettings = recovery;
			throw new Error("Could not save setting with key " + key);
		}
	}


}