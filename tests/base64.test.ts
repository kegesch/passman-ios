import Base64 from '../src/lib/Base64';

const data = {'iv': 'RJ9+5YILvHfackhN0XROSg==',
	'v': 1,
	'iter': 1000,
	'ks': 256,
	'ts': 64,
	'mode': 'ccm',
	'adata': '',
	'cipher': 'aes',
	'salt': 'Ac/mbnlUFko=',
	'ct': 'XGtoGh5gSTzovEPfipxWdunVLrEKP+bt0gt/IVJzja0ptlWkpF7vEMej831xocM5lXenTA=='};
const decodedData = JSON.stringify(data);
const encodedData = 'eyJpdiI6IlJKOSs1WUlMdkhmYWNraE4wWFJPU2c9PSIsInYiOjEsIml0ZXIiOjEwMDAsI' +
	'mtzIjoyNTYsInRzIjo2NCwibW9kZSI6ImNjbSIsImFkYXRhIjoiIiwiY2lwaGVyIjoiYWVzIiwic2FsdCI6IkF' +
	'jL21ibmxVRmtvPSIsImN0IjoiWEd0b0doNWdTVHpvdkVQZmlweFdkdW5WTHJFS1ArYnQwZ3QvSVZKemphMHB0bF' +
	'drcEY3dkVNZWo4MzF4b2NNNWxYZW5UQT09In0=';

test('base64: encode', () => {
	const atob = Base64.atob(encodedData);
	expect(atob).toBe(decodedData);
});

test('base64: decode', () => {
	const btoa = Base64.btoa(decodedData);
	expect(btoa).toBe(encodedData);
});

test('base64', () => {
	const source = 'TEST1234&\\sdösad';
	const after = Base64.atob(Base64.btoa(source));
	expect(after).toBe(source);
});