import { View, Text, Image, Alert } from 'react-native'
import React, { useCallback, useReducer, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { FONTS, SIZES, images } from '../constants'
import { COLORS } from '../constants'
import Input from '../components/Input'
import Button from '../components/Button'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import { getFirebaseApp } from '../utils/firebaseHelper'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, child, set, getDatabase } from 'firebase/database'
import { useTheme } from '../themes/ThemeProvider'
import { Avatar } from 'react-native-gifted-chat'

const initialState = {
    inputValues: {
        fullName: '',
        email: '',
        password: '',
    },
    inputValidities: {
        fullName: false,
        email: false,
        password: false,
    },
    formIsValid: false,
}

const Register = ({ navigation }) => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const { colors } = useTheme()

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )

    const createUser = async (fullName, email, userId) => {
        const userData = {
            fullName,
            email,
            userId,
            signUpDate: new Date().toISOString(),
        }

        const dbRef = ref(getDatabase())
        const childRef = child(dbRef, `users/${userId}`)
        await set(childRef, userData)

        return userData
    }

    const authHandler = async () => {
        const app = getFirebaseApp()
        const auth = getAuth(app)
        setIsLoading(true)

        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                formState.inputValues.email,
                formState.inputValues.password
            ).then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name,
                    photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
                })
                .then(() => {
                    Alert.alert('가입이 완료되었습니다, 로그인해주세요.');
                })    
            })

            const { uid } = result.user

            const userData = await createUser(
                formState.inputValues.fullName,
                formState.inputValues.email,
                uid
            )

            if (userData) {
                setIsLoading(false)
                navigation.navigate('Login')
            }
        } catch (error) {
            const errorCode = error.code
            let message = '문제가 발생했습니다'
            if (errorCode === 'auth/email-already-in-use') {
                message = '해당 이메일은 이미 사용중입니다'
            }

            setError(message)
            setIsLoading(false)
        }
    }

    // Display error if something went wrong
    useEffect(() => {
        if (error) {
            Alert.alert('오류가 발생했습니다', error)
        }
    }, [error])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <PageContainer>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 22,
                    }}
                >
                    <Image
                        source={images.logo}
                        style={{
                            height: 120,
                            width: 120,
                            marginBottom: 22,
                        }}
                    />

                    <Text
                        style={{
                            ...FONTS.h4,
                            color: colors.text,
                            marginVertical: 8,
                        }}
                    >
                        환영합니다!
                    </Text>

                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['fullName']}
                        id="fullName"
                        placeholder="이름을 입력해주세요."
                        placeholderTextColor={colors.text}
                    />

                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['email']}
                        id="email"
                        placeholder="이메일을 입력해주세요."
                        placeholderTextColor={colors.text}
                    />

                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['password']}
                        id="password"
                        placeholder="비밀번호를 입력해주세요."
                        placeholderTextColor={colors.text}
                        secureTextEntry
                    />

                    <Button
                        title="회원가입"
                        onPress={authHandler}
                        isLoading={isLoading}
                        filled
                        style={{
                            width: SIZES.width - 44,
                            marginBottom: SIZES.padding,
                            marginVertical: 8,
                        }}
                    />
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Register
