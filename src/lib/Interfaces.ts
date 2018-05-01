export interface IVault {
	vault_id: string;
	guid: string;
	name: string;
	created: number;
	public_sharing_key: string;
	private_sharing_key: string;
	last_access: number;
	challenge_password: string;
}

export interface IVaultKey {
	vaultGuid: string;
	key: string;
	shouldBeSaved: boolean;
}

export interface ICredentialFile {
	filename: string;
	size: number;
	mimetype: string;
	guid: string;
}

export interface ICustomField {
	label: string;
	value: string;
	secret: boolean,
	field_type: string;
}

export interface ICredential {
	vault_id?: string;
	label?: string;
	description?: string;
	created?: number;
	changed?: number;
	tags?: string[];
	email?: string;
	username?: string;
	url?: string;
	favicon?: string;
	renew_interval?: number;
	expire_time?: number;
	delete_time?: number;
	files?: ICredentialFile[];
	custom_fields?: ICustomField[];
	otp?: string;
	hidden?: boolean;
}

/**
 * Connection information to nextcloud
 */
export interface IConnection {
	url: string;
	username: string;
	password: string;
}

export interface ISettings {
	activateBiometrics: boolean;
}

export interface INavigationScreenProps {
	navigation?: any;
	screenProps?: any;
}

export interface IStore {
	initialize(): void;
}