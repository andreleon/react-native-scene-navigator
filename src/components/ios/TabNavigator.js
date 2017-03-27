import React, { Children, cloneElement } from 'react';
import AutoBindComponent from 'react-autobind-component';

import {
    TabBarIOS,
} from 'react-native';
import Scene from '../Scene';

export default class TabNavigator extends AutoBindComponent {

    navbars = {};

    // navigator.open(routeKey) opens the coresponging route
    open(routeKey, params) {
        const { navigator } = this.props;
        if (!navigator) throw new Error('No navigator passed to TabNavigator');
        navigator.open(routeKey, params);
    }

    // navigator.back goes back one view
    back() {
        const { navigator } = this.props;
        if (!navigator) throw new Error('No navigator passed to TabNavigator');
        navigator.back();
    }

    // render navigationbar of the navigator
    attachNavigationBar(tabReference, component) {
        const { navigator, route: { reference } } = this.props;
        if (!navigator) throw new Error('No navigator passed to TabNavigator');
        this.navbars[tabReference] = component;
        navigator.attachNavigationBar(reference, component);
    }

    constructor(props) {
        super(props);
        const { children } = props;

        this._initialTab = 0;

        this._tabStack = Children.map(children, (child, index) => {
            if (child.type !== Scene) throw new Error(`Expected 'Scene' but instead got '${child.type.displayName}'. Please use Navigator component Scene for scene declarations.`);

            const { title, reference, icon, selectedIcon } = child.props;

            if (props.initialTab === reference) this._initialTab = index;

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
                    route: { ...child.props },
                }),
            };
        });

        this.state = {
            selectedTabIndex: this._initialTab,
        };
    }

    selectTab(index) {
        const { navigator, route: { reference } } = this.props;
        this.setState({selectedTabIndex: index});
        if (this.navbars[this._tabStack[index].reference]) {
            navigator.attachNavigationBar(reference, this.navbars[this._tabStack[index].reference]);
        }
    }

    renderTabs() {
        return this._tabStack.map(({child, icon, selectedIcon, title = ''}, index) => {
            const { selectedTabIndex } = this.state;
            return (
                <TabBarIOS.Item
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
        const { tabBarTintColor, tabTintColor, tabActiveTintColor } = this.props;
        return (
            <TabBarIOS barTintColor={tabBarTintColor} tintColor={tabActiveTintColor} unselectedItemTintColor={tabTintColor} unselectedTintColor={tabTintColor}>
                { this.renderTabs() }
            </TabBarIOS>
        );
    }
};
