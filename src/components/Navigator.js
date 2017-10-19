import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import { find, get } from 'lodash';
import { Navigator as ReactNativeNavigator } from 'react-native-deprecated-custom-components';
import {
    Platform,
    BackHandler,
} from 'react-native';

import SceneWrapper from './SceneWrapper';
import Scene from './Scene';

// navigatorConfig.init should be called in the constructor of the navigator component
const navigatorConfig = Platform.select({
    ios: () => {
        return {
            init: (instance) => {
            },
            destroy: (instance) => {
            },
        };
    },
    android: () => {
        return {
            init: (instance) => {
                BackHandler.addEventListener('hardwareBackPress', instance._handleBackPressAndroid);
            },
            destroy: (instance) => {
                BackHandler.removeEventListener('hardwareBackPress', instance._handleBackPressAndroid);
            },
        };
    },
})();

export default class Navigator extends Component {

    static childContextTypes = {
        navigator: PropTypes.object,
    };

    static propTypes = {
        children: PropTypes.any,
        onTransitionComplete: PropTypes.func,
        style: PropTypes.any,
    };

    getChildContext() {
        return {
            navigator: {
                open: this.open,
                back: this.back,
                attachNavigationBar: this.attachNavigationBar,
            },
        };
    };

    static transitions = {
        standard: Platform.select({
            ios: () => ReactNativeNavigator.SceneConfigs.PushFromRight,
            android: () => ReactNativeNavigator.SceneConfigs.FloatFromBottomAndroid,
        })(),
        modal: Platform.select({
            ios: () => ReactNativeNavigator.SceneConfigs.FloatFromBottom,
            android: () => ReactNativeNavigator.SceneConfigs.FloatFromBottom,
        })(),
        ...ReactNativeNavigator.SceneConfigs,
    };

    state = {
        navbars: {},
    };

    // init
    _sceneStack = Children.map(this.props.children, (child, index) => {
        if (child.type !== Scene) throw new Error(`Expected 'Scene' but instead got '${child.type.displayName}'. Please use Navigator component Scene for scene declarations.`);

        return {
            component: child,
            reference: child.props.reference,
            transition: child.props.transition,
        };
    });
    // make rootview accessible to this component
    _rootScene = this._sceneStack[0];

    componentWillMount() {
        navigatorConfig.init(this);
    };

    // destroy any references on umount
    componentWillUnmount() {
        navigatorConfig.destroy(this);
    };

    attachNavigationBar = (sceneReference, navbarComponent) => {
        this.setState(({navbars}) => {
            navbars[sceneReference] = navbarComponent;
            return { navbars };
        });
    };

    // navigator.open(reference) opens the coresponging route
    open = (reference, params) => {
        const route = find(this._sceneStack, {reference});

        this.refs.navigator.push({params, ...route});
    };

    // navigator.back goes back one view
    back = () => {
        this.refs.navigator.pop();
    };

    onTransitionComplete = (event) => {
        const { onTransitionComplete } = this.props;

        if (onTransitionComplete) onTransitionComplete(event);
    };

    // private:
    // back button press handler for android
    // goed back one view, if its at the root, it minimizes the app
    _handleBackPressAndroid = () => {
        if (this._getLastRoute() === this._rootScene) return false;
        this.refs.navigator.pop();
        return true;
    };

    // gets all active routes
    _getAllActiveRoutes = () => {
        return this.refs.navigator.getCurrentRoutes();
    };

    // private:
    // get last route
    _getLastRoute = () => {
        const activeRoutes = this._getAllActiveRoutes();

        return activeRoutes[activeRoutes.length - 1];
    };

    render() {
        const { navbars } = this.state;
        const { style } = this.props;

        return (
            <ReactNativeNavigator
                style={[{flex: 1, backgroundColor: '#000'}, style]}
                ref='navigator'
                initialRoute={this._rootScene}
                configureScene={({transition}) => transition}
                onDidFocus={this.onTransitionComplete}
                renderScene={({component, ...scene}, navigator) => (
                    <SceneWrapper>
                        { navbars[scene.reference] }
                        { cloneElement(component, {scene}) }
                    </SceneWrapper>
                )}
            />
        );
    };
};
