import React, { Component } from 'react';

import {
    TouchableNativeFeedback,
    View,
    StyleSheet,
} from 'react-native';

export default class Button extends Component {

    onPress = (event) => {
        const { onPress } = this.props;

        if (onPress) onPress(event);
    }

    render() {
        const { children, style: extraStyle } = this.props;
        const { style } = this;
        return (
            <TouchableNativeFeedback
                onPress={this.onPress}
                background={TouchableNativeFeedback.SelectableBackground()}
            >
                <View style={[style.container, extraStyle]}>
                    {children}
                </View>
            </TouchableNativeFeedback>
        );
    }

    style = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};
