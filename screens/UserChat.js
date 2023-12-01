import React, { useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const currentUserUID = firebase.auth().currentUser.uid;

const UserChat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const messagesFirestore = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          return data;
        });

        setMessages(messagesFirestore);
      });

    return () => unsubscribe();
  }, []);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    newMessages.forEach((message) => {
      firebase.firestore().collection('messages').add({
        ...message,
        createdAt: new Date().getTime(),
      });
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{ _id: currentUserUID }} // 사용자 ID를 여기에 입력
    />
  );
};

export default UserChat;
