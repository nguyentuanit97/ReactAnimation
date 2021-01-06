import React, { useEffect } from 'react';
import { View, TouchableOpacity, ImageBackground, Animated, Easing } from 'react-native';
import { color } from '../../config';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { width_screen, height_screen, getStatusBarHeight } from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
const BOY_IMG_SIZE = { width: moderateScale(200), height: moderateScale(330) };
const GIRL_IMG_SIZE = { width: moderateScale(200), height: moderateScale(330) };
const LEFT_BANNER_IMG_SIZE = { width: moderateScale(200), height: moderateScale(220) };
const RIGHT_BANNER_IMG_SIZE = { width: moderateScale(220), height: moderateScale(170 * (192 / 249)) };

const SplashScreen = ({ navigation }) => {
    const grassAnimationValue = new Animated.Value(0);
    const girlPosLeft = new Animated.Value(BOY_IMG_SIZE.width * -1);
    const girlLeftRotateAnimation = new Animated.Value(0);

    const girlPosRight = new Animated.Value(GIRL_IMG_SIZE.width * -1);
    const girlRightRotateAnimation = new Animated.Value(0);

    const leftBannerPosBottom = new Animated.Value(LEFT_BANNER_IMG_SIZE.height * -1);
    const leftBannerPosLeft = new Animated.Value(-10);

    const rightBannerPosBottom = new Animated.Value(RIGHT_BANNER_IMG_SIZE.height * -1);
    const rightBannerPosRight = new Animated.Value(moderateScale(0));

    useEffect(() => {
        Animated.parallel([
            createBoyAnimation(),
            createGirlAnimation(),
            createAnimation(grassAnimationValue, 700, Easing.ease, 0),
            // left banner
            createLeftBannerAnimation(),
            // right banner
            createRightBannerAnimation(),
        ]).start();
    }, []);

    const createAnimation = (value, duration, easing, delay = 0) => {
        return Animated.timing(
            value,
            {
                toValue: 1,
                duration,
                easing,
                delay,
            }
        )
    };

    const grassAnimation = grassAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 0]
    });

    // girl1
    const createBoyAnimation = () => {
        return Animated.sequence([
            // 1. từ trái -> phải
            Animated.timing(girlPosLeft, {
                toValue: 0,
                duration: 700,
                easing: Easing.ease,
            }),
            // 2. [loop] xoay
            Animated.loop(Animated.sequence([
                Animated.timing(girlLeftRotateAnimation, {
                    toValue: 1,
                    duration: 600,
                    easing: Easing.linear,
                }),
                Animated.timing(girlLeftRotateAnimation, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.linear,
                }),
            ]), { iterations: -1 }),
        ]);
    };
    const girl1Spin = girlLeftRotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '2deg']
    });

    // girl2
    const createGirlAnimation = () => {
        return Animated.sequence([
            // 1. từ  phải -> trái
            Animated.timing(girlPosRight, {
                toValue: width_screen / 2 + (30) - GIRL_IMG_SIZE.width,
                duration: 700,
                easing: Easing.ease,
            }),
            // 2. [loop] xoay
            Animated.loop(Animated.sequence([
                Animated.timing(girlRightRotateAnimation, {
                    toValue: 1,
                    duration: 600,
                    easing: Easing.linear,
                }),
                Animated.timing(girlRightRotateAnimation, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.linear,
                }),
            ]), { iterations: -1 }),
        ]);
    };
    const girl2Spin = girlRightRotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '2deg']
    });

    // Cô gái góc dưới trái
    const createLeftBannerAnimation = () => {
        return Animated.sequence([
            // 1. từ dưới đi lên
            Animated.timing(leftBannerPosBottom, {
                toValue: 0,
                duration: 700,
                easing: Easing.ease,
            }),
            // 2. [loop] sang phải -> sang trái -> phải -> trái
            Animated.loop(Animated.sequence([
                Animated.timing(leftBannerPosLeft, {
                    toValue: -15,
                    duration: 2000,
                    easing: Easing.linear,
                }),
                Animated.timing(leftBannerPosLeft, {
                    toValue: -10,
                    duration: 2000,
                    easing: Easing.linear,
                }),
            ]), { iterations: -1 }),
        ]);
    };

    // Logo bên phải
    const createRightBannerAnimation = () => {
        return Animated.sequence([
            // 1. từ dưới đi lên
            Animated.timing(rightBannerPosBottom, {
                toValue: 0,
                duration: 700,
                easing: Easing.ease,
            }),
            // 2. [loop] trái -> sang phải -> sang trái -> phải -> trái
            Animated.loop(Animated.sequence([
                Animated.timing(rightBannerPosRight, {
                    toValue: -10,
                    duration: 500,
                    easing: Easing.linear,
                }),
                Animated.timing(rightBannerPosRight, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.linear,
                }),
            ]), { iterations: -1 }),
        ]);
    };

    return (
        <>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/Splash/BG.jpg')}
                    resizeMode={'cover'}
                    style={[{ width: width_screen, height: height_screen, flex: 1 }]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack(null)}
                        style={styles.btnBack}>
                        <Icon name="arrow-back-sharp" size={moderateScale(30)} color={color.PINK} />
                    </TouchableOpacity>
                    <Animated.Image
                        style={{
                            left: girlPosLeft, position: 'absolute', bottom: 35,
                            width: BOY_IMG_SIZE.width, height: BOY_IMG_SIZE.height,
                            transform: [{ rotate: girl1Spin }],
                        }}
                        resizeMode={'center'}
                        source={require('../../assets/Splash/girl1.png')} />
                    <Animated.Image
                        style={{
                            right: girlPosRight, position: 'absolute', bottom: 35,
                            width: GIRL_IMG_SIZE.width, height: GIRL_IMG_SIZE.height,
                            transform: [{ rotate: girl2Spin }],
                        }}
                        source={require('../../assets/Splash/girl2.png')}
                        resizeMode={'center'}
                    />
                    <Animated.Image
                        style={{ bottom: grassAnimation, position: 'absolute', left: 0, width: width_screen, height: 250 }}
                        resizeMode={'stretch'}
                        source={require('../../assets/Splash/bg-co.png')} />

                    <Animated.Image
                        style={{
                            position: 'absolute', bottom: leftBannerPosBottom, left: leftBannerPosLeft,
                            width: LEFT_BANNER_IMG_SIZE.width, height: LEFT_BANNER_IMG_SIZE.height,
                        }}
                        resizeMode={'cover'}
                        source={require('../../assets/Splash/banner1.png')} />

                    <Animated.Image
                        style={{
                            position: 'absolute', bottom: rightBannerPosBottom, right: rightBannerPosRight,
                            width: RIGHT_BANNER_IMG_SIZE.width, height: RIGHT_BANNER_IMG_SIZE.height,
                        }}
                        resizeMode={'contain'}
                        source={require('../../assets/Splash/banner2.png')} />

                </ImageBackground>
            </View>
        </>
    );
}

export default SplashScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1
    },
    btnBack: {
        position: 'absolute',
        left: '10@s',
        top: moderateScale(10 + getStatusBarHeight()),
        zIndex: 2,
        paddingRight: '30@s',
    }
})
