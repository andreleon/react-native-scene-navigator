import React from 'react';
import AutoBindComponent from 'react-autobind-component';

import {
    Text as ReactNativeText,
    StyleSheet,
} from 'react-native';

export default class Text extends AutoBindComponent {
    render() {
        const { children, style: extraStyle } = this.props;
        const { style } = this;

        return (
            <ReactNativeText style={[style.text, extraStyle]}>
                {children}
            </ReactNativeText>
        );
    }

    style = StyleSheet.create({
        text: {
            fontSize: 14,
            color: '#a4a4a4',
        },
    });
};
