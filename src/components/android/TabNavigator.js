import React, { Children, cloneElement } from 'react';
import AutoBindComponent from 'react-autobind-component';
import { findIndex } from 'lodash';
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

        this._tabStack = Children.map(children, (child, index) => {
            if (child.type !== Scene) throw new Error(`Expected 'Scene' but instead got '${child.type.displayName}'. Please use Navigator component Scene for scene declarations.`);

            const { title, reference, icon, selectedIcon } = child.props;

            if (props.initialTab === reference) this._initialPage = index;

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

        this._buttonWidth = Math.round(deviceWidth / this._tabStack.length);

        this.state = {
            offset: new Animated.Value(0),
            position: new Animated.Value(this._initialPage),
            selectedTabIndex: this._initialPage,
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

    updateNavigationBar(index) {
        const { navigator, route: { reference } } = this.props;
        if (this.navbars[this._tabStack[index].reference]) {
            navigator.attachNavigationBar(reference, this.navbars[this._tabStack[index].reference]);
        }
    }

    selectTab(index) {
        this.refs.viewpager.setPage(index);
    }

    handlePageScroll({nativeEvent: {offset, position}}) {
        const index = Math.round(position + offset);
        this.setState(({selectedTabIndex}) => {
            if (index === selectedTabIndex) return;
            this.updateNavigationBar(index);
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

    renderTabButtons() {
        const { style } = this;
        return this._tabStack.map(({child, title, icon, selectedIcon}, index) => {
            const { selectedTabIndex } = this.state;
            const isActive = selectedTabIndex === index;
            return (
                <Button
                    key={index}
                    style={[style.button, {width: this._buttonWidth}]}
                    onPress={() => this.selectTab(index)}
                >
                    { icon && <Image style={[style.icon, isActive && style.iconActive, this.getUserDefinedIconColor(isActive)]} source={selectedIcon ? (isActive ? selectedIcon : icon) : icon} /> }
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
