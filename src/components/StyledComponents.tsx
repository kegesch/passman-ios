import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import {
	TextInput, View, Text, ScrollView, TouchableHighlight, ActivityIndicator, StatusBar, Image, Switch, SwitchProperties, TextInputProperties,
	ViewProperties, TouchableHighlightProperties, ButtonProperties, TextProperties, ImageProperties, ActivityIndicatorProperties,
	ScrollViewProperties, StyleProp, ViewStyle
} from 'react-native'
import DefaultColors from './DefaultColors'
import React from 'react'
import {joinElements} from './JoinChildren'

export const StyledRootView = styled(View)`
	background-color: ${DefaultColors.appleGrey};
	flex: 1;
`

export const StyledLogoText = styled(Text)`
	font-weight: bold;
    font-size: 40;
    color: ${DefaultColors.white};
`

export const CenteredView = styled(View)`
    justify-content: center;
    align-items: center;
`
export const InlineView = styled(View)`
	flex-direction: row;
`
export const RightView = styled(View)`
	flex-direction: column;
	align-self: stretch;
`
const HeaderText = styled(Text)`
	align-self: flex-end;
	text-align: right;
	color: ${DefaultColors.white};
	font-size: 17px;
	font-weight: bold;
	margin-top: 10px;
`;

export const HeaderButton = (props: ButtonProperties) => {
	return (<TouchableHighlight onPress={props.onPress} underlayColor={"transparent"}>
		<RightView>
			<HeaderText>{props.title}</HeaderText>
		</RightView>
	</TouchableHighlight>);
}

export const SettingsListSeparator = styled(View)`
	height: 1px;
	margin-left: 15px;
	background-color: ${DefaultColors.lightGrey};
	align-self: stretch;
`

const StyledSettingsView = styled(View)`
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
    align-items: center;
`

export const Header = () => {
	return (
		<HeaderView>
			<StatusBar
				barStyle="light-content"
			/>
			<InlineView>
				<StyledLogo
					source={require('../../resources/app.png')}
				/>
				<StyledLogoText>
					Passman
				</StyledLogoText>
			</InlineView>
		</HeaderView>
	)
}

const PaddedView = styled(View)`
    padding-top: 25px;
`;

interface ISettingsListProps extends ViewProperties {
	children?: any;
	button?: any;
	scrollable?: boolean;
	info?: string;
}

export const SettingsList = (props: ISettingsListProps) => {
	const info =
		(props.info ? <SettingsInfoText>
            <CredentialInfoText>{props.info}</CredentialInfoText>
        </SettingsInfoText> : <PaddedView/>);

	const view =
		<StyledSettingsView style={props.style}>
			{joinElements(props.children, SettingsListSeparator)}
		</StyledSettingsView>


	if(props.scrollable) {
		return <StyledScrollView>
			{info}
			{view}
			{props.button}
		</StyledScrollView>
	} else {
		return <View>
			{info}
			{view}
			{props.button}
		</View>
	}
}

const SettingsLabel = styled(Text)`
	padding: 13px;
	padding-left: 15px;
	min-width: 100px;
	font-weight: normal;
	color: ${DefaultColors.darkBlue};
	font-size: 16px;
`

const SettingsTextInput = styled(TextInput)`
	padding: 13px;
	font-size: 16px;
	flex: 2;
	margin-right: 15px;
	color: ${DefaultColors.darkGrey};
`

const StyledSettingsRowView = styled(View)`
	flex: 1;
    flex-direction: row;
    background-color: transparent;
    height: 46px;
    align-items: flex-end;
`

interface ISettingsRowProps extends ViewProperties {
	label: string;
	right: any;
}

export const StyledSettingsRow = (props: ISettingsRowProps) => {
	return (
		<StyledSettingsRowView>
			<SettingsLabel>
				{props.label}
			</SettingsLabel>
			{props.right}
		</StyledSettingsRowView>
	)
}

interface ISettingsInputProps extends TextInputProperties{
	label: string;
}

export const SettingsInput = (props: ISettingsInputProps) => {
	return (
		<StyledSettingsRow label={props.label} right={
			<SettingsTextInput
				autoCorrect={false}
				autoCapitalize={'none'}
				{...props}
			/>}
		/>
	)
}

export const RightSwitch = styled(Switch)`
	align-self: flex-end;
	margin: 8px;
	margin-left: auto;
	margin-right: 15px;
`;

interface ISettingsSwitch extends SwitchProperties {
	label: string;
}

export const SettingsSwitch = (props: ISettingsSwitch) => {
	return (
		<StyledSettingsRow label={props.label} right={
			<RightSwitch
				{...props}
			/>
		}
		/>
	)
}

interface IHighlightedTextProps extends TextProperties {
	highlighted: boolean;
}

const HighlightedText = (props: IHighlightedTextProps) => <Text {...props} />

const SettingsTextItem = styledTS<IHighlightedTextProps>(styled(HighlightedText))`
	padding: 13px;
	font-size: 16px;
	flex: 2;
	margin-right: 15px;
	color: ${props => props.highlighted ? DefaultColors.blue : DefaultColors.darkGrey};
`;

