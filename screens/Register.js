import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { auth } from '../utils/firebaseHelper'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const register = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registered
            const user = userCredential.user;
            updateProfile(user, {
                displayName: name,
                photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
            })
            .then(() => {
              alert('회원가입이 완료되었습니다. 로그인해주세요.');
            })
            .catch((error) => {
                alert(error.message);
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='이름을 입력해주세요.'
                label='이름'
                value={name}
                onChangeText={text => setName(text)}
            />
            <Input
                placeholder='이메일을 입력해주세요.'
                label='이메일'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='비밀번호를 입력해주세요.'
                label='비밀번호'
                value={password} onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Input
                placeholder='프로필 이미지 URL을 입력해주세요.'
                label='프로필 이미지 URL'
                value = {avatar}
                onChangeText={text => setAvatar(text)}
            />
            <Button title='회원가입' onPress={register} style={styles.button} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 100,
    },
    button: {
        width: 370,
        marginTop: 10
    }
});

export default Register;