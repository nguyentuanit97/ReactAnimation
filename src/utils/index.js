import { Dimensions, Platform } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const width_screen = Dimensions.get("window").width;
const height_screen = Dimensions.get("window").height;

let isIPhoneX = false;
if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    isIPhoneX = width_screen === X_WIDTH && height_screen === X_HEIGHT || width_screen === XSMAX_WIDTH && height_screen === XSMAX_HEIGHT;
}

function getStatusBarHeight() {
    return Platform.select({
        ios: isIPhoneX ? 44 : 20,
        android: 0,
        default: 0
    })
}

function getBottomSpace() {
    return isIPhoneX ? 20 : 0;
}

export {
    width_screen,
    height_screen,
    getStatusBarHeight,
    getBottomSpace
}

