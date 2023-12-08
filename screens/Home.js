import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES } from '../constants'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { useTheme } from '../themes/ThemeProvider'

const Home = ({ navigation }) => {

    const { dark, colors, setScheme } = useTheme();

    const ToggleTheme = ()=>{
        dark ? setScheme('light') : setScheme('dark')
    }

    return (
        <SafeAreaView
            style={[
                styles.areaStyle,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <View style={styles.center}>
                <TouchableOpacity
                 onPress={ToggleTheme}
                >
                    <Ionicons
                        name={ dark ? 'sunny-outline': "partly-sunny-sharp"}
                        size={32}
                        color={dark ? COLORS.white: COLORS.black}
                    />
                </TouchableOpacity>

                <Text
                    style={[
                        styles.subTitle,
                        {
                            color: colors.text,
                        },
                    ]}
                >
                    Examples
                </Text>

                <View
                    style={[
                        styles.box,
                        {
                            backgroundColor: colors.background,
                            borderColor: colors.text,
                            borderWidth: 1,
                        },
                    ]}
                >
                    <Text style={[styles.boxText, { color: colors.text }]}>
                        "양자 컴퓨터에 대해 간단하게 설명해주세요."
                    </Text>
                </View>
                <View
                    style={[
                        styles.box,
                        {
                            backgroundColor: colors.background,
                            borderColor: colors.text,
                            borderWidth: 1,
                        },
                    ]}
                >
                    <Text style={[styles.boxText, { color: colors.text }]}>
                        "자바스크립트에서 HTTP 요청하는 방법을 알려주세요."
                    </Text>
                </View>
                <View
                    style={[
                        styles.box,
                        {
                            backgroundColor: colors.background,
                            borderColor: colors.text,
                            borderWidth: 1,
                        },
                    ]}
                >
                    <Text style={[styles.boxText, { color: colors.text }]}>
                        "20살 기념 생일 선물은 뭐가 좋을까요?"
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate('Chat')}
                >
                    <AntDesign name="plus" size={24} color={COLORS.white} />
                    <Text style={styles.btnText}>새 채팅</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    areaStyle: {
        flex: 1,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subTitle: {
        ...FONTS.h4,
        marginVertical: 22,
    },
    box: {
        width: 300,
        paddingVertical: 18,
        marginVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxText: {
        ...FONTS.body4,
        textAlign: 'center',
        color: COLORS.white,
    },

    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        width: 300,
        paddingVertical: SIZES.padding * 2,
    },
    btnText: {
        ...FONTS.body3,
        color: COLORS.white,
        marginLeft: 8,
    },
})
export default Home
