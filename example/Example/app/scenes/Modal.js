import React from 'react';
import AutoBindComponent from 'react-autobind-component';

import {
    NavBar,
    Container,
    RightButton,
    Title,
    SimpleButton,
} from 'components';

export default class ModalScene extends AutoBindComponent {

    componentDidMount() {
        const { scene: { reference }, navigator } = this.props;
        navigator.attachNavigationBar(reference,
            <NavBar>
                <Title>Modal</Title>
                <RightButton title={'Close'} onPress={navigator.back} />
            </NavBar>
        );
    }

    render() {
        const { navigator } = this.props;
        return (
            <Container>
                <SimpleButton title={'Close'} onPress={navigator.back} />
            </Container>
        );
    }
};
