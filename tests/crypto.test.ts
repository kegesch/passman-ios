import {decrypt, encrypt} from '../src/lib/services/CryptoService';
import Base64 from '../src/lib/Base64';

const key = 'testKey$123';
const text = 'ThisIs a small Passman Encryption test text.';
const cipherObject = {'iv': '9i7M9F40qXfLdI71pSe5iA==',
	'v': 1,
	'iter': 1000,
	'ks': 256,
	'ts': 64,
	'mode': 'ccm',
	'adata': '',
	'cipher': 'aes',
	'salt': 'MoGMqrHP5xc=',
	'ct': 'yKDyH5za0HGnr8STSZL1nZY3iCrq6BbcyflhufU9WPCkUnsqrmsNGaa20+BxkosRy8LbLw=='};

test('crypto encrypt decrypt', () => {
	const ct = encrypt(text, key);
	const dt = decrypt(ct, key);
	expect(dt).toBe(text);
});

test('crypto decrypt', () => {
	const cipherText = Base64.btoa(JSON.stringify(cipherObject));
	const t = decrypt(cipherText, key);
	expect(t).toBe(text);
});

test('crypto encrypt', () => {
	encrypt(text, key);
});