import { database } from '../firebase'

export const SET_USER_DATA = 'SET_USER_DATA'
export const LOAD_USER_DATA = 'LOAD_USER_DATA'

export const loadUserData = () => ({
    type: LOAD_USER_DATA
})

export const setDataCurrentWatchingUser = (user: any) => ({
    type: SET_USER_DATA,
    user
})

export const loadUserInfo = (userId: string) => (dipatch: any, getState: any) => {
    dipatch(loadUserData())
    return database.ref('users').child(userId).once('value').then((snapshotUser: any) => {        
        const user = {
            id: snapshotUser.val().id,
            displayName: snapshotUser.val().displayName,
            photoUrl: snapshotUser.val().photoUrl,
            friends: Object.values(snapshotUser.val().friends || {})
        }
        dipatch(setDataCurrentWatchingUser(user))
    })
}