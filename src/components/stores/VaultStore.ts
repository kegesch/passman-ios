import {action, computed, flow, observable} from 'mobx';
import PassmanService from '../../lib/services/PassmanService';
import {IVault, IStore, IVaultKey} from '../../lib/Interfaces';
import SettingsService from '../../lib/services/SettingsService';
import StorageService from '../../lib/services/StorageService';
import {decrypt} from '../../lib/services/CryptoService';

export default class VaultStore implements IStore {

	@observable vaults: IVault[] = [];
	@observable selectedVault: IVault = null;
	@observable isLoading: boolean = true;
	@observable vaultKeys = {};
	@observable selectedVaultKey: IVaultKey = null;

	selectVault = flow(this.selectVaultAsync);
	saveVaultKey = flow(this.saveVaultKeyAsync);
	loadVaults = flow(this.loadVaultsAsync);

	private SETTING_KEY_SELECTED_VAULT = 'selectedVault';
	private STORAGE_KEY_VAULT_KEYS = 'vaultKeys';
	private STORAGE_KEY_SELECTED_VAULT_KEY = 'selectedVaultKey';

	private passmanService: PassmanService;

	constructor(passmanService: PassmanService) {
		this.passmanService = passmanService;
	}

	async initialize(): Promise<void> {
		this.selectedVaultKey = {
			vaultGuid: null,
			shouldBeSaved: false,
			key: null
		};
		await this.loadVaults();
	}

	@computed
	get hasValidVaultKey() {
		return (this.selectedVaultKey && this.selectedVaultKey && this.selectedVaultKey.key);
	}

	@action
	editVaultKey(value) {
		this.selectedVaultKey.key = value;
	}

	* loadVaultsAsync () {
		this.isLoading = true;

		try {
			this.vaults = yield this.passmanService.fetchVaults();

			this.selectedVault = yield SettingsService.getSetting(this.SETTING_KEY_SELECTED_VAULT);
			this.vaultKeys = yield StorageService.loadObjectSecure(this.STORAGE_KEY_VAULT_KEYS);
			this.selectedVaultKey = yield StorageService.loadObjectSecure(this.STORAGE_KEY_SELECTED_VAULT_KEY);
		} catch (err) {
			console.log('Error in loading vaults', err);
		} finally {
			this.isLoading = false;
		}
	}

	* saveVaultKeyAsync () {
		this.isLoading = true;

		try {
			decrypt(this.selectedVault.challenge_password, this.selectedVaultKey.key);
			// if correct no exceptions is thrown;

			this.vaultKeys[this.selectedVault.guid] = this.selectedVaultKey;

			if (this.selectedVaultKey.shouldBeSaved) {
				yield StorageService.saveObjectSecure(this.STORAGE_KEY_SELECTED_VAULT_KEY, this.selectedVaultKey);
			} else {
				yield StorageService.saveObjectSecure(this.STORAGE_KEY_SELECTED_VAULT_KEY, null);
			}

			const keysShouldBeSaved = {};
			for (let i in this.vaultKeys) {
				const key: IVaultKey = this.vaultKeys[i];
				if (key.shouldBeSaved) keysShouldBeSaved[key.vaultGuid] = key;
			}

			yield StorageService.saveObjectSecure(this.STORAGE_KEY_VAULT_KEYS, keysShouldBeSaved);

			return true;
		} catch (err) {
			console.log('Could not save VaultKey', err);
			return false;
		} finally {
			this.isLoading = false;
		}
	}

	* deleteSavedVaultKeyAsync (key: IVaultKey) {
		this.isLoading = true;

		try {

			if (this.selectedVaultKey.vaultGuid === key.vaultGuid) {
				this.selectedVaultKey.shouldBeSaved = false;
				yield StorageService.saveObjectSecure(this.STORAGE_KEY_SELECTED_VAULT_KEY, null);
			}

			this.vaultKeys[key.vaultGuid].shouldBeSaved = false;

			const keysShouldBeSaved = {};
			for (let i in this.vaultKeys) {
				const k: IVaultKey = this.vaultKeys[i];
				if (k.shouldBeSaved) keysShouldBeSaved[k.vaultGuid] = k;
			}

			yield StorageService.saveObjectSecure(this.STORAGE_KEY_VAULT_KEYS, keysShouldBeSaved);

			return true;
		} catch (err) {
			console.log('Could not delete VaultKey', err);
			return false;
		} finally {
			this.isLoading = false;
		}
	}

	* selectVaultAsync (vault: IVault) {
		this.isLoading = true;

		this.selectedVault = vault;

		if (vault.guid in this.vaultKeys) {
			this.selectedVaultKey = this.vaultKeys[vault.guid];
			yield StorageService.saveObjectSecure(this.STORAGE_KEY_SELECTED_VAULT_KEY, this.selectedVaultKey);
		} else {
			this.selectedVaultKey = {
				vaultGuid: vault.guid,
				shouldBeSaved: false,
				key: null
			};
		}

		try {
			yield SettingsService.setSetting(this.SETTING_KEY_SELECTED_VAULT, vault);
		} catch (err) {
			console.log('Could not select vault', err);
		} finally {
			this.isLoading = false;
		}
	}
}