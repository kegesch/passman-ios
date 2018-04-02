import {action, computed, flow, observable} from 'mobx'
import StorageService from '../../lib/services/StorageService'
import SettingsService from '../../lib/services/SettingsService'

export default class MasterPasswordStore {

	@observable masterpassword = null;
	@observable masterpasswordAgain = null;
	@observable isLoading = false;
	@observable activateBiometrics = false;

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

	@action("Set Biometrics")
	setBiometricsActivation(value: boolean) {
		this.activateBiometrics = value;
	}

	saveMasterPassword = flow(function * (): boolean {
		this.isLoading = true;
		try {
			console.log(this.isMasterPasswordValid)
			if(this.isMasterPasswordValid) {
				yield StorageService.saveMasterPassword(this.masterpassword);
				yield SettingsService.setSetting("activateBiometrics", this.activateBiometrics);
				return true;
			}
			return false;
		} catch {
			return false;
		} finally {
			this.isLoading = false;
		}
	});

}