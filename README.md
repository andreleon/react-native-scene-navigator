# react-native-scene-navigator
[![npm version](https://badge.fury.io/js/react-native-scene-navigator.svg)](https://badge.fury.io/js/react-native-scene-navigator)

A **cross-platform**, easy and intuitive way to manage your scenes in react-native. Adapts to the current platform, e.g. tabs on top for Android and tabs on the botton for iOS. Scene transitions default to the native platform patterns, but can be changed to your needs.
**Run the example on both iOS and Android to see it in action :D**

## Navigator
`Navigator` will pass `navigator` to all of it's `Scene`s
```
import React, { Component} from 'react';

import { Navigator, Scene } from 'react-native-scene-navigator';

import MainScene from '~/scenes/Main';
import DetailScene from '~/scenes/Detail';
import ModalScene from '~/scenes/Modal';

export default class App extends Component {
    render() {
        return (
            <Navigator>
                <Scene
                    transition={Navigator.transitions.standard}
                    reference={'main'}
                    component={MainScene} />
                <Scene
                    transition={Navigator.transitions.standard}
                    reference={'detail'}
                    component={DetailScene} />
                <Scene
                    transition={Navigator.transitions.modal}
                    reference={'modal'}
                    component={ModalScene} />
            </Navigator>
        );
    }
};
```

### navigator.open
`navigator.open(reference, params)`
Open any scene you have configured with `Navigator`.
```
exampleClickHandler() {
    const { navigator } = this.props;
    navigator.open('scene-reference', {
        pass: {
            any: {
                params: 'To the scene you wish to open'
            }
        }
    });
}
```

### navigator.back
`navigator.back()`
Goes back one scene.
```
exampleClickHandler() {
    const { navigator } = this.props;
    navigator.back();
}
```

### navigator.attachNavigationBar
Attaching a navigationbar is easy:
```
export default class SomeScene extends Component {
    componentDidMount() {
        const { route: { reference }, navigator } = this.props;
        // navigator needs a route reference,
        // or it won't know where to attach your NavigationBar!
        navigator.attachNavigationBar(reference,
            <NavBar>
                <Title>SomeSceneTitle</Title>
            </NavBar>
        );
    }
    ...
}
```

### Navigator.transitions

Navigator uses the same Scene transitions as react-native `Navigator`
([React-Native configurescene](https://facebook.github.io/react-native/docs/navigator.html#configurescene))

#### standard
```
<Scene
    transition={Navigator.transitions.standard}
    ...
/>
```
On ios this equals `React.Navigator.SceneConfigs.PushFromRight`.
On android this equals `React.Navigator.SceneConfigs.FloatFromBottomAndroid`.

#### modal
```
<Scene
    transition={Navigator.transitions.modal}
    ...
/>
```
For both `React.Navigator.SceneConfigs.FloatFromBottom`.

#### custom
If you wish, you can pass any `React.Navigator.SceneConfigs` to customize your scene transitions.

## Scene
```
<Scene
    icon={require('~/images/notifications.png')} // TabNavigator
    selectedIcon={require('~/images/notifications.png')} // TabNavigator
    title={'Scene title'} // TabNavigator
    transition={Navigator.transitions.standard} // Navigator
    reference={'scene-reference'}
    component={SomeScene}
    any={prop} // any prop will be passed to SomeScene
/>
```

## TabNavigator
Add a TabNavigator to manage your TabScenes. The TabNavigator will pass the navigator you provide it to the Scenes it manages.
```
import React, { Component } from 'react';
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

export default class TabbedScene extends Component {
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
```
