import React, { Children, cloneElement } from 'react';
import AutoBindComponent from 'react-autobind-component';
import { findIndex, get } from 'lodash';
import {
    StyleSheet,
    ViewPagerAndroid,
    View,
    Dimensions,
    Animated,
    Text,
    Image,
} from 'react-native';

const { width: deviceWidth } = Dimensions.get('window');
import Scene from '../Scene';
import Button from '../Button';

import Dispatcher from '../../utils/Dispatcher';

const _TabsDispatcher = new Dispatcher();

export default class TabNavigator extends AutoBindComponent {

    navbars = {};

    // navigator.open(sceneKey) opens the coresponging scene
    open(sceneKey, params) {
        const { navigator } = this.props;
        if (!navigator) throw new Error('No navigator passed to TabNavigator');
        navigator.open(sceneKey, params);
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
        const { selectedTabIndex } = this.state;
        if (!navigator) throw new Error('No navigator passed to TabNavigator');
        this.navbars[tabReference] = component;

        if (selectedTabIndex === findIndex(this._tabStack, {reference: tabReference})) {
            navigator.attachNavigationBar(reference, component);
        }
    }

    constructor(props) {
        super(props);
        const { children } = props;

        this._initialPage = 0;
        let badgeNumbers = {};

        this._tabStack = Children.map(children, (child, index) => {
            if (child.type !== Scene) throw new Error(`Expected 'Scene' but instead got '${child.type.displayName}'. Please use Navigator component Scene for scene declarations.`);

            const { title, reference, icon, selectedIcon, badge } = child.props;

            if (props.initialTab === reference) this._initialPage = index;
            badgeNumbers[reference] = badge;

            return {
                title,
                icon,
                selectedIcon,
                reference,
                badge,
                child: cloneElement(child, {
                    navigator: {
                        open: this.open,
                        back: this.back,
                        attachNavigationBar: this.attachNavigationBar,
                    },
                    tabNavigator: {
                        setBadge: this.setBadge,
                        selectTab: this.selectTab,
                    },
                    scene: { ...child.props },
                }),
            };
        });

        this._buttonWidth = Math.round(deviceWidth / this._tabStack.length);

        this.state = {
            offset: new Animated.Value(0),
            position: new Animated.Value(this._initialPage),
            selectedTabIndex: this._initialPage,
            badgeNumbers,
        };

        this.indicatorAnimator = Animated.event([{
            nativeEvent: {
                offset: this.state.offset,
                position: this.state.position,
            },
        }], {listener: this.handlePageScroll});
        this.state.actualOffset = Animated.add(this.state.position, this.state.offset);
        this.state.indicatorLeft = Animated.multiply(this._buttonWidth, this.state.actualOffset);
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

    updateNavigationBar(index) {
        const { navigator, scene: { reference } = {} } = this.props;

        const ref = get(this, `_tabStack[${index}].reference`, false);
        const navbar = get(this, `navbars[${ref}]`);

        if (ref && navbar) navigator.attachNavigationBar(reference, navbar);
    }

    selectTab(index) {
        this.refs.viewpager.setPage(index);
    }

    handlePageScroll({nativeEvent: {offset, position}}) {
        const index = Math.round(position + offset);
        this.setState(({selectedTabIndex}) => {
            if (index === selectedTabIndex) return;
            this.updateNavigationBar(index);

            const reference = get(this, `_tabStack[${index}].reference`, false);
            _TabsDispatcher.dispatch({reference, index});

            return {
                selectedTabIndex: index,
            };
        });
    }

    renderTabIndicator() {
        const { style, _buttonWidth } = this;
        const { tabIndicatorStyleAndroid } = this.props;
        return (
            <Animated.View
                style={[style.indicator, tabIndicatorStyleAndroid, {
                    width: _buttonWidth,
                    left: this.state.indicatorLeft,
                }]}
            />
        );
    }

    getUserDefinedIconColor(isActive) {
        const { tabTintColor, tabActiveTintColor } = this.props;
        if (tabActiveTintColor && isActive) return { tintColor: tabActiveTintColor };
        if (tabTintColor && !isActive) return { tintColor: tabTintColor };
    }

    getUserDefinedTextColor(isActive) {
        const { tabTintColor, tabActiveTintColor } = this.props;
        if (tabActiveTintColor && isActive) return { color: tabActiveTintColor };
        if (tabTintColor && !isActive) return { color: tabTintColor };
    }

    renderBadge(reference) {
        const badge = this.getBadgeNumber(reference);
        const { badgeStyleAndroid, badgeTextStyleAndroid } = this.props;
        if (badge) {
            return (
                <View style={badgeStyleAndroid}>
                    <Text style={badgeTextStyleAndroid}>{badge}</Text>
                </View>
            );
        } else {
            return <View></View>;
        }
    }

    renderTabButtons() {
        const { style } = this;
        return this._tabStack.map(({child, title, icon, selectedIcon, reference, accessibilityLabel}, index) => {
            const { selectedTabIndex } = this.state;
            const isActive = selectedTabIndex === index;
            return (
                <Button
                    key={index}
                    style={[style.button, {width: this._buttonWidth}]}
                    onPress={() => this.selectTab(index)}
                    accessibilityLabel={accessibilityLabel}
                >
                    { icon &&
                        <View style={{padding: 10, paddingLeft: 20, paddingRight: 20}}>
                            { this.renderBadge(reference) }
                            <Image style={[style.icon, isActive && style.iconActive, this.getUserDefinedIconColor(isActive)]} source={selectedIcon ? (isActive ? selectedIcon : icon) : icon} />
                        </View>
                    }
                    { title && <Text style={[style.text, isActive && style.textActive, this.getUserDefinedTextColor(isActive)]}>{title}</Text> }
                </Button>
            );
        });
    }

    renderTabs() {
        return this._tabStack.map(({child, title = ''}, index) => {
            return (
                <View key={index} style={{flex: 1}}>
                    {child}
                </View>
            );
        });
    }

    onChangeTab(cb) {
        _TabsDispatcher.subscribe(cb);
    }

    offChangeTab(cb) {
        _TabsDispatcher.unsubscribe(cb);
    }

    componentWillUnmount() {
        _TabsDispatcher.destroy();
    }

    render() {
        const { style } = this;
        const { scrollEnabledAndroid, pageMarginAndroid = 0, tabBarTintColor, tabBarHeightAndroid } = this.props;
        return (
            <View style={style.container}>
                <View style={[style.tabs, tabBarTintColor && {backgroundColor: tabBarTintColor}, tabBarHeightAndroid && {height: tabBarHeightAndroid}]}>
                    { this.renderTabButtons() }
                    { this.renderTabIndicator() }
                </View>
                <ViewPagerAndroid
                    ref={'viewpager'}
                    style={{flexGrow: 1}}
                    initialPage={this._initialPage}
                    onPageScroll={this.indicatorAnimator}
                    scrollEnabled={scrollEnabledAndroid}
                    pageMargin={pageMarginAndroid}
                >
                    { this.renderTabs() }
                </ViewPagerAndroid>
            </View>
        );
    }

    style = StyleSheet.create({
        container: {
            flex: 1,
            zIndex: 1,
        },
        tabs: {
            height: 50,
            width: deviceWidth,
            flexDirection: 'row',
            backgroundColor: '#3f51bf',
            elevation: 2,
        },
        button: {
            alignSelf: 'stretch',
        },
        icon: {
            tintColor: 'rgba(255,255,255,0.5)',
            zIndex: 1,
        },
        iconActive: {
            tintColor: 'rgba(255,255,255,1)',
        },
        text: {
            color: '#fff',
        },
        textActive: {
            fontWeight: '800',
        },
        indicator: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 4,
            backgroundColor: '#fff',
        },
    });
};
