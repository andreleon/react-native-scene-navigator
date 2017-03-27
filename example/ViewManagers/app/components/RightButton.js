import React from 'react';
import AutoBindComponent from 'react-autobind-component';
import {
    StyleSheet,
} from 'react-native';

import {
    Button,
    Text,
} from '~/components';

export default class RightButton extends AutoBindComponent {

    onPress() {
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
            right: 10,
            alignSelf: 'center',
        },
        text: {
            fontSize: 18,
            color: '#fff',
        },
    });
};
