import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

export default class SceneWrapper extends Component {

    static propTypes = {
        children: PropTypes.any,
        style: PropTypes.any,
    };

    getStyles = (propStyle) => [style.container, propStyle];

    render() {
        const { children, style, ...restProps } = this.props;

        return (
            <View style={this.getStyles(style)} {...restProps}>
                { children }
            </View>
        );
    };
};

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});
