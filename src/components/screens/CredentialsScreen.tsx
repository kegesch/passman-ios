import React from 'react'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import {
	Text,
	StatusBar,
	TouchableHighlight,
	SectionList, ListItem, View, Modal
} from 'react-native'
import {INavigationScreenProps} from '../../lib/Interfaces'
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image'
import DefaultColors from '../DefaultColors'
import {
	CredentialItem, CredentialSectionHeader, SettingsListSeparator, StyledRootView
} from '../StyledComponents'
import {inject, observer} from 'mobx-react/native'
import CredentialsStore from '../stores/CredentialsStore'
import VaultScreen from './VaultScreen'

interface ICredentialsScreenProps extends INavigationScreenProps {
    style?: string;
    credentialsStore: CredentialsStore;
}

interface ICredentialsScreenState {
    isVaultComponentVisible: boolean;
}

@inject('credentialsStore')
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
	}

    constructor(props) {
        super(props);

        this.state = {isVaultComponentVisible: false};
    }

    pressCredential(credential) {
        this.props.navigation.navigate("CredentialInfoScreen", {credential: credential})
    }

    sectionize(credentials) {
        let sections = []
        let lastChar = null
        let currentSection = null

        if(credentials.length == 0) return []

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
    }


    render() {
        let sections = this.sectionize(this.props.credentialsStore.credentials)
        return (
            <View>
                <StyledRootView>
                    <StatusBar
                        barStyle="light-content"
                    />
                    <ImageCacheProvider>
                        <SectionList
                            ItemSeparatorComponent={SettingsListSeparator}
                            renderItem={({item}) => <CredentialItem key={item.guid} title={item.label} subTitle={item.url} url={item.url} onPress={() => {this.pressCredential(item)}} />}
                            renderSectionHeader={({section}) => {
                                                    <CredentialSectionHeader key={section.title} title={section.title}/>
                                                }
                            }
                            stickySectionHeadersEnabled={true}
                            renderSectionFooter={() => <SettingsListSeparator/>}
                            sections={sections}
                            refreshing={this.props.credentialsStore.isLoading}
                            onRefresh={() => {
                                this.props.credentialsStore.loadCredentials()
                            }}
                        />
                    </ImageCacheProvider>
                </StyledRootView>
	            <Modal
	                animationType={"slide"}
	                visible={this.state.isVaultComponentVisible}>

		            <VaultScreen onClose={() => this.toggleVaultComponent()} />
	            </Modal>
            </View>
        )
    }
}