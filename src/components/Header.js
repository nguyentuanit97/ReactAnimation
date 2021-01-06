import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image, StyleSheet } from 'react-native';
import { color, font, font_size } from '../config';
import { getStatusBarHeight } from '../utils';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
const HeaderTitle = ({ navigation, title, back }) => {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={color.COLOR_HEADER} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.center}>
                        {back ?
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.goBack(null)}
                                style={styles.btnBack}>
                                <Icon name="back" size={20} color={color.WHITE}/>
                            </TouchableOpacity> : null
                        }
                        <Text allowFontScaling={false} numberOfLines={1} style={styles.txtTitle}>{title}</Text>
                    </View>
                </View>
            </LinearGradient>
        </>
    );
}

export default HeaderTitle;

const styles = ScaledSheet.create({
    container: {
        paddingBottom: '10@s',
        height: moderateScale(50 + getStatusBarHeight()),
        backgroundColor: color.WHITE,
        borderBottomColor: color.GRAY,
        borderBottomWidth: '0.5@s',
        zIndex: 2
    },
    containerHeader: {
        paddingTop: moderateScale(10 + getStatusBarHeight())
    },
    center: {
        padding: '5@s',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    txtTitle: {
        fontFamily: font.SFProTextBold,
        fontSize: font_size.LARGE,
        color: color.WHITE,
        textAlign: 'center',
        marginLeft: '50@s',
        marginRight: '50@s',
        flex: 1,
    },
    btnBack: {
        position: 'absolute',
        left: '10@s',
        zIndex: 2,
        paddingRight: '30@s'
    }
})
