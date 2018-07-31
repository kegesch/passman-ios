import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import {
	TextInput,
	View,
	Text,
	ScrollView,
	TouchableHighlight,
	ActivityIndicator,
	StatusBar,
	Image,
	Switch,
	TouchableHighlightProps, ImageProps, TextInputProps, ViewProps, ButtonProps, SwitchProps, TextProps, TouchableHighlightComponent
} from 'react-native';
import DefaultColors from './DefaultColors';
import React from 'react';
import {joinElements} from './JoinChildren';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {CachedImage} from 'react-native-img-cache';

export const StyledRootView = styled(View)`
	background-color: ${DefaultColors.appleGrey};
	flex: 1;
`;

export const StyledLogoText = styled(Text)`
	font-weight: bold;
	font-size: 40;
	color: ${DefaultColors.white};
`;

export const CenteredView = styled(View)`
	justify-content: center;
	align-items: center;
`;
export const InlineView = styled(View)`
	flex-direction: row;
`;
export const RightView = styled(View)`
	flex-direction: column;
	align-self: flex-end;
`;
const HeaderText = styled(Text)`
	align-self: flex-end;
	text-align: right;
	color: ${DefaultColors.white};
	font-size: 17px;
	font-weight: bold;
	margin-top: 10px;
`;

export const HeaderButton = (props: ButtonProps) => {
	return (<TouchableHighlight onPress={props.onPress} underlayColor={'transparent'}>
		<RightView>
			<HeaderText>{props.title}</HeaderText>
		</RightView>
	</TouchableHighlight>);
};

export const ListSeparator = styled(View)`
	height: 1px;
	margin-left: 15px;
	background-color: ${DefaultColors.lightGrey};
	align-self: stretch;
`;

export const CredentialsListHeaderSeparator = styled(View)`
	height: 1px;
	background-color: ${DefaultColors.lightGrey};
	align-self: stretch;
`;

const StyledListView = styled(View)`
	align-self: stretch;
	border-color: ${DefaultColors.lightGrey};
	border-width: 0px;
	border-bottom-width: 1px;
	border-top-width: 1px;
	background-color: ${DefaultColors.white};
	flex-direction: column;
`;

const StyledScrollView = styled(ScrollView)`
	padding-bottom: 25px;
`;

const StyledLogo = styled(Image)`
	height: 30px;
	width: 30px;
	margin: 10px;
`;

export const HeaderView = styled(View)`
	background-color: ${DefaultColors.blue};
	border-width: 0px;
	border-bottom-width: 3px;
	border-color: ${DefaultColors.lightBlue}
	padding: 20px;
	padding-top: 40px;
	justify-content: center;
	align-self: stretch;
`;

export const Header = () => {
	return (
		<HeaderView>
			<StatusBar
				barStyle="light-content"
			/>
			<CenteredView>
				<InlineView>

						<StyledLogo
							source={require('../../resources/app.png')}
						/>
						<StyledLogoText>
							Passman
						</StyledLogoText>

				</InlineView>
			</CenteredView>
		</HeaderView>
	);
};

const PaddedView = styled(View)`
	padding-top: 25px;
`;

export const CredentialInfoText = styled(Text)`
	color: ${DefaultColors.grey};
`;

export const ListInfoText = styled(View)`
	padding: 10px 18px 10px 18px;
`;

interface IListProps extends ViewProps {
	children?: any;
	button?: any;
	scrollable?: boolean;
	info?: string;
	noPadding?: boolean;
	separatorComponent?: any;
}

export const List = (props: IListProps) => {
	const info =
		(props.info
			? 	<ListInfoText>
					<CredentialInfoText>{props.info}</CredentialInfoText>
				</ListInfoText>
			: (props.noPadding
				? null
				: <PaddedView/>));

	const view =
		<StyledListView style={props.style}>
			{joinElements(props.children, props.separatorComponent || ListSeparator)}
		</StyledListView>;

	if (props.scrollable) {
		return <StyledScrollView>
			{info}
			{view}
			{props.button}
		</StyledScrollView>;
	} else {
		return <View>
			{info}
			{view}
			{props.button}
		</View>;
	}
};

const ListLabel = styled(Text)`
	padding: 13px;
	padding-left: 15px;
	min-width: 100px;
	font-weight: normal;
	color: ${DefaultColors.darkBlue};
	font-size: 16px;
`;

const ListTextInput = styled(TextInput)`
	padding: 13px;
	font-size: 16px;
	flex: 2;
	margin-right: 15px;
	color: ${DefaultColors.darkGrey};
`;

const StyledListRowView = styled(View)`
	flex: 1;
	flex-direction: row;
	background-color: transparent;
	min-height: 46px;
	align-items: flex-end;
`;

interface IListRowProps extends ViewProps {
	label: string;
	right: any;
}

export const StyledListRow = (props: IListRowProps) => {
	return (
		<StyledListRowView>
			<ListLabel>
				{props.label}
			</ListLabel>
			{props.right}
		</StyledListRowView>
	);
};

interface IListInputProps extends TextInputProps {
	label: string;
}

