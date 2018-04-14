import {action, observable} from 'mobx'
import PassmanService from '../../lib/services/PassmanService'
import {Store} from '../../lib/Interfaces'

export default class VaultStore implements Store {

    @observable vaults: object[] = []
    @observable selectedVault: object = undefined
    @observable isLoading: boolean = true
    @observable vaultKeys: object[] = []

	initialize(): void {
	}

	private passmanService: PassmanService;

    constructor(passmanService: PassmanService){
        this.passmanService = passmanService;
    }

    @action
    selectVault(vault) {
        this.isLoading = true

        this.selectedVault = vault
    }



    @action('Load vaults from nextcloud')
    async loadVaults() {
        this.isLoading = true
        this.passmanService.fetchVaults().then((vaults) => {
            this.vaults = vaults
            this.isLoading = false
        })
    }

}