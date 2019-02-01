import { auth, database, footballGamesRef, SERVER_TIMESTAMP } from '../firebase';
import { FootballGame, FootballPlayer } from '../Interfaces';

export const SET_FOOTBALL_GAMES = 'SET FOOTBALL GAMES'
export const ADD_NEW_GAME = 'ADD_NEW_GAME'
export const LOADING_FOOTBALL_GAMES = 'LOADING_FOOTBALL_GAMES'
export const PUSH_NEW_USER_IN_GAME = 'PUSH_NEW_USER_IN_GAME'
export const DELETE_USER_IN_GAME = 'DELETE_USER_IN_GAME'

export function startLoadingFootballGames() {
  return {
    type: LOADING_FOOTBALL_GAMES,
  }
}

export function setFootballGames(games: Array<FootballGame>) {
  return {
    type: SET_FOOTBALL_GAMES,
    games,
  }
}

/**
 * LOAD FOOTBALL GAMES
 */

export const loadFootballGames = () => (dispath: any, getState: any) => {
  dispath(startLoadingFootballGames())
  footballGamesRef.on('value', snapshot => {
    const games: Set<FootballGame> = new Set()
    snapshot.forEach((game: any) => {
      games.add({
        id: game.key,
        ...game.val(),
      })
    })
    dispath(setFootballGames(games))
  })
}

export const createGame = (game: FootballGame) => (dispatch: any) => {
  const authorOfGame = auth.currentUser.displayName
  const photoOfAuthor = auth.currentUser.photoURL
  const {
    placeAdress,
    onlyForFriends,
    cost,
    date,
    duration,
    placeName,
    gameType,
  } = game
  /**
   * TODO: Change set maxPlayers method
   * получаем строку gameType вида '6x6' or '11x11' надо вывести максимальное кол-во человек (12 в первом примере и 22 во втором)
   * ИЗМЕНИТЬ
   */
  let maxPlayers =
    gameType.length > 3
      ? Number(gameType[0] + gameType[1])
      : Number(gameType[0])
  maxPlayers *= 2
  database
    .ref('games')
    .child('football')
    .push({
      adress: placeAdress,
      author: authorOfGame,
      createdAt: SERVER_TIMESTAMP,
      authorID: auth.currentUser.uid,
      photoOfAuthor,
      onlyForFriends,
      cost,
      date,
      duration,
      maxPlayers,
      place: placeName,
      players: 0,
      playersIn: [],
    })
}

export const play = (gameId: string) => {
  const { uid: id, displayName, photoURL: photoUrl } = auth.currentUser
  return database
    .ref()
    .child(`games/football/${gameId}/playersIn/${id}`)
    .set({
      id,
      displayName,
      photoUrl,
    })
}

export const exitGame = (gameId: string) => {
  const { uid } = auth.currentUser
  return database
    .ref()
    .child(`games/football/${gameId}/playersIn/${uid}`)
    .remove()
}

export const deleteGame = (gameId: string) => {
  return database
    .ref('games/football')
    .child(gameId)
    .remove()
}
