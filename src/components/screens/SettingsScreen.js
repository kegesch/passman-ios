import React, { Component } from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native'
import ItemContainer from '../ItemContainer'

export default class SettingsScreen extends Component {

    static navigationOptions = {
        title: 'Settings',
        tabBarLabel: 'Settings',
        tabBarIcon: ({tintColor}) => ((<Text style={{color: tintColor, fontSize: 24}}><FontAwesome>{Icons.cogs}</FontAwesome></Text>))
    }

    render() {
        return (
                <ItemContainer>
                    <Text>vaults</Text>
                </ItemContainer>
        )
    }
}