import React from 'react';
import AutoBindComponent from 'react-autobind-component';

import {
    NavBar,
    Container,
    Text,
    Title,
} from '~/components';

export default class Tab2Scene extends AutoBindComponent {

    componentDidMount() {
        const { route: { reference }, navigator } = this.props;
        navigator.attachNavigationBar(reference,
            <NavBar>
                <Title>Tab 2</Title>
            </NavBar>
        );
    }

    render() {
        return (
            <Container>
                <Text>Tab 2</Text>
            </Container>
        );
    }
};
