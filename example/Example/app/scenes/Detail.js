import React, { Component } from 'react';

import {
    NavBar,
    Container,
    Title,
    LeftButton,
    SimpleButton,
} from 'components';

export default class DetailScene extends Component {

    componentDidMount() {
        const { scene: { reference }, navigator } = this.props;
        navigator.attachNavigationBar(reference,
            <NavBar>
                <LeftButton onPress={navigator.back} title={'Back'} />
                <Title>Detail</Title>
            </NavBar>
        );
    }

    openModal = () => {
        const { navigator } = this.props;
        navigator.open('modal', {_id: 'modal-id'});
    }

    render() {
        return (
            <Container>
                <SimpleButton onPress={this.openModal} title={'Open modal Scene'} />
            </Container>
        );
    }
};
