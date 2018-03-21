import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native'

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f1f1f1',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        marginBottom: 10,
        padding: 8,
        paddingLeft: 12
    }
})

export default class ItemContainer extends Component {

    render() {
        return (
            <View style={[styles.contentContainer, this.props.style]}>
                {this.props.children}
            </View>

        )
    }
}