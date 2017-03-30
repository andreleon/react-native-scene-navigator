import React from 'react';
import AutoBindComponent from 'react-autobind-component';

import {
    NavBar,
    Container,
    Title,
    SimpleButton,
} from '~/components';

export default class Tab1Scene extends AutoBindComponent {

    componentDidMount() {
        const { scene: { reference }, navigator, tabNavigator } = this.props;
        navigator.attachNavigationBar(reference,
            <NavBar>
                <Title>Tab 1</Title>
            </NavBar>
        );
    }

    openDetail() {
        const { navigator } = this.props;
        navigator.open('detail', { _id: 'detail-id' });
    }

    openModal() {
        const { navigator } = this.props;
        navigator.open('modal', { _id: 'modal-id' });
    }

    render() {
        return (
            <Container>
                <SimpleButton onPress={this.openDetail} title={'Open detail Scene'} />
                <SimpleButton onPress={this.openModal} title={'Open modal Scene'} />
            </Container>
        );
    }
};
