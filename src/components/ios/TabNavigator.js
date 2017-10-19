import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { wrongSceneComponentError } from '../../utils/errors';
import { get } from 'lodash';
import {
    TabBarIOS,
} from 'react-native';
import Scene from '../Scene';

import Dispatcher from '../../utils/Dispatcher';

const _TabsDispatcher = new Dispatcher();

export default class TabNavigator extends Component {

    static childContextTypes = {
        tabNavigator: PropTypes.object,
    };

    static propTypes = {
        navigator: PropTypes.object,
        scene: PropTypes.object,
        children: PropTypes.any,
        initialTab: PropTypes.string,
        badgeColorIOS: PropTypes.string,
        tabBarTintColor: PropTypes.string,
        tabTintColor: PropTypes.string,
        tabActiveTintColor: PropTypes.string,
        translucentIOS: PropTypes.string,
    };

    getChildContext() {
        return {
            tabNavigator: {
                setBadge: this.setBadge,
                selectTab: this.selectTab,
            },
        };
    };

    navbars = {};

    // navigator.open(reference) opens the coresponging scene
    open = (reference, params) => {
        const { navigator } = this.props;

        if (!navigator) throw new Error('No navigator passed to TabNavigator');
        navigator.open(reference, params);
    };

    // navigator.back goes back one view
    back = () => {
        const { navigator } = this.props;

        if (!navigator) throw new Error('No navigator passed to TabNavigator');
        navigator.back();
    };

    // render navigationbar of the navigator
    attachNavigationBar = (tabReference, component) => {
        const {
            navigator,
            scene: { reference },
        } = this.props;

        if (!navigator) throw new Error('No navigator passed to TabNavigator');
        this.navbars[tabReference] = component;
        navigator.attachNavigationBar(reference, component);
    };

    constructor(props) {
        super(props);
        const { children } = props;

        this._initialTab = 0;
        let badgeNumbers = {};

        this._tabStack = Children.map(children, (child, index) => {
            if (child.type !== Scene) throw new Error(wrongSceneComponentError(child.type.displayName));

            const { title, reference, icon, selectedIcon, badge, accessibilityLabel } = child.props;

            if (props.initialTab === reference) this._initialTab = index;
            badgeNumbers[reference] = badge;

            return {
                title,
                icon,
                selectedIcon,
                reference,
                accessibilityLabel,
                child,
            };
        });

        this.state = {
            selectedTabIndex: this._initialTab,
            badgeNumbers,
        };
    };

    componentWillReceiveProps({children}) {
        Children.forEach(children, ({props: {badge, reference}}) => {
            if (badge === undefined) return;
            this.setState(({badgeNumbers}) => {
                badgeNumbers[reference] = badge;
                return {badgeNumbers};
            });
        });
    };

    setBadge = (tabReference, badgeNumber) => {
        this.setState(({badgeNumbers}) => {
            badgeNumbers[tabReference] = badgeNumber;
            return {badgeNumbers};
        });
    };

    getBadgeNumber = (tabReference) => {
        const { badgeNumbers } = this.state;

        return badgeNumbers[tabReference];
    };

    selectTab = (index) => {
        const { navigator, scene: { reference } = {} } = this.props;

        this.setState({selectedTabIndex: index});

        const ref = get(this, `_tabStack[${index}].reference`, false);
        const navbar = get(this, `navbars[${ref}]`);

        _TabsDispatcher.dispatch({reference: ref, index});

        if (ref && navbar) navigator.attachNavigationBar(reference, navbar);
    };

    onChangeTab = (cb) => {
        _TabsDispatcher.subscribe(cb);
    };

    offChangeTab = (cb) => {
        _TabsDispatcher.unsubscribe(cb);
    };

    componentWillUnmount() {
        _TabsDispatcher.destroy();
    };

    renderTabs = () => {
        const { badgeColorIOS } = this.props;

        return this._tabStack.map(({child, icon, selectedIcon, title = '', reference, accessibilityLabel}, index) => {
            const { selectedTabIndex } = this.state;
            const badge = this.getBadgeNumber(reference);

            return (
                <TabBarIOS.Item
                    badge={badge ? badge : undefined}
                    badgeColor={badgeColorIOS}
                    key={index}
                    title={title}
                    icon={icon}
                    accessibilityLabel={accessibilityLabel}
                    selectedIcon={selectedIcon}
                    selected={selectedTabIndex === index}
                    onPress={() => this.selectTab(index)}
                >
                    {child}
                </TabBarIOS.Item>
            );
        });
    };

    render() {
        const {
            tabBarTintColor,
            tabTintColor,
            tabActiveTintColor,
            translucentIOS,
        } = this.props;

        return (
            <TabBarIOS
                translucent={translucentIOS}
                barTintColor={tabBarTintColor}
                tintColor={tabActiveTintColor}
                unselectedItemTintColor={tabTintColor}
                unselectedTintColor={tabTintColor}>
                { this.renderTabs() }
            </TabBarIOS>
        );
    };
};
