import React, { Component} from 'react';

import { Navigator, Scene } from 'react-native-scene-navigator';

import MainScene from '~/scenes/Main';
import DetailScene from '~/scenes/Detail';
import ModalScene from '~/scenes/Modal';

export default class App extends Component {
    render() {
        return (
            <Navigator
                onTransitionComplete={() => console.log('jaja')}
            >
                <Scene
                    transition={Navigator.transitions.standard}
                    reference={'main'}
                    component={MainScene} />
                <Scene
                    transition={Navigator.transitions.standard}
                    reference={'detail'}
                    component={DetailScene} />
                <Scene
                    transition={Navigator.transitions.modal}
                    reference={'modal'}
                    component={ModalScene} />
                <Scene
                    transition={Navigator.transitions.PushFromRight}
                    reference={'push-from-right'}
                    component={ModalScene} />
                <Scene
                    transition={Navigator.transitions.FloatFromRight}
                    reference={'float-from-right'}
                    component={ModalScene} />
                <Scene
                    transition={Navigator.transitions.FloatFromLeft}
                    reference={'float-from-left'}
                    component={ModalScene} />
                <Scene
                    transition={Navigator.transitions.FloatFromBottom}
                    reference={'float-from-bottom'}
                    component={ModalScene} />
                <Scene
                    transition={Navigator.transitions.SwipeFromLeft}
                    reference={'swipe-from-left'}
                    component={ModalScene} />
                <Scene
                    transition={Navigator.transitions.HorizontalSwipeJump}
                    reference={'horizontal-swipe-jump'}
                    component={ModalScene} />
                <Scene
                    transition={Navigator.transitions.HorizontalSwipeJumpFromRight}
                    reference={'horizontal-swipe-jump-from-right'}
                    component={ModalScene} />
                <Scene
                    transition={Navigator.transitions.HorizontalSwipeJumpFromLeft}
                    reference={'horizontal-swipe-jump-from-left'}
                    component={ModalScene} />
                <Scene
                    transition={Navigator.transitions.VerticalUpSwipeJump}
                    reference={'vertical-up-swipe-jump'}
                    component={ModalScene} />
                <Scene
                    transition={Navigator.transitions.VerticalDownSwipeJump}
                    reference={'vertical-down-swipe-jump'}
                    component={ModalScene} />
            </Navigator>
        );
    }
};


// Navigator.SceneConfigs.FloatFromBottomAndroid
// Navigator.SceneConfigs.FadeAndroid
