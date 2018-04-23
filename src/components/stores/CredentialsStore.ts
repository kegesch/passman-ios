import {ICredential, IStore, IVault} from '../../lib/Interfaces'
import {flow, observable} from 'mobx'
import PassmanService from '../../lib/services/PassmanService'
import VaultStore from './VaultStore';

export default class CredentialsStore implements IStore {

	@observable isLoading: boolean = false;
	@observable credentials: ICredential[] = [];

	private passmanService: PassmanService;
	private vaultStore: VaultStore;

	constructor(passmanService: PassmanService, vaultStore: VaultStore) {
		this.passmanService = passmanService;
		this.vaultStore = vaultStore;
	}

	initialize() {
		this.loadCredentials();
	}

	loadCredentials = flow(function * () {
		let vault: IVault = this.vaultStore.selectedVault;
		this.isLoading = true;
		try {
			if(!vault) throw new Error("no selected vault");
			this.credentials = yield this.passmanService.fetchCredentialsForVault(vault.guid);
			//TODO: decrypt
		} catch(err) {
			console.log("Error in fetching credentials", err);
			this.credentials = [];
		} finally {
			this.isLoading = false;
		}
	});
}