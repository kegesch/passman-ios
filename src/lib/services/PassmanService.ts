import Base64 from '../Base64'
import {ICredential, IVault} from '../Interfaces'

export default class PassmanService {

	// Endpoints
	public PASSMAN_APP_URI = 'index.php/apps/passman/api/v2/';
	private VAULTS_URI = 'vaults';
	private CREDENTIALS_URI = 'credentials'
	private SETTINGS_URI = 'settings'

	private username: string;
	private password: string;
	private url: string;

	public setAuth(url: string, username: string, password: string) {
		this.url = url;
		this.username = username;
		this.password = password;
	}

	public async fetchVaults() : Promise<IVault[]> {
		const url = this.url + '/' + this.PASSMAN_APP_URI + this.VAULTS_URI;
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
					'Authorization': 'Basic ' + Base64.btoa(this.username + ':' + this.password)
				}
			});
			return await response.json();
		} catch(err) {
			console.log("Could not fetch Vaults from Passman API ("+url+")", err);
			return [];
		}
	}

	public async fetchCredentialsForVault(vaultGuid: string): Promise<ICredential[]> {
		try {
			const response = await fetch(this.url + '/' + this.PASSMAN_APP_URI + this.VAULTS_URI + '/' + vaultGuid, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
					'Authorization': 'Basic ' + Base64.btoa(this.username + ':' + this.password)
				}
			});
			const json = await response.json();
			const credentials = await json.credentials;
			return this.filterCredentials(credentials);
		} catch(err) {
			console.log("Could not fetch Credentials for Vault " + vaultGuid + ":", err);
			return [];
		}
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

	public async checkAuth(): Promise<boolean> {
		const url = this.url + "/" + this.PASSMAN_APP_URI  + this.SETTINGS_URI;
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
					'Authorization': 'Basic ' + Base64.btoa(this.username + ":" + this.password)
				}
			});
			return (response.status === 200);
		} catch(e) {
			console.log("Failed to fetch from " + url +":" + e);
			return false;
		}
	}

	private filterCredentials(credentials: ICredential[]): ICredential[] {
		return credentials.filter((credential: ICredential) => {
			const date = new Date();
			const zeroDate = new Date(0 * 1000);

			const deleteTime = new Date(credential.delete_time * 1000);
			const expireTime = new Date(credential.expire_time * 1000);

			return (!credential.hidden && !(deleteTime > zeroDate && deleteTime < date) && !(expireTime > zeroDate && expireTime < date));
		});
	}

}