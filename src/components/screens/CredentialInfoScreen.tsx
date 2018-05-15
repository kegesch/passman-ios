import React from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {
	Text,
	View,
	StatusBar,
	Image,
	ScrollView,
	TouchableHighlight} from 'react-native';
import TOTP from '../../lib/TOTP'
import {ICredential, INavigationScreenProps} from '../../lib/Interfaces'
import DefaultColors from '../DefaultColors'
import {
    CredentialFavicon,
    CredentialInfo,
    CredentialInfoFavicon,
    CredentialInfoItem,
    InlineView,
    StyledRootView
} from '../StyledComponents'
import CredentialsStore from '../stores/CredentialsStore'
import {inject, observer} from 'mobx-react/native'
import {LabelContent} from '../CredentialValue'

interface ICredentialInfoScreenProps extends INavigationScreenProps{
	credentialsStore: CredentialsStore
}

interface ICredentialInfoScreenState {
	otp?: string;
	otpTimer?: number;
}

@inject("credentialsStore")
@observer
export default class CredentialInfoScreen extends React.Component<ICredentialInfoScreenProps, ICredentialInfoScreenState> {

	private interval;

	static navigationOptions = ({navigation}) => {return {
		title: "",
		headerTitleStyle: {
			color: DefaultColors.white
		},
		headerStyle: {
			backgroundColor: DefaultColors.blue
		},
		headerTintColor: DefaultColors.white,
		tabBarLabel: 'Credentials',
		tabBarIcon: ({tintColor}) => ((
			<Text style={{color: tintColor, fontSize: 24}}><FontAwesome>{Icons.key}</FontAwesome></Text>)),
		headerLeft:
			<TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.goBack()}>
				<Text style={{
					color: DefaultColors.white,
					padding: 0,
					paddingLeft: 15,
					fontSize: 35
				}}><FontAwesome>{Icons.angleLeft}</FontAwesome></Text>
			</TouchableHighlight>

		}
	};

	componentWillMount() {
		const credential: ICredential = this.props.credentialsStore.selectedCredential;
		if(!credential) this.props.navigation.goBack();

		if(credential.otp.secret != undefined) {
			this.updateOTP(credential.otp.secret)
			this.calculateRemainingOTPTime();
			this.interval = setInterval(() => {this.otpTimer(credential.otp.secret)}, 1000);
		}
	}

	componentWillUnmount() {
		if(this.interval != null) clearInterval(this.interval);
	}

	updateOTP(otpSecret: string) {
		const otp = TOTP.getOTP(otpSecret)
		this.setState({otp: otp})
	}

	calculateRemainingOTPTime(): number {
		const epoch = Math.round(new Date().getTime() / 1000.0);
		const countDown = 30 - (epoch % 30);
		this.setState({otpTimer: countDown});
		return countDown;
	}

	otpTimer(otpSecret: string) {
		this.calculateRemainingOTPTime();
		const epoch = Math.round(new Date().getTime() / 1000.0);
		if (epoch % 30 == 0) this.updateOTP(otpSecret);
	}

	render() {
		const credential: ICredential = this.props.credentialsStore.selectedCredential;

		const customFieldsView = credential.custom_fields.map((customField) =>
			<CredentialInfoItem noPadding key={customField.label}>
				<LabelContent label={customField.label} value={customField.value} copy secure={customField.secret}/>
			</CredentialInfoItem>
		);

		return (
			<StyledRootView>
				<StatusBar
					barStyle="light-content"
				/>
				<ScrollView>
				<CredentialInfoItem noPadding>
					<InlineView>
					<CredentialInfoFavicon size={38} resizeMode={"stretch"} source={{uri: "https://passmanfavicon.herokuapp.com/icon?url="+credential.url+"&size=20..38..200"}} />
					<LabelContent label={"Label"} value={credential.label} editing={false}/>
					</InlineView>
				</CredentialInfoItem>
				{
					(credential.username && credential.password ?
						<CredentialInfoItem noPadding>
							<LabelContent label={"Username"} value={credential.username} copy />
							<LabelContent label={"Password"} value={credential.password} secure copy />
						</CredentialInfoItem>
					: null)
				}
				{
					(credential.email ?
							<CredentialInfoItem noPadding>
								<LabelContent label={"E-Mail"} value={credential.email} copy />
							</CredentialInfoItem>
					: null
					)
				}
				{
					(credential.url ?
							<CredentialInfoItem noPadding>
								<LabelContent label={"URL"} value={credential.url} copy link />
							</CredentialInfoItem>
					: null
					)
				}
				{
					(credential.description ?
						<CredentialInfoItem noPadding>
							<LabelContent label={"Description"} value={credential.description} />
						</CredentialInfoItem>
					: null
					)
				}
				{
					(credential.otp.secret != undefined ?
						<CredentialInfoItem noPadding>
							<LabelContent label={"One-Time-Password"} value={this.state.otp+" "+this.state.otpTimer+"s"} />
						</CredentialInfoItem>
					: null)
				}
				{customFieldsView}
				<CredentialInfo
					created={new Date(credential.created * 1000).toLocaleString()}
					changed={new Date(credential.changed * 1000).toLocaleString()}
				/>
				</ScrollView>
			</StyledRootView>
		)

	}
}