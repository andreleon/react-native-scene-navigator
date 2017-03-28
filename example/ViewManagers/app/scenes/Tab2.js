import React from 'react';
import AutoBindComponent from 'react-autobind-component';

import { ScrollView } from 'react-native';

import {
    NavBar,
    Container,
    Title,
    SimpleButton,
} from '~/components';

export default class Tab2Scene extends AutoBindComponent {

    componentDidMount() {
        const { scene: { reference }, navigator } = this.props;
        navigator.attachNavigationBar(reference,
            <NavBar>
                <Title>Tab 2</Title>
            </NavBar>
        );
    }

    render() {
        const { navigator } = this.props;
        return (
            <Container>
                <ScrollView>
                    <SimpleButton onPress={() => navigator.open('push-from-right')} title={'push-from-right'} />
                    <SimpleButton onPress={() => navigator.open('float-from-right')} title={'float-from-right'} />
                    <SimpleButton onPress={() => navigator.open('float-from-left')} title={'float-from-left'} />
                    <SimpleButton onPress={() => navigator.open('float-from-bottom')} title={'float-from-bottom'} />
                    <SimpleButton onPress={() => navigator.open('swipe-from-left')} title={'swipe-from-left'} />
                    <SimpleButton onPress={() => navigator.open('horizontal-swipe-jump')} title={'horizontal-swipe-jump'} />
                    <SimpleButton onPress={() => navigator.open('horizontal-swipe-jump-from-right')} title={'horizontal-swipe-jump-from-right'} />
                    <SimpleButton onPress={() => navigator.open('horizontal-swipe-jump-from-left')} title={'horizontal-swipe-jump-from-left'} />
                    <SimpleButton onPress={() => navigator.open('vertical-up-swipe-jump')} title={'vertical-up-swipe-jump'} />
                    <SimpleButton onPress={() => navigator.open('vertical-down-swipe-jump')} title={'vertical-down-swipe-jump'} />
                </ScrollView>
            </Container>
        );
    }
};
