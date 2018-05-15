import Biometrics from 'react-native-touch-id';

export default class BiometricService {

	public static async isSupported() : Promise<boolean> {
		try {
			const supportedBiometric = await Biometrics.isSupported();
			return (supportedBiometric === "TouchID" || supportedBiometric === "FaceID");
		} catch(err) {
			return false;
		}
	}

	public static async authenticate() : Promise<boolean> {
		try {
			await Biometrics.authenticate('Please authenticate');
			return true;
		} catch (err) {
			console.log("Error in authenticating Biometrics: ", err)
			return false;
		}
	}

	public static async supportedType(): Promise<string> {
		try {
			return await Biometrics.isSupported();
		} catch(err) {
			console.log("Error in loading supported Biometrics: ", err);
			return null;
		}
	}

}