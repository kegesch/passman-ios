import {inject, observer} from 'mobx-react/native';
import React from 'react';
import {
	CheckListItem, CredentialInfoText,
	List, ListInfoText,
	SettingsListSeperator,
	StyledActivityIndicator,
	StyledRootView
} from '../../StyledComponents';
import DefaultColors from '../../DefaultColors';
import {INavigationScreenProps, IVault, IVaultKey} from '../../../lib/Interfaces';
import VaultStore from '../../stores/VaultStore';
import Swipeout from 'react-native-swipeout';
import {Alert} from 'react-native';

interface IVaultSettingsScreenProps extends INavigationScreenProps {
	style?: string;
	vaultStore: VaultStore;
}

interface IVaultSettingsScreenState {
	scrollActive: boolean;
}

@inject('vaultStore')
@observer
export default class VaultSettingsScreen extends React.Component<IVaultSettingsScreenProps, IVaultSettingsScreenState> {

	static navigationOptions = {
		title: '',
		headerTitleStyle: {
			color: DefaultColors.white
		},
		headerStyle: {
			backgroundColor: DefaultColors.blue
		},
		headerTintColor: DefaultColors.white
	};

	constructor(props) {
		super(props);

		this.state = {
			scrollActive: false
		};
	}

	async _deleteVaultKey(guid) {
		const vaultKey = this.props.vaultStore.vaultKeys[guid];

		if (!(await this.props.vaultStore.deleteSavedVaultKey(vaultKey))) {
			Alert.alert('Key could not be removed! Try again later.');
		}
	}

	render() {
		const vaultKeysSaved = [];

		for (let key in this.props.vaultStore.vaultKeys) {
			const vaultKey: IVaultKey = this.props.vaultStore.vaultKeys[key];
			if (vaultKey.shouldBeSaved) vaultKeysSaved.push(vaultKey);
		}

		const vaultsForKeys = vaultKeysSaved.map((key: IVaultKey) => this.props.vaultStore.vaults.filter(vault => vault.guid === key.vaultGuid)[0]);

		const vaultKeysList = vaultsForKeys.map((vault: IVault) =>
			<Swipeout
				key={vault.guid}
				backgroundColor="transparent"
				autoClose={true}
				scroll={(scrollEnabled) => { this.setState({ scrollActive: scrollEnabled }); }}
				right={[{
					type: 'delete',
					text: 'Delete',
					onPress: () => this._deleteVaultKey(vault.guid)
				}]}>
					<CheckListItem
						checked={this.props.vaultStore.selectedVault.guid === vault.guid}
						label={vault.name} />
			</Swipeout>);

		let settings =
			<List scrollable separatorComponent={SettingsListSeperator} scrollEnabled={!this.state.scrollActive}
			info={'Saved vault keys'}>
				{vaultKeysList}
			</List>;

		if (vaultsForKeys.length === 0) {
			settings =
				<ListInfoText>
					<CredentialInfoText>{'There are 0 saved vault keys.'}</CredentialInfoText>
				</ListInfoText>;
		}

		const loading = <StyledActivityIndicator animating={this.props.vaultStore.isLoading}/>;

		return (
			<StyledRootView>
				{this.props.vaultStore.isLoading
					? loading
					: settings
				}
			</StyledRootView>
		);
	}

}