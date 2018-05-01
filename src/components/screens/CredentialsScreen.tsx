import React from 'react'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import {
	Text,
	StatusBar,
	TouchableHighlight,
	SectionList, ListItem, View, Modal, Alert
} from 'react-native'
import {ICredential, INavigationScreenProps} from '../../lib/Interfaces'
import {ImageCacheProvider } from 'react-native-cached-image'
import DefaultColors from '../DefaultColors'
import {
	CredentialItem, CredentialSectionHeader, SettingsList, SettingsListSeparator, StyledActivityIndicator, StyledRootView, TitleItem,
	TouchableSettingsText
} from '../StyledComponents'
import {inject, observer} from 'mobx-react/native'
import CredentialsStore from '../stores/CredentialsStore'
import VaultScreen from './VaultScreen'
import VaultKeyScreen from './VaultKeyScreen'
import VaultStore from '../stores/VaultStore'

interface ICredentialsScreenProps extends INavigationScreenProps {
    style?: string;
    credentialsStore: CredentialsStore;
    vaultStore: VaultStore;
}

interface ICredentialsScreenState {
    isVaultComponentVisible: boolean;
    isVaultKeyComponentVisible: boolean;
}

@inject('credentialsStore', 'vaultStore')
@observer
export default class CredentialsScreen extends React.Component<ICredentialsScreenProps, ICredentialsScreenState> {

    static navigationOptions = ({navigation}) => {
	    const params = navigation.state.params || {};
	    return {
		    title: 'Credentials',
		    headerTitleStyle: {
			    color: DefaultColors.white
		    },
		    headerStyle: {
			    backgroundColor: DefaultColors.blue
		    },
		    headerTintColor: DefaultColors.white,
		    tabBarIcon: ({tintColor}) => ((<Text style={{color: tintColor, fontSize: 24}}><FontAwesome>{Icons.key}</FontAwesome></Text>)),
		    headerLeft: (

                <TouchableHighlight underlayColor={"transparent"} onPress={params.toggleVaultComponent}>
                    <Text style={{
					    color: DefaultColors.white,
					    padding: 10,
					    paddingLeft: 15,
					    fontSize: 16
				    }}><FontAwesome>{Icons.database}</FontAwesome></Text>
                </TouchableHighlight>
		    ),

	    }
    }

	componentWillMount() {
		this.props.navigation.setParams({ toggleVaultComponent: () => this.toggleVaultComponent() });
		if(this.props.vaultStore.selectedVault && this.props.vaultStore.selectedVaultKey) {
			this.props.credentialsStore.loadCredentials();
		}
	}

    constructor(props) {
        super(props);

        this.state = {
        	isVaultComponentVisible: false,
	        isVaultKeyComponentVisible: false
        };
    }

    pressCredential(credential) {
        this.props.navigation.navigate("CredentialInfoScreen", {credential: credential})
    }

    sectionize(credentials) {
        let sections = []
        let lastChar = null
        let currentSection = null

        if(!credentials || credentials.length == 0) return []

	    credentials.sort((a, b) => {
		    return a.label.localeCompare(b.label)
	    })

        for(let i in credentials) {
            let firstchar = credentials[i].label.charAt(0).toUpperCase()
            if(lastChar != firstchar) {
                if(currentSection != null) sections.push(currentSection)
                currentSection = {data: [], title: firstchar}
            }
            currentSection.data.push(credentials[i])
            lastChar = firstchar
        }
        sections.push(currentSection)

        return sections
    }

    toggleVaultComponent() {
        const isVisible = this.state.isVaultComponentVisible;
        this.setState({isVaultComponentVisible: !isVisible});

        if(isVisible && !this.props.vaultStore.hasValidVaultKey) {
        	//on closing and no vault key is saved
        	this.toggleVaultKeyComponent();
        } else if(isVisible && this.props.vaultStore.hasValidVaultKey) {
        	// on closing and vault key is saved -> no need to call the vault key screen
        	this.props.credentialsStore.loadCredentials()
        }
    }

	toggleVaultKeyComponent() {
		const isVisible = this.state.isVaultKeyComponentVisible;
		this.setState({isVaultKeyComponentVisible: !isVisible});

		if(isVisible && this.props.vaultStore.hasValidVaultKey) {
			this.props.credentialsStore.loadCredentials()
		} else if(isVisible && !this.props.vaultStore.hasValidVaultKey) {
			Alert.alert("Could not load credentials");
		}
	}

    render() {
        let sections = this.sectionize(this.props.credentialsStore.credentials.slice());
 	    return (
            <StyledRootView>
                <StatusBar
                    barStyle="light-content"
                />
                <SectionList
                    sections={sections}
                    renderItem={({ item, index, section }) =>
                        <CredentialItem url={item.url} title={item.label} subTitle={item.url} onPress={() => console.log(item.label)}/>}
                    keyExtractor={(item) => item.label}
                    ItemSeparatorComponent={SettingsListSeparator}
                    SectionSeparatorComponent={SettingsListSeparator}
                    renderSectionHeader={({ section: { title } }) => <CredentialSectionHeader title={title}/>}
                    refreshing={this.props.credentialsStore.isLoading}
                    onRefresh={this.props.credentialsStore.loadCredentials}
                />

                <Modal
	                animationType={"slide"}
	                visible={this.state.isVaultComponentVisible}>
	                <VaultScreen onClose={() => this.toggleVaultComponent()} />
                </Modal>
                <Modal
	                animationType={"slide"}
	                visible={this.state.isVaultKeyComponentVisible}>
	                <VaultKeyScreen onClose={() => this.toggleVaultKeyComponent()} />
                </Modal>
            </StyledRootView>
        )
    }
}