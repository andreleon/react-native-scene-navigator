import React, { Component } from 'react';

import {
    StyleSheet,
} from 'react-native';

import {
    Button,
    Text,
} from 'components';

export default class LeftButton extends Component {

    onPress = () => {
        const { onPress } = this.props;

        if (onPress) onPress();
    }

    render() {
        const { children, style: extraStyle, title } = this.props;
        const { style } = this;

        return (
            <Button style={[style.button, extraStyle]} onPress={this.onPress}>
                { title && <Text style={style.text}>{title}</Text> }
            </Button>
        );
    }

    style = StyleSheet.create({
        button: {
            position: 'absolute',
            left: 10,
            alignSelf: 'center',
        },
        text: {
            fontSize: 18,
            color: '#fff',
        },
    });
};
