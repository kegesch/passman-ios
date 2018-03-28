import Base64 from '../Base64'
import {IConnection, ICredential, IVault} from '../Interfaces'
import StorageService from './StorageService'

export default class PassmanService {

	// Endpoints
	public PASSMAN_APP_URI = 'index.php/apps/passman/api/v2/';
	private VAULTS_URI = 'vaults/';
	private CREDENTIALS_URI = 'credentials/'

	private username: string;
	private password: string;
	private url: string;

	constructor () {
		StorageService.loadConnection().then((connection: IConnection) => {
			this.setAuth(connection.url, connection.username, connection.password);
		})
	}

	public setAuth(url: string, username: string, password: string) {
		this.url = url;
		this.username = username;
		this.password = password;
	}

	public async fetchVaults() : Promise<IVault[]> {

		const response = await fetch(this.url + '/' + this.PASSMAN_APP_URI + this.VAULTS_URI, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache',
				'Authorization': 'Basic ' + Base64.btoa(this.username + ':' + this.password)
			}
		});

		return await response.json();
	}

	public async fetchCredentialsForVault(vaultGuid: string): Promise<ICredential[]> {

		const response = await fetch(this.url + '/' + this.PASSMAN_APP_URI + this.VAULTS_URI + '/' + vaultGuid, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache',
				'Authorization': 'Basic ' + Base64.btoa(this.username + ':' + this.password)
			}
		});

		return await response.json();
	}

	public async pushCredential(credential: ICredential): Promise<void> {
		if(credential.vault_id === null || credential.label === null) throw new Error("Creating credential: vault_id and label are required!" );

		const response = await fetch(this.url + '/' + this.PASSMAN_APP_URI + this.CREDENTIALS_URI, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache',
				'Authorization': 'Basic ' + Base64.btoa(this.username + ':' + this.password)
			},
			body: JSON.stringify(credential),
		});

		return await response.json();

	}
}