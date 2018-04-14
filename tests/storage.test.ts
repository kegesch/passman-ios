import MockStorage from './mocks/AsyncStorageMock';
import StorageService from '../src/lib/services/StorageService'
import RNSecureKeyStoreMock from './mocks/RNSecureKeyStoreMock'

const SAVED_OBJECT_KEY = "SAVED";
const UNSAVED_OBJECT_KEY = "UNSAVED";

const objectToBeSaved = {saved: "test"};

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);
const SecureStorage = new RNSecureKeyStoreMock(storageCache);

jest.setMock('AsyncStorage', AsyncStorage);
jest.setMock('react-native-secure-key-store', SecureStorage);

afterEach(() => {
	storageCache = {};
})

describe("object storage tests", async () => {

	afterEach(() => {
		storageCache = {};
	});

	test("storage: save object", async () => {
		await expect(StorageService.saveObject(SAVED_OBJECT_KEY, objectToBeSaved)).resolves;
		const isObjectStored = (SAVED_OBJECT_KEY in storageCache);
		expect(isObjectStored).toBe(true);
		expect(storageCache[SAVED_OBJECT_KEY]).toBe(JSON.stringify(objectToBeSaved));
	});

	describe("storage: with saved object", async () => {
		beforeAll( async () => {
			await StorageService.saveObject(SAVED_OBJECT_KEY, objectToBeSaved);
		});

		test("storage: load object", async () => {
			let promise = StorageService.loadObject(SAVED_OBJECT_KEY);
			await expect(promise).resolves;

			expect(JSON.stringify(await promise)).toBe(JSON.stringify(objectToBeSaved));
		})

	});

	test("storage: load object fail", async () => {
		await expect(StorageService.loadObject(UNSAVED_OBJECT_KEY)).rejects;
	})
});

describe("secure object storage tests", async () => {

	afterEach(() => {
		storageCache = {};
	});

	test("storage: save secure object", async () => {
		await expect(StorageService.saveObjectSecure(SAVED_OBJECT_KEY, objectToBeSaved)).resolves;
		const isObjectStored = (SAVED_OBJECT_KEY in storageCache);
		expect(isObjectStored).toBe(true);
		expect(storageCache[SAVED_OBJECT_KEY]).toBe(JSON.stringify(objectToBeSaved));
	});

	test("storage: load secure object fail", async () => {
		await expect(StorageService.loadObjectSecure(UNSAVED_OBJECT_KEY)).rejects;
	})
});
