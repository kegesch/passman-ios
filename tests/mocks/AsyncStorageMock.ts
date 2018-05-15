export default class MockStorage {

	setItem = jest.fn((key, value) => {
		return new Promise((resolve, reject) => {
			return (typeof key !== 'string' || typeof value !== 'string')
				? reject(new Error('key and value must be string'))
				: resolve(this.storageCache[key] = value);
		});
	});

	getItem = jest.fn((key) => {
		return new Promise((resolve) => {
			return this.storageCache.hasOwnProperty(key)
				? resolve(this.storageCache[key])
				: resolve(null);
		});
	});

	removeItem = jest.fn((key) => {
		return new Promise((resolve, reject) => {
			return this.storageCache.hasOwnProperty(key)
				? resolve(delete this.storageCache[key])
				: reject('No such key!');
		});
	});

	clear = jest.fn(() => {
		return new Promise((resolve) =>  resolve(this.storageCache = {}));
	});

	getAllKeys = jest.fn(() => {
		return new Promise((resolve) => resolve(Object.keys(this.storageCache)));
	});

	private storageCache;

	constructor(cache = {}) {
		this.storageCache = cache;
	}
}