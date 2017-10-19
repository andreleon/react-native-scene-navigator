import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Scene extends Component {

    static contextTypes = {
        navigator: PropTypes.object,
        tabNavigator: PropTypes.object,
    };

    static propTypes = {
        component: PropTypes.any.isRequired,
        reference: PropTypes.string.isRequired,
        navigator: PropTypes.object,
        tabNavigator: PropTypes.object,
        scene: PropTypes.object,
    };

    render() {
        const { navigator, tabNavigator } = this.context;
        const { component: Component, scene, ...passProps } = this.props;

        return (
            <Component
                navigator={navigator}
                tabNavigator={tabNavigator}
                scene={scene}
                {...passProps} />
        );
    }
};
