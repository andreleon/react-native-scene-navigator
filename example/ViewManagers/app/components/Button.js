import { Platform } from 'react-native';

import IOSButton from './ios/Button';
import AndroidButton from './android/Button';

const Button = Platform.select({
    ios: () => IOSButton,
    android: () => AndroidButton,
})();

export default Button;
