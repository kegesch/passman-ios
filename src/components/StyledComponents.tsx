import styled from 'styled-components'
import {
	TextInput, View, Text, ScrollView, TouchableHighlight, ActivityIndicator, StatusBar, Image, Switch, SwitchProperties, TextInputProperties,
	ViewProperties, TouchableHighlightProperties, Animated, ButtonProperties
} from 'react-native'
import DefaultColors from './DefaultColors'
import React from 'react'
import { CachedImage } from 'react-native-cached-image';
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
				{props.children}
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

interface ISettingsText {
	text: string;
}

export const SettingsText = (props: ISettingsText) => {
	return (
		<StyledSettingsRow	label={""} right={
			<Text>{props.text}</Text>
		} />
	);
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
`;

const SettingsAvatar = styled(CachedImage)`
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
	background-color: transparent;
	height: 46px;
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
	flexDirection: vertical;
`;

interface ICredentialItemProps {
	url: string;
	onPress: () => void;
	title: string;
	subTitle: string;
}

export const CredentialItem = (props: ICredentialItemProps) => {
	return (
		<TouchableHighlight onPress={props.onPress}>
			<SettingsImageIcon
				imageUri={"https://besticon-demo.herokuapp.com/icon?url="+props.url+"&size=30..30..256"}
				righItem={<TitleItem title={props.title} subTitle={props.subTitle} />}
			/>
		</TouchableHighlight>
	)
}

interface ICredentialSectionHeaderProps {
	style?: string;
	title: string;
}

const SectionHeaderText = styled(Text)`
    font-size: 20px;
    color: ${DefaultColors.darkGrey},
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
`;

interface IToggleableComponentProps {
	children?: any;
}

export class ToggleableComponent extends React.Component<IToggleableComponentProps, {}> {

	private springValue;

	constructor(props) {
		super(props);
		this.springValue = new Animated.Value(0.3)
	}

	componentDidMount() {
		this.spring();
	}

	componentWillUnmount() {
		this.unspring();
	}

	spring () {
		this.springValue.setValue(0.3)
		Animated.spring(
			this.springValue,
			{
				toValue: 1,
				speed: 10,
			}
		).start()
	}

	unspring() {
		Animated.timing(
			this.springValue,
			{
				toValue: 0.3,
				duration: 300,
			}
		).start();
	}

	render() {
		return (
			<Animated.View style={{transform: [{scale: this.springValue}]}}>
				{this.props.children}
			</Animated.View>
		)
	}
}

export const OverlayComponent = styled(View)`
	position: absolute;
	z-index: 99;
`;