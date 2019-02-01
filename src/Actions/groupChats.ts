import { database, SERVER_TIMESTAMP } from '../firebase'
import { Friend, GroupChat, GroupChatUser } from '../Interfaces'

const uuidv1 = require('uuid/v1')

export const START_LOADING = 'START_LOADING'
export const SET_GROUP_CHATS = 'SET_GROUP_CHATS'
export const ADD_GROUP_CHAT = 'ADD GROUP CHAT'
export const SET_GROUP_MESSAGES = 'SET_GROUP_MESSAGES'
export const CHANGE_GROUP_CHAT_NAME = 'CHANGE_GROUP_CHAT_NAME'
export const ADD_USERS_TO_GROUP_CHAT = 'ADD_USERS_TO_GROUP_CHAT'
export const DELETE_USER_FROM_GROUP_CHAT = 'DELETE_USER_FROM_GROUP_CHAT'
export const DELETE_GROUP_CHAT = 'DELETE_GROUP_CHAT'

export const startLoadingGroupChats = () => ({
  type: START_LOADING,
})

export const setGroupChats = (groupChats: Array<GroupChat>) => ({
  type: SET_GROUP_CHATS,
  groupChats,
})

export const loadGroupChats = () => (dispatch: any, getState: any) => {
  dispatch(startLoadingGroupChats())
  const uid = getState().login.user.uid
  return new Promise((resolve, reject) => {
    database
    .ref(`users/${uid}`)
    .child('groupChats')
    .once('value').then(snapshot => {
      const groupChats = []
      snapshot.forEach(snapshotChild => {
        database.ref('groupChats').child(`${snapshotChild.key}/users`).on('value', (usersSnapshot) => {
          if (usersSnapshot.val()){
            groupChats.push({
              id: snapshotChild.key,                        
              ...snapshotChild.val(),
              messages: [],    
              users: Object.values(usersSnapshot.val()),
            })
          }else{
            database.ref(`users/${uid}`).child(`groupChats/${snapshotChild.key}`).remove()
          }
          database.ref('groupChats').child(`${snapshotChild.key}/users`).off()         
        });   
      })             
      resolve(dispatch(setGroupChats(groupChats)))
    })
  }) 
}

export const createGroupChat = (
  invitedFriends: Array<Friend>,
  displayName: string
) => (dispatch: any, getState: any) => {
  const user = getState().login.user
  const chatId = uuidv1()
  invitedFriends.push({
    id: user.uid,
    displayName: user.displayName,
    photoUrl: user.photoURL,
  })
  const groupChat = {
    chatId,
    displayName,
    photoUrl:
      'https://labelstech.com/wp-content/uploads/2017/02/47199326-profile-pictures.png',
    authorId: user.uid,
    authorName: user.displayName,
  }
  return database
    .ref('groupChats')
    .child(chatId)
    .set(groupChat)
    .then(() => {
      invitedFriends.forEach(friend => {
        database
          .ref('users')
          .child(`${friend.id}/groupChats/${chatId}`)
          .update(
            Object.assign({}, groupChat, { lastMsgFetch: SERVER_TIMESTAMP })
          )
        database
          .ref('groupChats')
          .child(chatId)
          .child(`users/${friend.id}`)
          .set(friend)
      })
    })
}

export const changeGroupChat = (
  chat: GroupChat,
  invitedFriends: Array<Friend>,
  displayName: string
) => (dispatch: any, getState: any) => {
  if (displayName) {
    dispatch(changeGroupChatName(chat.id, displayName))
    database
      .ref('groupChats')
      .child(`${chat.id}/displayName`)
      .set(displayName)
  }
  if (invitedFriends.length) {
    dispatch(addUsersToGroupChat(chat.id, invitedFriends))
    invitedFriends.forEach(friend => {
      database
        .ref('groupChats')
        .child(`${chat.id}/users/${friend.id}`)
        .set(friend)
      database
        .ref('users')
        .child(`${friend.id}/groupChats/${chat.id}`)
        .set(chat)
    })
  }
}

export const addUsersToGroupChat = (
  chatId: string,
  users: Array<GroupChatUser>
) => ({
  type: ADD_USERS_TO_GROUP_CHAT,
  chatId,
  users,
})

export const changeGroupChatName = (chatId: string, newName: string) => ({
  type: CHANGE_GROUP_CHAT_NAME,
  chatId,
  newName,
})

export const deleteUserFromGroupChatData = (
  chatId: string,
  userId: string
) => ({
  type: DELETE_USER_FROM_GROUP_CHAT,
  chatId,
  userId,
})

export const deleteUserFromGroupChat = (userId: string, chatId: string) => (
  dispatch: any
) => {
  return database
    .ref('groupChats')
    .child(`${chatId}/users`)
    .once('value')
    .then(snapshot => {
      snapshot.forEach(user => {
        if (user.val().id === userId) {
          dispatch(deleteUserFromGroupChatData(chatId, userId))
          database
            .ref('groupChats')
            .child(`${chatId}/users/${user.key}`)
            .remove()
          database
            .ref('users')
            .child(`${user.val().id}/groupChats/${chatId}`)
            .remove()
        }
      })
    })
}

export const deleteGroupChatData = (chatId: string) => ({
  type: DELETE_GROUP_CHAT,
  chatId,
})

export const deleteGroupChat = (chatId: string) => (dispatch: any) => {
  dispatch(deleteGroupChatData(chatId))
  return database
    .ref('groupChats')
    .child(chatId)
    .remove()
}