export const ListInput = (props: IListInputProps) => {
	return (
		<StyledListRow label={props.label} right={
			<ListTextInput
				autoCorrect={false}
				autoCapitalize={'none'}
				{...props}
			/>}
		/>
	);
};

export const RightSwitch = styled(Switch)`
	align-self: flex-end;
	margin: 8px;
	margin-left: auto;
	margin-right: 15px;
`;

interface IListSwitch extends SwitchProps {
	label: string;
}

export const ListSwitch = (props: IListSwitch) => {
	return (
		<StyledListRow label={props.label} right={
			<RightSwitch
				{...props}
			/>
		}
		/>
	);
};

interface IHighlightedTextProps extends TextProps {
	highlighted: boolean;
}

const HighlightedText = (props: IHighlightedTextProps) => <Text {...props} />;

const ListTextItem = styledTS<IHighlightedTextProps>(styled(HighlightedText))`
	padding: 13px;
	font-size: 16px;
	flex: 2;
	margin-right: 15px;
	color: ${props => props.highlighted ? DefaultColors.blue : DefaultColors.darkGrey};
`;

interface IListTextProps {
	highlighted?: boolean;
	text: string;
	label: string;
}

export const ListText = (props: IListTextProps) => {
	return (
		<StyledListRow label={props.label} right={
			<ListTextItem highlighted={props.highlighted}>{props.text}</ListTextItem>
		} />
	);
};

interface ITouchableListText extends IListTextProps, TouchableHighlightProps {

}

export const TouchableListText = (props: ITouchableListText) => {
	return (
		<TouchableHighlight underlayColor={'transparent'} {...props}>
			<View>
				<ListText {...props}/>
			</View>
		</TouchableHighlight>
	);
};

interface IListButtonProps extends TouchableHighlightProps {
	title: string;
}

const ListButtonView = styled(View)`
	min-height: 40px;
	background-color: ${DefaultColors.blue};
	border-radius: 5px;
	justify-content: center;
	align-items: center;
	align-self: stretch;
	margin: 15px;
	margin-top: 20px;
	width: 350px;
`;

const ListButtonText = styled(Text)`
	color: ${DefaultColors.white};
	font-weight: bold;
`;

export const ListButton = (props: IListButtonProps) => {
	return (
		<TouchableHighlight underlayColor={'transparent'} {...props}>
			<ListButtonView>
				<ListButtonText>
					{props.title}
				</ListButtonText>
			</ListButtonView>
		</TouchableHighlight>	);
};

export const StyledActivityIndicator = styled(ActivityIndicator)`
	margin: 5px;
	position: absolute;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	align-items: center;
	justify-content: center;
`;

interface ITitleItemProps {
	title: string;
	subTitle?: string;
}

const TitleText = styled(Text)``;

const SubTitleText = styled(Text)`
	color: ${DefaultColors.darkGrey};
	font-size: 10;
`;

const TitleItemView = styled(View)`
	margin-left: 18px;
	padding-right 18px;
	justify-content: center;
	flex: 1;
`;

export const TitleItem = (props: ITitleItemProps) => {
	return (
		<TitleItemView>
			<TitleText>{props.title}</TitleText>
			<SubTitleText>{props.subTitle}</SubTitleText>
		</TitleItemView>
	);
};

interface ICredentialFaviconProps extends ImageProps {
	size: number;
}

export const CredentialFavicon = (props: ICredentialFaviconProps) => {
	return <Image style={{width: props.size, height: props.size, margin: 0, padding: 0}} {...props} />;
};

interface ICredentialItemProps extends TouchableHighlightProps {
	url: string;
	title: string;
	subTitle: string;
}
class UnstyledCredentialItem extends React.PureComponent<ICredentialItemProps, {}> {
	render() {
		return (
			<TouchableHighlight underlayColor={'transparent'} {...this.props}>
				<InlineView>
					<CredentialFavicon source={{uri: 'https://passmanfavicon.herokuapp.com/icon?url=' + this.props.url + '&size=20..30..200', cache: 'force-cache'}} size={30}/>
					<TitleItem title={this.props.title} subTitle={this.props.subTitle} />
				</InlineView>
			</TouchableHighlight>
		);
	}
}

export const CredentialItem = styledTS<ICredentialItemProps>(styled(UnstyledCredentialItem))`
	background-color: ${DefaultColors.white};
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 18px;
`;

interface ICredentialSectionHeaderProps {
	title: string;
}

const SectionHeaderText = styled(Text)`
	font-size: 20px;
	color: ${DefaultColors.darkGrey};
	padding-left: 18px;
	padding-top: 5px;
`;

const SectionHeaderView = styled(View)`
	background-color: ${DefaultColors.white};
	border-bottom-width: 1px;
	border-bottom-color: ${DefaultColors.lightGrey};
`;

export const CredentialSectionHeader = (props: ICredentialSectionHeaderProps) => {
	return (
		<SectionHeaderView>
			<SectionHeaderText>{props.title}</SectionHeaderText>
		</SectionHeaderView>
	);
};

const Label = styled(Text)`
	color: ${DefaultColors.blue};
	font-size: 14px;
`;

