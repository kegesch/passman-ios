import {ICredential, IStore, IVault} from '../../lib/Interfaces';
import {action, flow, observable} from 'mobx';
import PassmanService from '../../lib/services/PassmanService';
import VaultStore from './VaultStore';
import {decrypt} from '../../lib/services/CryptoService';

export default class CredentialsStore implements IStore {

	@observable isLoading: boolean = false;
	@observable credentials: ICredential[] = [];
	@observable selectedCredential: ICredential = null;

	loadCredentials = flow(function * () {
		let vault: IVault = this.vaultStore.selectedVault;
		this.isLoading = true;
		try {
			if (!vault) throw new Error('no selected vault');
			console.log('Fetching credentials for vault', vault.name);
			this.credentials = yield this.passmanService.fetchCredentialsForVault(vault.guid);
			this.credentials = this.decryptAll(this.credentials);
		} catch (err) {
			console.log('Error in fetching credentials', err);
			this.credentials = [];
		} finally {
			this.isLoading = false;
		}
	});

	private passmanService: PassmanService;
	private vaultStore: VaultStore;

	private encryptedFields = ['password', 'url', 'description', 'username', 'files', 'custom_fields', 'otp', 'email', 'tags'];

	constructor(passmanService: PassmanService, vaultStore: VaultStore) {
		this.passmanService = passmanService;
		this.vaultStore = vaultStore;
	}

	initialize() {
		//
	}

	@action
	selectCredential(credential: ICredential) {
		this.selectedCredential = credential;
	}

	decryptAll(credentialsObservable: ICredential[]) {
		const credentials = credentialsObservable.slice();
		for (let i = 0; i < credentials.length; i++) {
			for (let j in this.encryptedFields) {
				const field = this.encryptedFields[j];
				const encryptedValue = credentials[i][field];
				credentials[i][field] = JSON.parse(decrypt(encryptedValue, this.vaultStore.selectedVaultKey.key));
			}
		}
		return credentials;
	}
}