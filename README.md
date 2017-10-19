# react-native-scene-navigator
[![npm version](https://badge.fury.io/js/react-native-scene-navigator.svg)](https://badge.fury.io/js/react-native-scene-navigator)

A **cross-platform**, easy and intuitive way to manage your scenes in react-native. Adapts to the platform, e.g. tabs on top for Android and tabs on the botton for iOS. Scene transitions default to the native platform patterns, but can be changed to your needs.
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
onPress() {
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
onPress() {
    const { navigator } = this.props;

    navigator.back();
}
```

### navigator.attachNavigationBar
Attaching a navigationbar is easy:
```
export default class SomeScene extends Component {
    componentWillMount() {
        const { scene: { reference }, navigator } = this.props;

        // navigator needs a scene reference,
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
        const { navigator, scene } = this.props;
        
        return (
            <TabNavigator
                navigator={navigator}
                scene={scene} >
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

### tabNavigator
`TabNavigator` passes tabNavigator to all of it's scenes. you can set the tab badge number with `tabNavigator.setBadge(number)`.

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
    
    // IOS only, default true
    translucentIOS: false,
    // both platforms
    tabBarTintColor: '#00f', // #hex or rgba
    tabTintColor: '#f0f', // #hex or rgba
    tabActiveTintColor: '#0f0', // #hex or rgba
    badgeColorIOS: '#f0f', //ios >= 10
    badgeStyleAndroid: {
        padding: 0,
        paddingLeft: 2,
        paddingRight: 2,
        minWidth: 16,
        borderRadius: 12,
        top: 0,
        right: 5,
        position: 'absolute',
        zIndex: 2,
        backgroundColor: '#f0f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeTextStyleAndroid: {
        color: '#fff',
        fontSize: 10,
    },
};

<TabNavigator
    navigator={navigator} // will be passed down
    scene={scene} // will be passed down
    {...tabNavigatorConfigurationProps} >
    ...
</TabNavigator>
```

## Scene
A Scene is used by Navigator and TabNavigator to render your scenes/views

## reference={'scene-reference'} - **required**
The scene reference you use to open a scene with `navigator.open(<reference>)`

## component={SomeScene} - **required**
The component the scene will render

### icon={<image source>}
The tab bar icon

### selectedIcon={require('~/images/notifications.png')}
Selected tab bar icon 

### title={'Scene title'}
Tab title

### badge={number}
Tab badge number

### transition={Navigator.transitions.standard}
The transition when opening or closing a scene with `navigator.open()`

#### Navigator.transitions
You can configure scene transitions for each individual scene.
##### standard
```
<Scene
    transition={Navigator.transitions.standard}
    ...
/>
```
##### modal
```
<Scene
    transition={Navigator.transitions.modal}
    ...
/>
```

##any={prop}
any custom prop will be passed to your scene as well