const Value = styled(Text)`
	color: ${DefaultColors.darkGrey};
	font-size: 18;
`;

interface ILabelValueProps {
	label: string;
	value: string;
}

const LabelValueView = styled(View)`
	margin: 8px;
	margin-left: 15px;
	flex-direction: column;
`;

export const LabelValue = (props: ILabelValueProps) => {
	return (
		<LabelValueView>
			<Label>{props.label}</Label>
			<Value>{props.value}</Value>
		</LabelValueView>
	);
};

interface ICredentialInfoProps {
	created: string;
	changed: string;
}

const CredentialInfoView = styled(View)`
	margin-bottom: 20px;
	align-items: center;
	justify-content: center;
	margin-top: 18px;
`;

export const CredentialInfo = (props: ICredentialInfoProps) => {
	return (
		<CredentialInfoView>
			<CredentialInfoText>CHANGED {props.changed}</CredentialInfoText>
			<CredentialInfoText>CREATED {props.created}</CredentialInfoText>
		</CredentialInfoView>
	);
};

export const CredentialInfoItem = styled(List)`
	margin-top: 15px;
`;

const CredentialInfoFaviconView = styled(View)`
	margin-left: 15px;
	margin-top: 8px;
	padding: 0px;
`;

export const CredentialInfoFavicon = (props: ICredentialFaviconProps) => {
	return <CredentialInfoFaviconView>
		<Image style={{width: props.size, height: props.size}} source={props.source} />
	</CredentialInfoFaviconView>;
};

const SettingsListItemIconView = styled(View)`
	width: 30px;
	height: 46px;
	justify-content: center;
	align-items: center;
	margin-right: 18px
	margin-left: 18px;
`;

export const IconView = styled(View)`
	padding: 0px;
	margin: 0px;
	width: 30px;
	height: 30px;
`;

const SettingsListTextView = styled(View)`
	justify-content: center;
	flex: 2;
	margin-right: 15px;
`;

const SettingsListItemArrowView = styled(View)`
	width: 30px;
	height: 46px;
	justify-content: center;
	align-items: center;
	margin-left: 18px;
`;

const SettingsListItemArrow = styled(Text)`
	font-size: 35px;
	height: 35px;
	width: 35px;
	padding: 0px;
	margin: 0px;
`;

const SettingsListText = (props: ITitleItemProps) => {
	return (
		<SettingsListTextView>
			<TitleText>{props.title}</TitleText>
			<SubTitleText>{props.subTitle}</SubTitleText>
		</SettingsListTextView>
	);
};

interface ISettingsListItemProps extends TouchableHighlightProps {
	icon: any;
	label: string;
	subLabel?: string;
}

export const SettingsListItem = (props: ISettingsListItemProps) => {
	return (
		<TouchableHighlight underlayColor={DefaultColors.lightGrey} {...props}>
			<StyledListRowView>
				<SettingsListItemIconView>{props.icon}</SettingsListItemIconView>
				<SettingsListText title={props.label} subTitle={props.subLabel}/>
				<SettingsListItemArrowView>
					<SettingsListItemArrow><FontAwesome>{Icons.angleRight}</FontAwesome></SettingsListItemArrow>
				</SettingsListItemArrowView>
			</StyledListRowView>
		</TouchableHighlight>
	);
};

export const SettingsListSeperator = styled(View)`
	height: 1px;
	margin-left: 60px;
	background-color: ${DefaultColors.lightGrey};
	align-self: stretch;
`;

interface ICheckListItemProps extends TouchableHighlightProps {
	checked: boolean;
	label: string;
	subLabel?: string;
}

export const CheckListItem = (props: ICheckListItemProps) => {
	return (
		<TouchableHighlight underlayColor={DefaultColors.lightGrey} {...props}>
			<StyledListRowView>
				<SettingsListItemIconView>
					{
						props.checked
							? <Text><FontAwesome>{Icons.check}</FontAwesome></Text>
							: null
					}
				</SettingsListItemIconView>
				<SettingsListText title={props.label} subTitle={props.subLabel}/>
			</StyledListRowView>
		</TouchableHighlight>
	);
};

const HighlightedSettingsListText = styledTS<IHighlightedTextProps>(styled(HighlightedText))`
	justify-content: center;
	color: ${props => props.highlighted ? DefaultColors.blue : DefaultColors.darkGrey};
`;

const VerticalCenteredView = styled(View)`
	justify-content: center
	min-height: 46px;
	padding: 10px;
	flex: 1;
	padding-left: 15px;
`;

interface ISettingsTouchTextItemProps extends TouchableHighlightProps {
	label: string;
	rightText?: string;
	highlighted?: boolean;
}

export const SettingsTouchTextItem = (props: ISettingsTouchTextItemProps) => {
	return (
		<TouchableHighlight underlayColor={DefaultColors.lightGrey} {...props}>
			<StyledListRowView>
				<VerticalCenteredView>
					<HighlightedSettingsListText highlighted={props.highlighted}>{props.label}</HighlightedSettingsListText>
				</VerticalCenteredView>
				<RightView><SettingsListText title={props.rightText} /></RightView>
			</StyledListRowView>
		</TouchableHighlight>
	);
};