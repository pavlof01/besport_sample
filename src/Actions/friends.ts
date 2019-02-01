import { database, SERVER_TIMESTAMP } from '../firebase'
import { Friend } from '../Interfaces'

export const START_LOAD = 'START LOAD'
export const SET_FRIENDS = 'SET FRIENDS'
export const ADD_FRIEND = 'ADD FRIEND'
export const DELETE_FRIEND = 'DELETE FRIEND'
export const SET_LAST_MESSAGES_TIME_FETCH = 'SET_LAST_MESSAGES_TIME_FETCH'

export const startLoad = () => ({
  type: START_LOAD,
})

export const setFriends = friends => ({
  type: SET_FRIENDS,
  friends,
})

export const setLastMessagesTimeFetch = (friendId: string) => ({
  type: SET_LAST_MESSAGES_TIME_FETCH,
  friendId,
})

export const loadFriends = () => (dispath, getState) => {
  dispath(startLoad())
  const { uid } = getState().login.user
  return new Promise((resolve, reject) => {
    database
    .ref(`users/${uid}`)
    .child('friends')
    .once('value')
    .then(snapshot => {
      const friends = []
      snapshot.forEach(snapshotChild => {
        friends.push({
          id: snapshotChild.key,          
          ...snapshotChild.val(),
        })
      })     
      resolve(dispath(setFriends(friends)))
    })
  })
}

export const sendFriendRequest = (friendData: Friend) => (
  dispath,
  getState
) => {
  if (!friendData) return
  const myId = getState().login.user.uid
  const userId = friendData.id
  const myRef = database.ref(
    `users/${myId}/sendRequestsForFriendship/${userId}`
  )
  const userRef = database.ref(
    `users/${userId}/getRequestsForFriendship/${myId}`
  )
  const { displayName, photoUrl, id } = friendData
  const friend = { displayName, id, photoUrl }
  const myData = {
    id: getState().login.user.uid,
    displayName: getState().login.user.displayName,
    photoUrl: getState().login.user.photoURL,
    lastMsgFetch: SERVER_TIMESTAMP,
  }
  return myRef.set(friend).then(() => userRef.set(myData))
}

export const addFriend = friend => ({
  type: ADD_FRIEND,
  friend,
})

export const acceptFriendRequest = (friendData: Friend) => (
  dispath,
  getState
) => {
  if (!friendData) return
  const myId = getState().login.user.uid
  const userId = friendData.id
  const myRef = database.ref(`users/${myId}/friends/${userId}`)
  const userRef = database.ref(`users/${userId}/friends/${myId}`)
  const myRequsetRef = database
    .ref(`users/${myId}`)
    .child(`getRequestsForFriendship/${userId}`)
  const userRequsetRef = database
    .ref(`users/${userId}`)
    .child(`sendRequestsForFriendship/${myId}`)
  const { id, displayName, photoUrl } = friendData
  const friend = {
    id,
    displayName,
    photoUrl,
    lastMsgFetch: SERVER_TIMESTAMP,
  }
  const myData = {
    id: getState().login.user.uid,
    displayName: getState().login.user.displayName,
    photoUrl: getState().login.user.photoURL,
    lastMsgFetch: SERVER_TIMESTAMP,
  }
  return myRef
    .set(friend)
    .then(() => userRef.set(myData))
    .then(() => myRequsetRef.remove())
    .then(() => userRequsetRef.remove())
}

export const deleteFriend = (id: string) => ({
  type: DELETE_FRIEND,
  id,
})

export const deleteFriendData = (friend: Friend) => (
  dispath: any,
  getState: any
) => {
  const { uid } = getState().login.user
  return database
    .ref(`users/${uid}`)
    .child(`friends/${friend.id}`)
    .remove()
    .then(() => {
      database
        .ref(`users/${friend.id}`)
        .child(`friends/${uid}`)
        .remove()
      dispath(deleteFriend(friend.id))
    })
}

export const rejectFriendRequest = friend => (dispath, getState) => {
  const { uid } = getState().login.user
  return database
    .ref(`users/${uid}`)
    .child(`getRequestsForFriendship/${friend.id}`)
    .remove()
    .then(() => {
      database
        .ref(`users/${friend.id}`)
        .child(`sendRequestsForFriendship/${uid}`)
        .remove()
    })
}

export const triggerOnDeletedFriend = () => (dispath, getState) => {
  const { uid } = getState().login.user
  return database
    .ref(`users/${uid}`)
    .child('friends')
    .on('child_removed', friend => {
      dispath(deleteFriend(friend.val().id))
    })
}

/* export const triggerOnAddFriend = () => (dispath, getState) => {
  const { uid } = getState().login.user;
  let lastMessage;
  return database
    .ref(`users/${uid}`)
    .child("friends")
    .on("child_added", snapshotFriend => {      
      database
        .ref(`users/${uid}`)
        .child(`chats/${snapshotFriend.val().id}`)
        .limitToLast(1)
        .once("value")
        .then(message => {
          message.forEach(item => {
            if (item.exists()) {
              lastMessage = item.val();
            } else {
              lastMessage = {
                text: null,
                date: null
              };
            }
          });
        });
      const friend = snapshotFriend.val();
      friend.lastMessage = lastMessage;
      dispath(addFriend(friend));
    });
}; */
