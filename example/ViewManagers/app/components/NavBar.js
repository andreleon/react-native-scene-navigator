import React from 'react';
import AutoBindComponent from 'react-autobind-component';
import {
    View,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

export default class NavBar extends AutoBindComponent {
    render() {
        const { children, style: extraStyle } = this.props;
        const { style } = this;

        return (
            <View style={[style.container, extraStyle]}>
                { Platform.OS === 'ios' && <View style={{width, height: 20}}></View> }
                <View style={style.navbar}>
                    {children}
                </View>
            </View>
        );
    }

    style = StyleSheet.create({
        container: Platform.select({
            ios: () => {
                return {
                    zIndex: 2,
                    width,
                    flexDirection: 'column',
                    height: 64,
                    backgroundColor: '#3f51bf',
                    overflow: 'hidden',
                };
            },
            android: () => {
                return {
                    zIndex: 2,
                    width,
                    flexDirection: 'column',
                    height: 60,
                    backgroundColor: '#3f51bf',
                    overflow: 'hidden',
                };
            },
        })(),
        navbar: {
            flexDirection: 'row',
            paddingLeft: 10,
            paddingRight: 10,
            alignItems: 'center',
            height: Platform.select({
                ios: () => 44,
                android: () => 60,
            })(),
        },
    });
};
