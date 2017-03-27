import React from 'react';
import { View } from 'react-native';
import AutoBindComponent from 'react-autobind-component';

// DeferredView renders its content in the next javascript frame
export default class DeferredView extends AutoBindComponent {
    state = { render: false };
    constructor(props) {
        super(props);
        // https://facebook.github.io/react-native/docs/timers.html
        setImmediate(() => this.setState({render: true}));
    }
    renderChildren(children) {
        const { render } = this.state;
        return render && children;
    }
    render() {
        const { children, style, ...restProps} = this.props;
        return (
            <View style={[{flex: 1}, style]} {...restProps}>
                { this.renderChildren(children) }
            </View>
        );
    }
};
