import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    TouchableNativeFeedback,
    View,
    StyleSheet,
} from 'react-native';

export default class Button extends Component {

    static propTypes = {
        onPress: PropTypes.func,
        children: PropTypes.any,
        style: PropTypes.any,
        buttonAccessibilityLabel: PropTypes.string,
    };

    onPress = (event) => {
        const { onPress } = this.props;

        if (onPress) onPress(event);
    };

    render() {
        const {
            children,
            style: extraStyle,
            buttonAccessibilityLabel,
        } = this.props;

        return (
            <TouchableNativeFeedback
                onPress={this.onPress}
                background={TouchableNativeFeedback.SelectableBackground()}
            >
                <View
                    accessibilityLabel={buttonAccessibilityLabel}
                    accessible={!!buttonAccessibilityLabel}
                    style={[style.container, extraStyle]}>
                    {children}
                </View>
            </TouchableNativeFeedback>
        );
    }

};

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
