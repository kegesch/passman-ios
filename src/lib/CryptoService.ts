import * as sjcl from 'sjcl'
import Base64 from './Base64'

const cipherConfig = {
	adata: '',
	iter: 1000,
	ks: 256,
	mode: 'ccm',
	ts: 64
}

export function decrypt(cipher: string, key: string): string {
	if (!cipher || !key) {
		throw new Error("Could not decrypt empty ciphertext or with empty key.");
	}

	const cipherObject = Base64.atob(cipher);

	try {
		const decrypted = sjcl.decrypt(key, cipherObject);

		return decrypted;
	} catch(err) {
		throw new Error("Could not decrypt: SJCL Error: " + err);
	}
}

export function encrypt(text: string, key: string): string {
	if (!text || !key) {
		throw new Error("Could not encrypt empty text or with empty key.");
	}

	try {
		const cipherEncrypted = sjcl.encrypt(key, text, cipherConfig)
		return Base64.btoa(cipherEncrypted.toString());
	} catch(err) {
		throw new Error("Could not encrypt: SJCL Error: " + err);
	}
}
