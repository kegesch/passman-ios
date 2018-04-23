import {action, flow, observable} from 'mobx'
import PassmanService from '../../lib/services/PassmanService'
import {IVault, IStore} from '../../lib/Interfaces'
import SettingsService from '../../lib/services/SettingsService'
import StorageService from '../../lib/services/StorageService'

export default class VaultStore implements IStore {

	private SETTING_KEY_SELECTED_VAULT = "selectedVault";
	private STORAGE_KEY_VAULT_KEYS = "vaultKeys";

    @observable vaults: IVault[] = []
    @observable selectedVault: IVault = null;
    @observable isLoading: boolean = true
    @observable vaultKeys: object[] = []

	private passmanService: PassmanService;

    constructor(passmanService: PassmanService){
        this.passmanService = passmanService;
    }

    initialize() {
    }

    @action
    async selectVault(vault) {
        this.selectedVault = vault;
        this.isLoading = true;
        try {
	        await SettingsService.setSetting(this.SETTING_KEY_SELECTED_VAULT);
        } catch (err) {
        	console.log("Could not select vault", err);
        } finally {
        	this.isLoading = false;
        }
    }

    loadVaults = flow(function * () {
        this.isLoading = true;
        try {
	        this.vaults = yield this.passmanService.fetchVaults();
	        this.selectedVault = yield SettingsService.getSetting(this.SETTING_KEY_SELECTED_VAULT);
	        this.vaultKeys = yield StorageService.loadObjectSecure(this.STORAGE_KEY_VAULT_KEYS);
        } catch(err) {
        	console.log("Error in loading vaults", err);
        } finally {
	        this.isLoading = false;
        }
    });

}