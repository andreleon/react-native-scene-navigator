import React from 'react';
import AutoBindComponent from 'react-autobind-component';

import {
    View,
    StyleSheet,
} from 'react-native';

export default class Container extends AutoBindComponent {
    render() {
        const { children, style: extraStyle } = this.props;
        const { style } = this;

        return (
            <View style={[style.container, extraStyle]}>
                {children}
            </View>
        );
    }

    style = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            alignItems: 'center',
            backgroundColor: '#fff',
            // shadowColor: '#000',
            // shadowOffset: {
            //     width: 20,
            //     height: 0,
            // },
            // shadowOpacity: 0.5,
            // shadowRadius: 20,
        },
    });
};
