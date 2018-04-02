import React, { Component } from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	ActivityIndicator,
	Button,
	Clipboard,
	Image,
	Linking,
	ScrollView, TouchableHighlight, TextInput
} from 'react-native';

import PopoverTooltip from 'react-native-popover-tooltip';
import TOTP from '../../lib/TOTP'

export default class CredentialInfoScreen extends Component {

	static navigationOptions = {
		title: "",
		headerTintColor: '#fff',
		tabBarLabel: 'Credentials',
		tabBarIcon: ({tintColor}) => ((
			<Text style={{color: tintColor, fontSize: 24}}><FontAwesome>{Icons.key}</FontAwesome></Text>))
	};

	constructor() {
		super()
		this.state = {isLoading: true, edit: false}
	}

	componentWillMount() {
		const { params } = this.props.navigation.state
		this.setState({credential: params.credential})
		jsonOtp = JSON.parse(params.credential.otp)
		if(jsonOtp.secret != null) this.setState({otpSecret: jsonOtp.secret})
	}

	editOrSave() {
		var edit = this.state.edit
		this.setState({edit: !edit})
	}

	componentDidMount() {
		if(this.state.otpSecret != null) {
			otp = TOTP.getOTP(this.state.otpSecret)
			this.setState({otp: otp})
			this.interval = setInterval(() => {this.otpTimer()}, 1000)
		}
		this.setState({isLoading: false})
	}

	componentWillUnmount() {
		if(this.interval != null) clearInterval(this.interval)
	}

	updateOTP() {
		otp = TOTP.getOTP(this.state.otpSecret)
		this.setState({otp: otp})
	}

	otpTimer() {
		epoch = Math.round(new Date().getTime() / 1000.0);
		countDown = 30 - (epoch % 30);
		if (epoch % 30 == 0) this.updateOTP();
		this.setState({otpUpdateTimer: countDown})

	}

