import { Platform } from 'react-native';

import IOSTabNavigator from './ios/TabNavigator';
import AndroidTabNavigator from './android/TabNavigator';

const TabNavigator = Platform.select({
    ios: () => IOSTabNavigator,
    android: () => AndroidTabNavigator,
})();

export default TabNavigator;
