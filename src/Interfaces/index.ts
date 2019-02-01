export interface FootballGame {
  id: string
  friends?: [Friend]
  gameId?: string
  adress: string
  author: string
  authorID: string
  onlyForFriends: boolean
  duration: number
  maxPlayers: number
  place: string
  players: number
  photoOfAuthor: string
  playersIn: [FootballPlayer]
  time: string
  title: string
  date: string
  cost: number
  item?: FootballGame
}

export interface FootballPlayer {
  key?: string
  id: string
  displayName: string
  photoUrl: string
}

export interface Friend {
  id: string
  displayName: string
  lastMsgFetch: number
  photoUrl: string
  item?: Friend
}

export interface FootballGamePlace {
  id: string
  adress: string
  latitude: number
  longitude: number
  name: string
  image: string
}

export interface GroupChat {
  id: string
  authorId: string
  authorName: string
  chatId: string
  messages: [Message]
  displayName: string
  photoUrl: string
  unread: number
  users: [GroupChatUser]
  lastMsgFetch: number
}

export interface Message {
  authorId?: string
  authorName?: string
  date?: string
  milliseconds?: number
  photoUrl?: string
  text: string
  serviceMessage: boolean
}

export interface GroupChatUser {
  displayName: string
  id: string
  photoUrl: string
}
