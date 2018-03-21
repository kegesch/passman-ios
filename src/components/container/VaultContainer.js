import {AsyncStorage} from "react-native";
import {passmanAppUri} from "../../../index";
import Base64 from "../../model/Base64";
import {Container} from "../../../node_modules/unstated/lib/unstated";

export default class VaultContainer extends Container {

    constructor() {
        super();

        this.state = {
            selectedVaults: [],
            vaults: [],
            isLoading: true,
        };


        this.loadVaults().then((vaults) => {
            this.setState({isLoading: false, vaults: vaults});
        });

    }

    async loadVaults() {
        let server = await AsyncStorage.getItem("url")
        let login = await AsyncStorage.getItem("login")
        let password = await AsyncStorage.getItem("password")

        try {
            let response = await fetch(server + "/" + passmanAppUri + "vaults", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Authorization': 'Basic ' + Base64.btoa(login +':'+password),
                }
            });

            return await response.json();
        } catch(e) {
            console.log(e.message)
            Alert.alert("Could not fetch Vaults. Please try again.");
        }
    }
}