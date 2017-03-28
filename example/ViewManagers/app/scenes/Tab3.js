import React from 'react';
import AutoBindComponent from 'react-autobind-component';

import {
    NavBar,
    Container,
    Text,
    Title,
    RightButton,
} from '~/components';

export default class Tab3Scene extends AutoBindComponent {

    state = {
        pressed: 0,
    };

    componentDidMount() {
        const { scene: { reference }, navigator } = this.props;
        navigator.attachNavigationBar(reference,
            <NavBar>
                <Title>Tab 3</Title>
                <RightButton onPress={() => this.setState(({pressed}) => ({pressed: pressed + 1}))} title={'Press me!'} />
            </NavBar>
        );
    }

    render() {
        const { pressed } = this.state;
        return (
            <Container>
                <Text>Tab 3</Text>
                <Text>You pressed it {pressed} times</Text>
            </Container>
        );
    }
};
