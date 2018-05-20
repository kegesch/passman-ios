import VaultStore from '../stores/VaultStore';
import {
	List, StyledActivityIndicator,
	StyledRootView, HeaderView, HeaderButton, TouchableListText
} from '../StyledComponents';
import {inject, observer} from 'mobx-react/native';
import React from 'react';
import {IVault} from '../../lib/Interfaces';

interface IVaultScreenProps {
	style?: string;
	onClose: () => void;
	vaultStore?: VaultStore;
}

@inject('vaultStore')
@observer
export default class VaultScreen extends React.Component<IVaultScreenProps, {}> {

	async componentWillMount() {
		await this.props.vaultStore.loadVaults();
	}

	async onPressVault(vault: IVault) {
		await this.props.vaultStore.selectVault(vault);
		this.props.onClose();
	}

	render() {
		let vaultList = null;
		if (!this.props.vaultStore.isLoading) {
			let vaults = this.props.vaultStore.vaults.map((vault) =>
				<TouchableListText
					key={vault.guid}
					text={vault.name}
					onPress={() => this.onPressVault(vault)}
					highlighted={this.props.vaultStore.selectedVault && this.props.vaultStore.selectedVault.guid === vault.guid}/>);

			vaultList = <List scrollable>
				{vaults}
			</List>;
		}
		return (
			<StyledRootView>
				<HeaderView>
					<HeaderButton title={'Close'} onPress={this.props.onClose}/>
				</HeaderView>
				{this.props.vaultStore.isLoading
					? <StyledActivityIndicator animating={this.props.vaultStore.isLoading}/>
					: vaultList
				}
			</StyledRootView>
		);
	}
}