interface ISettingsText {
	highlighted: boolean;
	text: string;
}

export const SettingsText = (props: ISettingsText) => {
	return (
		<StyledSettingsRow label={"«"} right={
			<SettingsTextItem highlighted={props.highlighted}>{props.text}</SettingsTextItem>
		} />
	);
}

interface ITouchableSettingsText extends ISettingsText, TouchableHighlightProperties {

}

export const TouchableSettingsText = (props: ITouchableSettingsText) => {
	return (
		<TouchableHighlight underlayColor={"transparent"} {...props}>
			<View>
				<SettingsText text={props.text} highlighted={props.highlighted}/>
			</View>
		</TouchableHighlight>
	)
}

interface ISettingsButtonProps extends TouchableHighlightProperties{
	title: string;
}

const SettingsButtonView = styled(View)`
	min-height: 40px;
	background-color: ${DefaultColors.blue};
	border-radius: 5px;
	justify-content: center;
	align-items: center;
	align-self: stretch;
	margin: 15px;
	margin-top: 20px;
	width: 350px;
`

const SettingsButtonText = styled(Text)`
	color: ${DefaultColors.white};
	font-weight: bold;
`

export const SettingsButton = (props: ISettingsButtonProps) => {
	return (
		<TouchableHighlight underlayColor={"transparent"} {...props}>
			<SettingsButtonView>
				<SettingsButtonText>
					{props.title}
				</SettingsButtonText>
			</SettingsButtonView>
		</TouchableHighlight>	)
}

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

const SettingsAvatar = styled(Image)`
	padding: 13px;
	padding-left: 15px;
	width: 30px;
`;

const SettingsImageIconView = styled(View)`
	flex: 1;
    flex-direction: row;
    background-color: ${DefaultColors.white};
    align-items: flex-end;
`;

interface ISettingsImageItemProps {
	imageUri: string;
	rightItem: any;
}

export const SettingsImageIcon = (props: ISettingsImageItemProps) => {
	return (
		<SettingsImageIconView>
			<SettingsAvatar source={{uri: props.imageUri}}/>
			{props.rightItem}
		</SettingsImageIconView>
	)
}

interface ITitleItemProps {
	title: string;
	subTitle: string;
}

const TitleText = styled(Text)`
	padding-left: 10px;
`;

const SubTitleText = styled(Text)`
	color: ${DefaultColors.darkGrey};
	font-size: 10;
	padding-left: 10px;
`;

const TitleItemView = styled(View)`
	padding-left: 10px;
	padding-right 18px;
`;

export const TitleItem = (props: ITitleItemProps) => {
	return (
		<TitleItemView>
			<TitleText>{props.title}</TitleText>
			<SubTitleText>{props.subTitle}</SubTitleText>
		</TitleItemView>
	)
}

interface ICredentialFaviconProps extends ImageProperties{
	size: number;
}

export const CredentialFavicon = (props: ICredentialFaviconProps) => {
	return <Image style={[{width: props.size, height: props.size}, props.style]} {...props} />;
}

interface ICredentialItemProps extends TouchableHighlightProperties {
	url: string;
	title: string;
	subTitle: string;
}

const UnstyledCredentialItem = (props: ICredentialItemProps) => {
	return (
		<TouchableHighlight underlayColor={"transparent"} {...props}>
			<InlineView>
				<CredentialFavicon source={{uri: "https://besticon-demo.herokuapp.com/icon?url="+props.url+"&size=20..30..200"}} size={30}/>
				<TitleItem title={props.title} subTitle={props.subTitle} />
			</InlineView>
		</TouchableHighlight>
	)
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

const CredentialSectionHeaderView = styled(View)`
	border-bottom-width: 1px;
    border-bottom-color: ${DefaultColors.appleGrey};
    background-color: ${DefaultColors.darkWhite};
`;

export const CredentialSectionHeader = (props: ICredentialSectionHeaderProps) => {
	return (
		<CredentialSectionHeaderView>
			<SectionHeaderText>{props.title}</SectionHeaderText>
		</CredentialSectionHeaderView>
	)
}

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
	)
}

export const CredentialInfoText = styled(Text)`
	color: ${DefaultColors.darkGrey};
`;

interface ICredentialInfoProps {
	created: string;
	changed: string;
}

const CredentialInfoView = styled(View)`
	margin-top: 10px;
	align-items: center;
	justify-content: center;
`;


export const CredentialInfo = (props: ICredentialInfoProps) => {
	return (
		<CredentialInfoView>
			<CredentialInfoText>CHANGED {props.changed}</CredentialInfoText>
			<CredentialInfoText>CREATED {props.created}</CredentialInfoText>
		</CredentialInfoView>
	)
}

export const CredentialInfoItem = styled(SettingsList)`
`;

const CredentialInfoFaviconView = styled(View)`
	margin-left: 15px;
	margin-top: 8px;
`;

export const CredentialInfoFavicon = (props: ICredentialFaviconProps) => {
	return <CredentialInfoFaviconView><CredentialFavicon {...props}/></CredentialInfoFaviconView>
}

export const SettingsInfoText = styled(View)`
	padding: 10px 18px 10px 18px;
`;