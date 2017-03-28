# react-native-scene-navigator
[![npm version](https://badge.fury.io/js/react-native-scene-navigator.svg)](https://badge.fury.io/js/react-native-scene-navigator)

A **cross-platform**, easy and intuitive way to manage your scenes in react-native. Adapts to the current platform, e.g. tabs on top for Android and tabs on the botton for iOS. Scene transitions default to the native platform patterns, but can be changed to your needs.
**Run the example on both iOS and Android to see it in action :D**

## Navigator
`Navigator` is the root level component that manages all your scene (`Scene`) transitions. Navigator internally uses the [React-Native Navigator](https://facebook.github.io/react-native/docs/navigator.html#navigator) component, but makes it easy and intuitive to use.
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

`Navigator` will pass a `navigator` to all of the `Scene`s it manages.

### navigator.open
Open any scene you have configured with `Navigator`.
`navigator.open(reference, params)`
```
examplePressHandler() {
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
Goes back one scene.
`navigator.back()`
```
examplePressHandler() {
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
            <SomeNavBar>
                <SomeTitle>SomeSceneTitle</SomeTitle>
            </SomeNavBar>
        );
    }
    ...
}
```

### Navigator.transitions
Navigator uses the same Scene transitions as the react-native `Navigator`
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
If you wish, you can pass any `React.Navigator.SceneConfigs` to customize your scene transitions. ([React-Native configurescene](https://facebook.github.io/react-native/docs/navigator.html#configurescene))

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
Add a `TabNavigator` to manage your TabScenes. TabNavigator will pass the navigator you provide it to the Scenes it manages. It can also be used independent of `Navigator`.

`TabNavigator` internally uses [TabBarIOS](https://facebook.github.io/react-native/docs/tabbarios.html) for iOS and [ViewPagerAndroid](https://facebook.github.io/react-native/docs/viewpagerandroid.html) for android.
```
import React, { Component } from 'react';
import { TabNavigator, Scene } from 'react-native-scene-navigator';

import Tab1Scene from '~/scenes/Tab1';
import Tab2Scene from '~/scenes/Tab2';
import Tab3Scene from '~/scenes/Tab3';

export default class TabbedScene extends Component {
    render() {
        const { navigator, route } = this.props;
        return (
            <TabNavigator
                navigator={navigator}
                route={route} >
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
### configuration
`TabNavigator` has some configuration props.
```
const tabNavigatorConfigurationProps = {
    // scene reference, defaults to first tab
    initialTab: 'tab-2',

    // android only, defaults to true
    scrollEnabledAndroid: true,

    // android only, defaults to 0
    pageMarginAndroid: 10,

    // android only
    tabIndicatorStyleAndroid: {
        height: 10, // default 4
        bottom: 5, // default 0
        backgroundColor: '#f0f', // default #fff
        // ...View.style
    },

    // android only, default 60
    tabBarHeightAndroid: 100,

    // both platforms
    tabBarTintColor: '#00f', // #hex or rgba
    tabTintColor: '#f0f', // #hex or rgba
    tabActiveTintColor: '#0f0', // #hex or rgba
};

<TabNavigator
    navigator={navigator} // will be passed down
    route={route} // will be passed down
    {...tabNavigatorConfigurationProps} >
    ...
</TabNavigator>
```
