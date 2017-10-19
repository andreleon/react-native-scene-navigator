import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    TouchableHighlight,
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
            <TouchableHighlight
                onPress={this.onPress}
                underlayColor={'rgba(0,0,0,0.5)'}
                style={[style.container, extraStyle]}
            >
                <View
                    accessible={!!buttonAccessibilityLabel}
                    accessibilityLabel={buttonAccessibilityLabel}>
                    {children}
                </View>
            </TouchableHighlight>
        );
    };
};

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
