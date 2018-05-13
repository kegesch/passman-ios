import {Clipboard, Linking} from 'react-native'
import React from 'react'
import {LabelValue} from './StyledComponents'
import PopoverTooltip from 'react-native-popover-tooltip';

interface ILabelContentProps {
	secure?: boolean
	value: string;
	label: string;
	copy?: boolean;
	link?: boolean;
	editing?: boolean;
}

interface ILabelContentState {
	secured?: boolean;
}

export class LabelContent extends React.Component<ILabelContentProps, ILabelContentState> {

	constructor(props) {
		super(props);
		this.state = {}
	}

	showValue() {
		this.setState(previousState => {
			return {secured: !previousState.secured}
		})
	}
	copyValue() {
		Clipboard.setString(this.props.value)
	}

	async openLink(url) {
		try {
			if(Linking.canOpenURL(url))
			await Linking.openURL(url);
		}
		catch(err) {
			console.error('Could not link to url', err);
		}
	}

	componentDidMount() {
		if(this.props.secure) this.setState({secured: true})
	}

	render() {
		if(this.props.value) {
			const value = (this.state.secured ? "***************" : this.props.value);

			const actions = [];
			if(this.props.secure) actions.push({label: (this.state.secured ? 'show' : 'hide'), onPress: () => {this.showValue()}});
			if(this.props.copy) actions.push({label: 'copy', onPress: () => {this.copyValue()}});
			if(this.props.link) actions.push({label: 'open', onPress: () => {this.openLink(value)}});

			const item = <LabelValue value={value} label={this.props.label}/>;

			if(actions.length == 0) {
				return item;
			} else {
				return (
					<PopoverTooltip
						ref="toolTip"
						buttonComponent={
							item
						}
						items={actions}
					/>
				)
			}

		} else {
			return null
		}
	}
}