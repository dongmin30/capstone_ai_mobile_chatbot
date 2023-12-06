import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../utils/firebaseHelper';
import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import { Alert } from 'react-native';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
const UserChat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const signOutNow = () => {
    signOut(auth).then(() => {
      // 로그아웃 성공 처리
      navigation.replace('Login');
    }).catch((error) => {
      Alert.alert('오류가 발생하였습니다.');
    });
  }
  useLayoutEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
                <Avatar
                    rounded
                    source={{
                        uri: auth?.currentUser?.photoURL,
                    }}
                />
            </View>
        ),
        headerRight: () => (
            <TouchableOpacity style={{
                marginRight: 10
            }}
                onPress={signOutNow}
            >
                <Text>logout</Text>
            </TouchableOpacity>
        )
    })

    const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
        snapshot.docs.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
        }))
    ));

    return () => {
      unsubscribe();
    };

  }, [navigation]);

  const onSend = useCallback((messages = []) => {
    const { _id, createdAt, text, user, } = messages[0]

    addDoc(collection(db, 'chats'), { _id, createdAt, text, user});
  }, []);
  return (
    <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
            _id: auth?.currentUser?.email,
            name: auth?.currentUser?.displayName,
            avatar: auth?.currentUser?.photoURL
        }}
    />
  );
};

export default UserChat;