	render() {
		if(this.state.isLoading) {
			return (
				<View style={styles.root}>
					<ActivityIndicator style={styles.loading} animating={this.state.isLoading}/>
				</View>
			)
		}
		if(this.state.credential !== null) {
			customFieldsView = []
			customFields = JSON.parse(this.state.credential.custom_fields)
			for (i = 0; i < customFields.length; i++) {
				customFieldsView.push(
					<View key={customFields[i].label} style={styles.contentContainer}>
						<LabelContent label={customFields[i].label} value={customFields[i].value} copy={true} secure={customFields[i].secret}/>
					</View>
				)
			}
			return (
				<View style={styles.root}>
					<StatusBar
						barStyle="light-content"
					/>
					<ScrollView>
					<View style={[styles.contentContainer, {flexDirection: "row", flex:1}]}>
						<Image style={{height: 40, width: 40, marginRight: 12}} source={{uri: "https://icons.better-idea.org/icon?url="+this.state.credential.url+"&size=30..40..256"}}/>
						<LabelContent label={"Label"} value={this.state.credential.label} editing={this.state.edit}/>
						<TouchableHighlight onPress={() => this.editOrSave()} style={{justifyContent: "flex-end"}}>
							<Text style={{color: "#007AC7", fontSize: 40}}><FontAwesome>{Icons.pencilSquareO}</FontAwesome></Text>
						</TouchableHighlight>
					</View>
					{
						(this.state.credential.username != null && this.state.credential.password != null ?
							<View style={styles.contentContainer}>
								<LabelContent label={"Username"} value={this.state.credential.username} copy={true} editing={this.state.edit}/>
								<View style={styles.seperator} />
								<LabelContent label={"Password"} value={this.state.credential.password} secure={true} copy={true} editing={this.state.edit}/>
							</View>
						: null)
					}
					{
						(this.state.credential.email != null ?
							<View style={styles.contentContainer}>
								<LabelContent label={"E-Mail"} value={this.state.credential.email} copy={true} editing={this.state.edit}/>
							</View>
						: null
						)
					}
					{
						(this.state.credential.url != null ?
							<View style={styles.contentContainer}>
								<LabelContent label={"URL"} value={this.state.credential.url} copy={true} link={true} editing={this.state.edit}/>
							</View>
						: null
						)
					}
					{
						(this.state.credential.description != null ?
							<View style={styles.contentContainer}>
								<LabelContent label={"Description"} value={this.state.credential.description} editing={this.state.edit}/>
							</View>
						: null
						)
					}
					{
						(this.state.otpSecret != null ?
							<View style={styles.contentContainer}>
								<LabelContent label={"One-Time-Password"} value={this.state.otp+" "+this.state.otpUpdateTimer+"s"} editing={this.state.edit}/>
							</View>
						: null)
					}
					{customFieldsView}
					<View style={styles.info}>
						<Text style={styles.infoText}>CHANGED {this.state.credential.changed.toLocaleString()}</Text>
						<Text style={styles.infoText}>CREATED {this.state.credential.created.toLocaleString()}</Text>
					</View>
					</ScrollView>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: '#FAFAFA',
		flex: 1,
	},
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	contentContainer: {
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: '#f1f1f1',
		borderBottomWidth: 1,
		borderBottomColor: '#f1f1f1',
		marginBottom: 10,
		padding: 8,
		paddingLeft: 12
	},
	info: {
		marginTop: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	infoText: {
		color: '#aaa'
	},
	seperator: {
		borderTopColor: '#f1f1f1',
		borderTopWidth: 1,
		marginBottom: 8
	},
	labelContentView: {
		marginBottom: 8
	},
	labelContentLabel: {
		color: '#007AC7',
		fontSize: 14,
	},
	labelContentValueView: {
	flexWrap: 'wrap',
		alignItems: 'flex-start',
	flexDirection:'row',
	},
	labelContentValue: {
		color: '#333',
		fontSize: 18,
	},
	labelContentValueShowButton: {
		position: 'absolute',
		right: 0,
	},
	labelContentValueCopyButton: {

	},
	editTextInput: {
		borderBottomColor: "#CCC",
		borderBottomWidth: 1,
		fontStyle: 'italic',
		padding: 4,
		flex: 1
	}
})

class LabelContent extends Component {

	showValue() {
		this.setState(previousState => {
			return {secured: !previousState.secured}
		})
	}
	copyValue() {
		Clipboard.setString(this.props.value)
	}
	openLink() {
	   /** Linking.canOpenURL(this.props.value).then(supported => {
			if (!supported) {
				console.log('Can\'t handle url: ' + url);
			} else {
				return Linking.openURL(url);
			}
		}).catch(err => console.error('An error occurred', err)); **/
	}
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount() {
		if(this.props.secure) this.setState({secured: true})
	}

	render() {
		if(this.props.value != "" || this.props.value != "null") {
			value = (this.state.secured ? "········" : this.props.value)
			actions = []
			if(this.props.secure) actions.push({label: (this.state.secured ? 'show' : 'hide'), onPress: () => {this.showValue()}})
			if(this.props.copy) actions.push({label: 'copy', onPress: () => {this.copyValue()}})
			if(this.props.link) actions.push({label: 'open', onPress: () => {this.openLink()}})
			console.log(this.props.editing)
			if(this.props.editing) {
				return (
					<View style={styles.labelContentView}>
						<Text style={styles.labelContentLabel}>{this.props.label}</Text>
						<View style={styles.labelContentValueView}>
							<TextInput
								style={styles.editTextInput}
								editable={true}
								onChangeText={(text) => {
									this.props.value = text
								}}
								value={this.props.value}
								defaultValue={this.props.value}/>
						</View>
					</View>
				)
			}
			if(actions.length == 0) {
				return (
					<View style={styles.labelContentView}>
						<Text style={styles.labelContentLabel}>{this.props.label}</Text>
						<View style={styles.labelContentValueView}>
							<Text style={styles.labelContentValue}>{value}</Text>
						</View>
					</View>
				)
			} else {
				return (
					<PopoverTooltip
						ref="toolTip"
						buttonComponent={
							<View style={styles.labelContentView}>
								<Text style={styles.labelContentLabel}>{this.props.label}</Text>
								<View style={styles.labelContentValueView}>
									<Text style={styles.labelContentValue}>{value}</Text>
								</View>
							</View>
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