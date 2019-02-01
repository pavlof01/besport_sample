import { database, auth } from '../firebase'
import { FootballGame } from '../Interfaces'

export const SET_FOOTBALL_INVITES = 'SET FOOTBALL INVITES'
export const LOADING_FOOTBALL_INVITES = 'LOADING_FOOTBALL_INVITES'

export function loadingFootballInvites() {
  return {
    type: LOADING_FOOTBALL_INVITES,
  }
}

export function setFootballInvites(invites: FootballGame | []) {
  return {
    type: SET_FOOTBALL_INVITES,
    invites,
  }
}

/**
 * Загружаем только id игр от которых пришло приглашение
 * далее в компоненте фильтруем все игры по футболу по тем, от
 * которых есть приглашение.
 * Т.к ндо отслеживать кол-во игроков и другие данные по игре
 * в реальном времени
 */

export const loadFootballInvites = () => (dispath: any, getState: any) => {
  loadingFootballInvites()
  const uid = getState().login.user.uid
  return database
    .ref(`users/${uid}`)
    .child('footballInvites')
    .on('value', snapshot => {
      if (snapshot.val())
        return dispath(setFootballInvites(Object.values(snapshot.val())))
      return dispath(setFootballInvites([]))
    })
}

export const acceptInvite = (id: string) => {
  const { uid, displayName, photoURL } = auth.currentUser
  return database
    .ref('games/football')
    .child(id)
    .child('playersIn')
    .child(uid)
    .set({ id: uid, displayName, photoUrl: photoURL })
}

export const rejectInvite = (id: string) => {
  const { uid } = auth.currentUser
  return database
    .ref('users')
    .child(uid)
    .child('footballInvites')
    .child(id)
    .remove()
}
