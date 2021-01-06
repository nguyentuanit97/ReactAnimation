import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import Header from '../../components/Header';
import { color, font } from '../../config';
import { height_screen } from '../../utils';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
const animationEndY = Math.ceil(height_screen * 0.7);
const negativeEndY = animationEndY * - 1;

const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}
const getRandomColor = () => {
    return `rgb(${getRandomNumber(230, 255)}, ${getRandomNumber(0, 200)}, ${getRandomNumber(0, 255)})`;
}
let heartCount = 1;
const Hearts = ({ navigation }) => {
    const [hearts, setHearts] = useState([]);
    const setClickTimeoutRef = useRef(null);
    const addHeart = () => {
        let tmpHearts = [...hearts];
        tmpHearts.push({
            id: heartCount,
            right: getRandomNumber(-8, 8),
            color: getRandomColor()
        });
        setHearts(tmpHearts);
        heartCount++;
    }
    const removeHeart = () => {
        if (setClickTimeoutRef.current) {
            clearTimeout(setClickTimeoutRef.current);
        }
        setClickTimeoutRef.current = setTimeout(() => {
            heartCount = 1;
            setHearts([]);
        }, 5000);
    }
    return (
        <>
            <View style={styles.container}>
                <Header title="Thả tim bay" navigation={navigation} back />
                <View style={styles.center}>
                    {hearts.map((heart, index) => {
                        return <HeartContainer
                            key={index}
                            customStyle={{ right: heart.right }}
                            onComplate={removeHeart}
                            customColor={heart.color}
                        />;
                    })
                    }
                    <TouchableOpacity onPress={addHeart} style={styles.btnClick}>
                        <Icon name="heart" size={16} color={color.RED} />
                        <Text style={styles.txtClick}>Click here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

export default Hearts;

const HeartContainer = ({ customStyle, customColor, onComplate }) => {
    const [position, setPosition] = useState(new Animated.Value(0));
    const [yAmimation, setYAmimation] = useState(position.interpolate({
        inputRange: [negativeEndY, 0],
        outputRange: [animationEndY, 0]
    }))

    const [opacityAnimation, setOpacityAnimation] = useState(yAmimation.interpolate({
        inputRange: [0, animationEndY],
        outputRange: [1, 0]
    }))

    const [scaleAnimation, setScaleAnimation] = useState(yAmimation.interpolate({
        inputRange: [0, 15, 30],
        outputRange: [0, 1.4, 1],
        extrapolate: "clamp"
    }))

    const [xAnimation, setXAnimation] = useState(yAmimation.interpolate({
        inputRange: [0, animationEndY / 6, animationEndY / 3, animationEndY / 2, animationEndY],
        outputRange: [getRandomNumber(-20, 20), getRandomNumber(-200, 200), 15, getRandomNumber(-200, 200), 10]
    }))

    const [rotateAnimation, setRotateAnimation] = useState(yAmimation.interpolate({
        inputRange: [0, animationEndY / 6, animationEndY / 3, animationEndY / 2, animationEndY],
        outputRange: ["0deg", "-5deg", "0deg", "5deg", "0deg"]
    }))

    useEffect(() => {
        Animated.timing(position, {
            duration: 2000,
            toValue: negativeEndY,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(onComplate);
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
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center'
    },
    btnClick: {
        alignItems: 'center'
    },
    txtClick: {
        marginTop: '3@s',
        fontFamily: font.SFProTextRegular,
        color: color.RED
    }
})
