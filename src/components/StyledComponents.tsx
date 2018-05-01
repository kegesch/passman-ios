import styled from 'styled-components'
import {
	TextInput, View, Text, ScrollView, TouchableHighlight, ActivityIndicator, StatusBar, Image, Switch, SwitchProperties, TextInputProperties,
	ViewProperties, TouchableHighlightProperties, Animated, ButtonProperties, TextProperties
} from 'react-native'
import DefaultColors from './DefaultColors'
import React from 'react'
import { CachedImage } from 'react-native-cached-image';
import {joinElements} from './JoinChildren'
export const StyledTextInput = styled(TextInput)`
	color: ${DefaultColors.darkGrey};
	background-color: ${DefaultColors.white};
	border-color: ${DefaultColors.lightBlue};
	border-width: 0px;
	border-top-width: 2px;
	padding: 4px;
	font-size: 20;
	align-self: stretch;
`

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
`

const StyledScrollView = styled(ScrollView)`
	padding-top: 25px;
	padding-bottom: 25px;
`;

const StyledLogo = styled(Image)`
    height: 30px;
    width: 30px;
    margin: 10px;
`
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

interface ISettingsListProps {
	children?: any[];
	button?: any;
}

export const SettingsList = (props: ISettingsListProps) => {
	return (
		<StyledScrollView>
			<StyledSettingsView>
				{joinElements(props.children, SettingsListSeparator)}
			</StyledSettingsView>
			{props.button}
		</StyledScrollView>
	)
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

interface ISettingsRow extends ViewProperties {
	label: string;
	right: any;
}

export const SettingsRow = (props: ISettingsRow) => {
	return (
		<View style={props.style}>
			<SettingsLabel>
				{props.label}
			</SettingsLabel>
			{props.right}
		</View>
	)
}

export const StyledSettingsRow = styled(SettingsRow)`
	flex: 1;
    flex-direction: row;
    background-color: transparent;
    height: 46px;
    align-items: flex-end;
`

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

const SettingsTextItem = styled(HighlightedText)`
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

interface ISettingsImageItemProps {
	imageUri: string;
	rightItem: any;
	style?: string;
}

const ImageItem = (props: ISettingsImageItemProps) => {
	return (
		<View style={props.style}>
			<SettingsAvatar source={{uri: props.imageUri}}/>
			{props.rightItem}
		</View>
	)
}

export const SettingsImageIcon = styled(ImageItem)`
	flex: 1;
    flex-direction: row;
    background-color: ${DefaultColors.white};
    align-items: flex-end;
`;

interface ITitleItemProps {
	title: string;
	subTitle: string;
	style?: string;
}

const TitleText = styled(Text)`
	padding-left: 10px;
`;

const SubTitleText = styled(Text)`
	color: ${DefaultColors.darkGrey};
	font-size: 10;
	padding-left: 10px;
`;

const UnstyledTitleItem = (props: ITitleItemProps) => {
	return (
		<View style={props.style}>
			<TitleText>{props.title}</TitleText>
			<SubTitleText>{props.subTitle}</SubTitleText>
		</View>
	)
}

export const TitleItem = styled(UnstyledTitleItem)`
	flex: 0;
	padding-left: 10px;
	padding-right 18px;
`;

interface ICredentialItemProps extends TouchableHighlightProperties {
	url: string;
	title: string;
	subTitle: string;
	style?: string;
}

const UnstyledCredentialItem = (props: ICredentialItemProps) => {
	return (
		<TouchableHighlight style={props.style} underlayColor={"transparent"} {...props}>
			<TitleItem title={props.title} subTitle={props.subTitle} />
		</TouchableHighlight>
	)
}

export const CredentialItem = styled(UnstyledCredentialItem)`
	background-color: ${DefaultColors.white};
	padding-top: 10px;
	padding-bottom: 10px;
`;

interface ICredentialSectionHeaderProps {
	style?: string;
	title: string;
}

const SectionHeaderText = styled(Text)`
    font-size: 20px;
    color: ${DefaultColors.darkGrey};
    padding-left: 15px;
    padding-top: 5px;
`;

const UnstyledCredentialSectionHeader = (props: ICredentialSectionHeaderProps) => {
	return (
		<View style={props.style}>
			<SectionHeaderText>{props.title}</SectionHeaderText>
		</View>
	)
}

export const CredentialSectionHeader = styled(UnstyledCredentialSectionHeader)`
	border-bottom-width: 1px;
    border-bottom-color: ${DefaultColors.appleGrey};
    background-color: ${DefaultColors.darkWhite};
`;
