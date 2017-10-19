import React from 'react';
import AutoBindComponent from 'react-autobind-component';
import { TabNavigator, Scene } from 'react-native-scene-navigator'; // ex

import Tab1Scene from 'scenes/Tab1';
import Tab2Scene from 'scenes/Tab2';
import Tab3Scene from 'scenes/Tab3';

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
    // translucentIOS: false // ios only
    // tabBarTintColor: '#00f', // #hex or rgba
    // tabTintColor: '#f0f', // #hex or rgba
    // tabActiveTintColor: '#0f0', // #hex or rgba
    // badgeColorIOS: '#f0f', //ios >= 10
    // badgeStyleAndroid: {
    //     padding: 0,
    //     paddingLeft: 2,
    //     paddingRight: 2,
    //     minWidth: 16,
    //     borderRadius: 12,
    //     top: 0,
    //     right: 5,
    //     position: 'absolute',
    //     zIndex: 2,
    //     backgroundColor: '#f0f',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // badgeTextStyleAndroid: {
    //     color: '#fff',
    //     fontSize: 10,
    // },
};

export default class MainScene extends AutoBindComponent {
    constructor(props) {
        super(props);

        this.state = {
            badgeNumber: 2,
        };

        setInterval(() => {
            this.setState(({badgeNumber}) => {
                if (badgeNumber) return { badgeNumber: badgeNumber - 1 };
            });
        }, 5000);
    }
    render() {
        const { navigator, scene } = this.props;
        const { badgeNumber } = this.state;
        return (
            <TabNavigator
                navigator={navigator}
                scene={scene}
                {...tabNavigatorConfigurationProps} >
                <Scene
                    icon={require('../images/notifications.png')}
                    reference={'tab-1'}
                    badge={'•'}
                    component={Tab1Scene} />
                <Scene
                    icon={require('../images/chats.png')}
                    reference={'tab-2'}
                    badge={badgeNumber}
                    component={Tab2Scene} />
                <Scene
                    icon={require('../images/profile.png')}
                    reference={'tab-3'}
                    badge={200}
                    component={Tab3Scene} />
            </TabNavigator>
        );
    }
};
