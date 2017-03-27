import React from 'react';
import AutoBindComponent from 'react-autobind-component';
import { TabNavigator, Scene } from 'react-native-scene-navigator';

import Tab1Scene from '~/scenes/Tab1';
import Tab2Scene from '~/scenes/Tab2';
import Tab3Scene from '~/scenes/Tab3';

const tabNavigatorConfigurationProps = {
    // initialTab: 'tab-2', // scene reference
    // scrollEnabledAndroid: false, // android only
    // pageMarginAndroid: 10, // android only
    // tabIndicatorStyleAndroid: { // android only
    //     height: 10,
    //     bottom: 5,
    //     backgroundColor: '#f0f',
    //     ...View.style
    // },
    // tabBarHeightAndroid: 100, // android only
    // tabBarTintColor: '#00f', // #hex or rgba
    // tabTintColor: '#f0f', // #hex or rgba
    // tabActiveTintColor: '#0f0', // #hex or rgba
};

export default class MainScene extends AutoBindComponent {
    render() {
        const { navigator, route } = this.props;
        return (
            <TabNavigator
                navigator={navigator}
                route={route}
                {...tabNavigatorConfigurationProps} >
                <Scene
                    icon={require('~/images/notifications.png')}
                    reference={'tab-1'}
                    component={Tab1Scene} />
                <Scene
                    icon={require('~/images/chats.png')}
                    reference={'tab-2'}
                    component={Tab2Scene} />
                <Scene
                    icon={require('~/images/profile.png')}
                    reference={'tab-3'}
                    component={Tab3Scene} />
            </TabNavigator>
        );
    }
};
