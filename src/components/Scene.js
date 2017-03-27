import React, { PropTypes } from 'react';
import AutoBindComponent from 'react-autobind-component';

export default class Scene extends AutoBindComponent {

    static propTypes = {
        component: PropTypes.any.isRequired,
        reference: PropTypes.string.isRequired,
    };

    render() {
        const { component: Component, navigator, route, ...passProps} = this.props;
        return (
            <Component navigator={navigator} route={route} {...passProps} />
        );
    }
};
