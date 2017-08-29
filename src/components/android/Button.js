import React from 'react';
import AutoBindComponent from 'react-autobind-component';

import {
    TouchableNativeFeedback,
    View,
    StyleSheet,
} from 'react-native';

export default class Button extends AutoBindComponent {

    onPress(event) {
        const { onPress } = this.props;

        if (onPress) onPress(event);
    }

    render() {
        const { children, style: extraStyle, accessibilityLabel } = this.props;
        const { style } = this;
        return (
            <TouchableNativeFeedback
                onPress={this.onPress}
                background={TouchableNativeFeedback.SelectableBackground()}
            >
                <View style={[style.container, extraStyle]} accessibilityLabel={accessibilityLabel}>
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
