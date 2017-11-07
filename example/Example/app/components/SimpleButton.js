import React, { Component } from 'react';

import {
    StyleSheet,
} from 'react-native';

import {
    Button,
    Text,
} from 'components';

function elevation(e) {
    return {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: e / 2,
        },
        shadowRadius: e / 2,
        shadowOpacity: 0.5,
        elevation: e,
    };
}

export default class SimpleButton extends Component {

    onPress = (event) => {
        const { onPress } = this.props;

        if (onPress) onPress(event);
    }

    render() {
        const { style: extraStyle, title } = this.props;
        const { style } = this;

        return (
            <Button style={[style.button, extraStyle]} onPress={this.onPress}>
                { title && <Text style={style.text}>{title}</Text> }
            </Button>
        );
    }

    style = StyleSheet.create({
        button: {
            padding: 10,
            borderRadius: 4,
            backgroundColor: '#f4f4f4',
            marginBottom: 10,
            ...elevation(2),
        },
        text: {
            fontSize: 18,
            color: '#383838',
        },
    });
};
