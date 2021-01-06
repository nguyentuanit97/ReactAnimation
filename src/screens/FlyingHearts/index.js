import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, Easing } from 'react-native';
import Header from '../../components/Header';
import { color } from '../../config';
import { height_screen } from '../../utils';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
const animationEndY = Math.ceil(height_screen * 0.85);

const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}
const getRandomColor = () => {
    return `rgb(${getRandomNumber(230, 255)}, ${getRandomNumber(0, 200)}, ${getRandomNumber(0, 255)})`;
}
let heartCount = 1;
const FlyingHearts = ({ navigation }) => {
    const [hearts, setHearts] = useState([]);
    const setIntervalRef = useRef(null);
    const addHeart = () => {
        setHearts((hearts) => {
            let tmpHearts = [...hearts];
            tmpHearts.push({
                id: heartCount,
                right: getRandomNumber(-250, 250),
                color: getRandomColor()
            });
            return tmpHearts;
        });
        heartCount++;
    }
    const removeHeart = () => {
        heartCount = 1;
        setHearts([]);
    }

    useEffect(() => {
        setIntervalRef.current = setInterval(() => {
            addHeart();
        }, 200);
        return (() => {
            removeHeart();
            clearInterval(setIntervalRef.current);
        })
    }, []);

    return (
        <>
            <View style={styles.container}>
                <Header title="Tim rơi" navigation={navigation} back />
                <View style={styles.center}>
                    <View style={styles.viewHearts}>
                        {hearts.map((heart, index) => {
                            return <HeartContainer
                                key={index}
                                customStyle={{ right: heart.right }}
                                customColor={heart.color}
                            />;
                        })
                        }
                    </View>
                </View>
            </View>
        </>
    );
}

export default FlyingHearts;

const HeartContainer = ({ customStyle, customColor, onComplate }) => {
    const [position, setPosition] = useState(new Animated.Value(0));
    const [yAmimation, setYAmimation] = useState(position.interpolate({
        inputRange: [0, animationEndY],
        outputRange: [animationEndY, 0]
    }))

    const [opacityAnimation, setOpacityAnimation] = useState(yAmimation.interpolate({
        inputRange: [0, animationEndY],
        outputRange: [1, 1]
    }))

    const [scaleAnimation, setScaleAnimation] = useState(yAmimation.interpolate({
        inputRange: [0, animationEndY / 1.2, animationEndY / 1.1],
        outputRange: [1, 1.4, 1],
        extrapolate: "clamp"
    }))

    const [xAnimation, setXAnimation] = useState(yAmimation.interpolate({
        inputRange: [0, animationEndY / 6, animationEndY / 3, animationEndY / 1.5, animationEndY],
        outputRange: [10, 20, 30, getRandomNumber(-200, 200), getRandomNumber(-200, 200)]
    }))

    const [rotateAnimation, setRotateAnimation] = useState(yAmimation.interpolate({
        inputRange: [0, animationEndY / 6, animationEndY / 3, animationEndY / 2, animationEndY],
        outputRange: ["0deg", "-10deg", "0deg", "10deg", "0deg"]
    }))

    useEffect(() => {
        Animated.timing(position, {
            duration: 3000,
            toValue: animationEndY,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
    }, []);

    const getHeartStyle = () => {
        return {
            transform: [
                { translateY: position },
                { scale: scaleAnimation },
                { translateX: xAnimation },
                { rotate: rotateAnimation }
            ],
            opacity: opacityAnimation
        }
    }

    return (
        <Animated.View style={[styles.heartContainer, getHeartStyle(), customStyle]}>
            <Heart customColor={customColor} />
        </Animated.View>
    )
}

const Heart = ({ customColor }) => (
    <View style={styles.heart}>
        <Icon name="heart" size={16} color={customColor} />
    </View>
)

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.WHITE
    },
    center: {
        flex: 1
    },
    viewHearts: {
        position: 'absolute',
        top: -20,
        alignSelf: 'center',
        zIndex: -1
    },
    heartContainer: {
        position: 'absolute',
        top: 0
    }
})
