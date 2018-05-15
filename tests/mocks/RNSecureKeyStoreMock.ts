export default class RNSecureKeyStoreMock {

	private storageCache;

	constructor(cache = {}) {
		this.storageCache = cache;
	}

	set = jest.fn((key, value) => {
		return new Promise((resolve, reject) => {
			return (typeof key !== 'string' || typeof value !== 'string')
				? reject(new Error('key and value must be string'))
				: resolve(this.storageCache[key] = value);
		});
	});

	get = jest.fn((key) => {
		return new Promise((resolve, rejects) => {
			return this.storageCache.hasOwnProperty(key)
				? resolve(this.storageCache[key])
				: rejects(new Error('no such key'));
		});
	});

	remove = jest.fn((key) => {
		return new Promise((resolve, reject) => {
			return this.storageCache.hasOwnProperty(key)
				? resolve(delete this.storageCache[key])
				: reject('No such key!');
		});
	});

    clear = jest.fn(() => {
        return new Promise((resolve,) =>  resolve(this.storageCache = {}));
    })
}