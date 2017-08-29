import React from 'react';
import AutoBindComponent from 'react-autobind-component';

import {
    TouchableHighlight,
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
            <TouchableHighlight
                onPress={this.onPress}
                underlayColor={'rgba(0,0,0,0.5)'}
                style={[style.container, extraStyle]}
            >
                <View accessibilityLabel={accessibilityLabel}>
                    {children}
                </View>
            </TouchableHighlight>
        );
    }

    style = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};
