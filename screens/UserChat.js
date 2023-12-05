import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../utils/firebaseHelper';
import { getAuth, signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import { Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
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
        <TouchableOpacity style = {{ marginRight: 10 }}
        onPress={signOutNow}
        ></TouchableOpacity>
      )
    })
  }, [navigation]);

  useEffect(() => {
    setMessages([
      { 
        _id:1,
        text: 'Hello developer',
        createAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x'
        },
      },
    ])
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
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
