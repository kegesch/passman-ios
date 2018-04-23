import VaultStore from '../stores/VaultStore'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import {
	CenteredView, SettingsButton, SettingsList, SettingsListSeparator, SettingsText, StyledActivityIndicator,
	StyledRootView, HeaderView, RightView, HeaderCloseButton, HeaderButton
} from '../StyledComponents'
import {inject, observer} from 'mobx-react/native'
import React from 'react'
import {Text, TouchableHighlight} from 'react-native'
interface IVaultScreenProps {
	style?: string;
	onClose: () => void;
	vaultStore: VaultStore;
}

@inject('vaultStore')
@observer
export default class VaultScreen extends React.Component<IVaultScreenProps, {}> {

	async componentWillMount() {
		await this.props.vaultStore.loadVaults();
	}

	render() {
		let vaults = this.props.vaultStore.vaults.map((vault) => <SettingsText key={vault.guid} text={vault.name}/>);

		const vaultList = <SettingsList>
			{vaults}
		</SettingsList>

		return (
			<StyledRootView>
				<HeaderView>
					<HeaderButton title={"Close"} onPress={this.props.onClose}/>
				</HeaderView>
				{this.props.vaultStore.isLoading
					? <StyledActivityIndicator animating={this.props.vaultStore.isLoading}/>
					: vaultList
				}
			</StyledRootView>
		);
	}
}