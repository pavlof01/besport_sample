import { database, auth, SERVER_TIMESTAMP } from "../firebase"

export const sendGroupMessage = (chatId: string, text: string)  => {    
  const { uid, displayName, photoURL } = auth.currentUser; 
  const milliseconds = SERVER_TIMESTAMP;
  const groupChatRef = database.ref(`groupChats/${chatId}/messages`); 
  if (groupChatRef){
    groupChatRef.push({
      milliseconds,
      text,
      authorId: uid,
      authorName: displayName,
      photoUrl: photoURL
    });
  }else{
    console.warn('Чат удален');
    alert('Чат удален')
  }  
};

export const sendPrivateMessage = (userId: string, text: string) => {
  const { uid, displayName, photoURL } = auth.currentUser;   
  const milliseconds = SERVER_TIMESTAMP;
  const message = {
    milliseconds,
    text,
    author: uid,
    authorName: displayName,
    photoUrl: photoURL
  };  
  const rootUserRef = database.ref(`users/${uid}`).child(`chats/${userId}`);
  const messageToUser = database.ref(`users/${userId}`).child(`chats/${uid}`);  
  return messageToUser.push(message).then(() => rootUserRef.push(message))
};
