import {action, computed, flow, observable} from 'mobx'
import PassmanService from '../../lib/services/PassmanService'
import {IVault, IStore, IVaultKey} from '../../lib/Interfaces'
import SettingsService from '../../lib/services/SettingsService'
import StorageService from '../../lib/services/StorageService'
import {decrypt} from '../../lib/services/CryptoService'

export default class VaultStore implements IStore {

	private SETTING_KEY_SELECTED_VAULT = "selectedVault";
	private STORAGE_KEY_VAULT_KEYS = "vaultKeys";
	private STORAGE_KEY_SELECTED_VAULT_KEYS = "selectedVaultKey";

    @observable vaults: IVault[] = []
    @observable selectedVault: IVault = null;
    @observable isLoading: boolean = true;
    @observable vaultKeys: IVaultKey[] = [];
	@observable selectedVaultKey: IVaultKey;

	private passmanService: PassmanService;

    constructor(passmanService: PassmanService){
        this.passmanService = passmanService;
    }

    async initialize() {
		await this.loadVaults();
    }

    @computed
    get hasValidVaultKey() {
    	return (this.selectedVaultKey && this.selectedVaultKey && this.selectedVaultKey.key);
    }

    @action
    async selectVault(vault: IVault) {
	    this.isLoading = true;

    	this.selectedVault = vault;

        if(vault.guid in this.vaultKeys) {
        	this.selectedVaultKey = this.vaultKeys[vault.guid];
        } else {
	        this.selectedVaultKey = {
		        vaultGuid: vault.guid,
		        shouldBeSaved: false,
		        key: null
	        };
        }

        try {
	        await SettingsService.setSetting(this.SETTING_KEY_SELECTED_VAULT, vault);
        } catch (err) {
        	console.log("Could not select vault", err);
        } finally {
        	this.isLoading = false;
        }
    }

    @action
	editVaultKey(value) {
		this.selectedVaultKey.key = value;
    }

    saveVaultKey = flow(function * () {
    	this.isLoading = true;

    	try {
			decrypt(this.selectedVault.challenge_password, this.selectedVaultKey.key);
			//if correct no exceptions is thrown;

    		this.vaultKeys[this.selectedVault.guid] = this.selectedVaultKey;

		    yield StorageService.saveObjectSecure(this.STORAGE_KEY_SELECTED_VAULT_KEYS, this.selectedVaultKey);
		    yield StorageService.saveObjectSecure(this.STORAGE_KEY_VAULT_KEYS, this.vaultKeys);

		    return true;
	    } catch(err) {
    		console.log("Could not save VaultKey", err);
    	    return false;
	    } finally {
    		this.isLoading = false;
	    }
    });


    loadVaults = flow(function * () {
        this.isLoading = true;
        try {
	        this.vaults = yield this.passmanService.fetchVaults();
	        this.selectedVault = yield SettingsService.getSetting(this.SETTING_KEY_SELECTED_VAULT);
	        this.vaultKeys = yield StorageService.loadObjectSecure(this.STORAGE_KEY_VAULT_KEYS);
	        this.selectedVaultKey = yield StorageService.loadObjectSecure(this.STORAGE_KEY_SELECTED_VAULT_KEYS);
        } catch(err) {
        	console.log("Error in loading vaults", err);
        } finally {
	        this.isLoading = false;
        }
    });

}