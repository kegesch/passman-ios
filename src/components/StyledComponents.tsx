import styled from 'styled-components'
import {
	TextInput, View, Text, ScrollView, TouchableHighlight, ActivityIndicator, StatusBar, Image, Switch, SwitchProperties, TextInputProperties,
	ViewProperties, TouchableHighlightProperties
} from 'react-native'
import DefaultColors from './DefaultColors'
import React from 'react'

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
    margin-top: 5px;
    flex-direction: column;
`

const StyledLogo = styled(Image)`
    height: 30px;
    width: 30px;
    margin: 10px;
`

const HeaderView = styled(View)`
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
		<ScrollView>
			<StyledSettingsView>
				{props.children}
			</StyledSettingsView>
			{props.button}
		</ScrollView>
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
`