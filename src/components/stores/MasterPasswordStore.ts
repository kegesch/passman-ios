import {action, computed, flow, observable} from 'mobx';
import StorageService from '../../lib/services/StorageService';
import SettingsService from '../../lib/services/SettingsService';
import {IStore} from '../../lib/Interfaces';
import BiometricService from '../../lib/services/BiometricService';

export default class MasterPasswordStore implements IStore {

	@observable masterpassword = null;
	@observable masterpasswordAgain = null;
	@observable isLoading = false;
	@observable activateBiometrics = false;
	@observable supportedBiometrics = null;

	save = flow(function * () {
		this.isLoading = true;
		try {
			if (this.isMasterPasswordValid) {
				yield StorageService.saveMasterPassword(this.masterpassword);
				yield SettingsService.setSetting('activateBiometrics', this.activateBiometrics);
				return true;
			}
			return false;
		} catch {
			return false;
		} finally {
			this.isLoading = false;
		}
	});

	load = flow(function * () {
		this.isLoading = true;
		try {
			this.supportedBiometrics = yield BiometricService.supportedType();
			this.masterpassword = this.masterpasswordAgain =  yield StorageService.loadMasterPassword();
			this.activateBiometrics = yield SettingsService.getSetting('activateBiometrics');
		} catch (err) {
			// Do nothing
			console.log('Error in loading master password: ', err);
		} finally {
			this.isLoading = false;
		}
	});

	reset = flow(function * () {
		this.isLoading = true;
		try {
			this.setMasterPassword(null);
			this.setMasterPasswordAgain(null);
			yield StorageService.saveMasterPassword('');
			yield SettingsService.setSetting('activateBiometrics', false);
			return true;
		} catch (err) {
			console.error('Error in resetting master password: ', err);
		} finally {
			this.isLoading = false;
		}
	});

	@computed
	get isMasterPasswordValid() {
		return (this.masterpassword && this.masterpassword === this.masterpasswordAgain);
	}

	@action
	setMasterPassword(password: string) {
		this.masterpassword = password;
	}

	@action
	setMasterPasswordAgain(password: string) {
		this.masterpasswordAgain = password;
	}

	@action('Set Biometrics')
	setBiometricsActivation(value: boolean) {
		this.activateBiometrics = value;
	}

	async initialize(): Promise<void> {
		await this.load();
	}
}