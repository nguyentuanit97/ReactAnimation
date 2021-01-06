import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../components/Header';
import { color, font, font_size } from '../../config';
import { ScaledSheet } from 'react-native-size-matters';
const listScreen = [
    {
        route: 'SplashScreen',
        title: 'Splash Screen'
    },
    {
        route: 'Hearts',
        title: 'Nút thả tim bay'
    },
    {
        route: 'FlyingHearts',
        title: 'Tim rơi'
    }
];

const Main = ({ navigation }) => {
    const _renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate(item.route)}
            style={styles.listWrapper}>
            <Text style={styles.txtTitle}>
                {(index + 1) + '. ' + item.title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <>
            <View style={styles.container}>
                <Header title="Tuấn HP Animation" />
                <FlatList
                    data={listScreen}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false} />
            </View>
        </>
    );
}

export default Main;

const styles = ScaledSheet.create({
    container: {
        flex: 1
    },
    listWrapper: {
        borderBottomWidth: 1,
        borderColor: color.EXTRALIGHT,
    },
    txtTitle: {
        paddingLeft: '10@s',
        color: color.GENERAL,
        fontFamily: font.SFProTextMedium,
        fontSize: '16@s',
        paddingVertical: '15@s',
    }
})
