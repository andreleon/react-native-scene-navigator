import React, { Children, cloneElement } from 'react';
import AutoBindComponent from 'react-autobind-component';
import { get } from 'lodash';
import {
    TabBarIOS,
} from 'react-native';
import Scene from '../Scene';

export default class TabNavigator extends AutoBindComponent {

    navbars = {};

    // navigator.open(reference) opens the coresponging scene
    open(reference, params) {
        const { navigator } = this.props;
        if (!navigator) throw new Error('No navigator passed to TabNavigator');
        navigator.open(reference, params);
    }

    // navigator.back goes back one view
    back() {
        const { navigator } = this.props;
        if (!navigator) throw new Error('No navigator passed to TabNavigator');
        navigator.back();
    }

    // render navigationbar of the navigator
    attachNavigationBar(tabReference, component) {
        const { navigator, scene: { reference } } = this.props;
        if (!navigator) throw new Error('No navigator passed to TabNavigator');
        this.navbars[tabReference] = component;
        navigator.attachNavigationBar(reference, component);
    }

    constructor(props) {
        super(props);
        const { children } = props;

        this._initialTab = 0;
        let badgeNumbers = {};

        this._tabStack = Children.map(children, (child, index) => {
            if (child.type !== Scene) throw new Error(`Expected 'Scene' but instead got '${child.type.displayName}'. Please use Navigator component Scene for scene declarations.`);

            const { title, reference, icon, selectedIcon, badge } = child.props;

            if (props.initialTab === reference) this._initialTab = index;
            badgeNumbers[reference] = badge;

            return {
                title,
                icon,
                selectedIcon,
                reference,
                child: cloneElement(child, {
                    navigator: {
                        open: this.open,
                        back: this.back,
                        attachNavigationBar: this.attachNavigationBar,
                    },
                    tabNavigator: {
                        setBadge: this.setBadge,
                    },
                    scene: { ...child.props },
                }),
            };
        });

        this.state = {
            selectedTabIndex: this._initialTab,
            badgeNumbers,
        };
    }

    componentWillReceiveProps({children}) {
        Children.forEach(children, ({props: {badge, reference}}) => {
            if (badge === undefined) return;
            this.setState(({badgeNumbers}) => {
                badgeNumbers[reference] = badge;
                return {badgeNumbers};
            });
        });
    }

    setBadge(tabReference, badgeNumber) {
        this.setState(({badgeNumbers}) => {
            badgeNumbers[tabReference] = badgeNumber;
            return {badgeNumbers};
        })
    }

    getBadgeNumber(tabReference) {
        const { badgeNumbers } = this.state;
        return badgeNumbers[tabReference];
    }

    selectTab(index) {
        const { navigator, scene: { reference } = {} } = this.props;
        this.setState({selectedTabIndex: index});

        const ref = get(this, `_tabStack[${index}].reference`, false);
        const navbar = get(this, `navbars[${ref}]`);

        if (ref && navbar) navigator.attachNavigationBar(reference, navbar);
    }

    renderTabs() {
        const { badgeColorIOS } = this.props;
        return this._tabStack.map(({child, icon, selectedIcon, title = '', reference}, index) => {
            const { selectedTabIndex } = this.state;
            const badge = this.getBadgeNumber(reference);
            return (
                <TabBarIOS.Item
                    badge={badge ? badge : undefined}
                    badgeColor={badgeColorIOS}
                    key={index}
                    title={title}
                    icon={icon}
                    selectedIcon={selectedIcon}
                    selected={selectedTabIndex === index}
                    onPress={() => this.selectTab(index)}
                >
                    {child}
                </TabBarIOS.Item>
            );
        });
    }

    render() {
        const { tabBarTintColor, tabTintColor, tabActiveTintColor, translucentIOS } = this.props;
        return (
            <TabBarIOS translucent={translucentIOS} barTintColor={tabBarTintColor} tintColor={tabActiveTintColor} unselectedItemTintColor={tabTintColor} unselectedTintColor={tabTintColor}>
                { this.renderTabs() }
            </TabBarIOS>
        );
    }
};
