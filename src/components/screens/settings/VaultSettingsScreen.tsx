import {inject, observer} from 'mobx-react/native';
import React from 'react';
import {
	CheckListItem,
	List,
	SettingsListSeperator,
	StyledActivityIndicator,
	StyledRootView
} from '../../StyledComponents';
import DefaultColors from '../../DefaultColors';
import {INavigationScreenProps, IVault, IVaultKey} from '../../../lib/Interfaces';
import VaultStore from '../../stores/VaultStore';
import Swipeout from 'react-native-swipeout';

interface IVaultSettingsScreenProps extends INavigationScreenProps {
	style?: string;
	vaultStore: VaultStore;
}

@inject('vaultStore')
@observer
export default class VaultSettingsScreen extends React.Component<IVaultSettingsScreenProps, {}> {

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

	async _deleteVaultKey(guid) {
		await this.props.vaultStore.deleteSavedVaultKeyAsync(this.props.vaultStore.vaultKeys[guid]);
	}

	render() {
		const vaultKeysSaved = [];

		for (let key in this.props.vaultStore.vaultKeys) {
			const vaultKey: IVaultKey = this.props.vaultStore.vaultKeys[key];
			if (vaultKey.shouldBeSaved) vaultKeysSaved.push(vaultKey);
		}

		const vaultsForKeys = vaultKeysSaved.map((key: IVaultKey) => this.props.vaultStore.vaults.filter(vault => vault.guid === key.vaultGuid)[0]);

		const swipeButtons = [{
			text: 'Delete',
			onPress: () => console.log('delete'),
			backgroundColor: DefaultColors.orange
		}];

		const vaultKeysList = vaultsForKeys.map((vault: IVault) =>
			<Swipeout
				backgroundColor="transparent"
				right={[{
					text: 'Delete',
					onPress: () => this._deleteVaultKey(vault.guid),
					backgroundColor: DefaultColors.orange,
					underlayColor: DefaultColors.darkOrange
				}]}>
					<CheckListItem
						key={vault.guid}
						checked={this.props.vaultStore.selectedVault.guid === vault.guid}
						label={vault.name} />
			</Swipeout>);

		const settings =
			<List scrollable separatorComponent={SettingsListSeperator}
			info={'Saved vault keys'}>
				{vaultKeysList}
			</List>;

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