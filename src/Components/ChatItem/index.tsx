import * as React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationInjectedProps } from 'react-navigation'
import moment from 'moment/min/moment-with-locales.min'
import { database, auth } from '../../firebase'
import { GroupChatUser } from '../../Interfaces'
import { setCountUnreadMessages } from '../../Actions/notificationsBottomBar'

moment.locale('ru')
const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  chatImage: {},
  image: {
    width: 50,
    height: 50,
  },
  chatBody: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 17,
  },
  chatName: {
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  chatText: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  chatTimeUnreadMsg: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  chatTime: {
    color: '#9f9f9f',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },
  unreadMessages: {
    width: 20,
    height: 20,
    borderRadius: 10,
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    backgroundColor: '#395aff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
})

interface IChatItem {
  id: string
  displayName: string
  photoUrl: string
  lastMsgFetch: number
  authorId: string
  authorName: string
  users: [GroupChatUser]
}

export interface IChatItemProps {
  chat: [IChatItem]
}

interface IState {
  lastMessage: any
  unreadMessages: number
}

class ChatItem extends React.Component<
  IChatItemProps & NavigationInjectedProps,
  IState
> {
  constructor(props: IChatItemProps) {
    super(props)
    this.state = {
      lastMessage: {
        text: null,
        authorName: null,
        milliseconds: null,
      },
      unreadMessages: 0,
    }
  }

  componentWillMount = () => {
    this.lastMessage()
    this.unreadMessages()
  }

  unreadMessages = () => {
    const { chat, setCountUnreadMessages } = this.props
    const isGroupChat = chat.hasOwnProperty('chatId')
    if (isGroupChat) {
      database
        .ref(`users/${auth.currentUser.uid}`)
        .child(`groupChats/${chat.id}/lastMsgFetch`)
        .on('value', lastMsgFetchSnapshot => {
          let lastMsgFetch = lastMsgFetchSnapshot.val()
          this.setState({ unreadMessages: 0 }, () => {
            database
              .ref('groupChats')
              .child(`${chat.id}/messages`)
              //.limitToLast(100)
              .orderByChild('milliseconds')
              .startAt(lastMsgFetch)
              .on('value', messages => {
                const arrMsg = [0]
                messages.forEach(() => {
                  arrMsg[0] = arrMsg[0] + 1
                })
                setCountUnreadMessages(chat.id, arrMsg[0])
                this.setState({ unreadMessages: arrMsg[0] })
              })
          })
        })
    } else {
      database
        .ref(`users/${auth.currentUser.uid}`)
        .child(`friends/${chat.id}/lastMsgFetch`)
        .on('value', lastMsgFetchSnapshot => {
          let lastMsgFetch = lastMsgFetchSnapshot.val()
          this.setState({ unreadMessages: 0 }, () => {
            database
              .ref('users')
              .child(`${auth.currentUser.uid}/chats/${chat.id}`)
              //.limitToLast(100)
              .orderByChild('milliseconds')
              .startAt(lastMsgFetch)
              .on('value', messages => {
                const arrMsg = [0]
                messages.forEach(() => {
                  arrMsg[0] = arrMsg[0] + 1
                })
                setCountUnreadMessages(chat.id, arrMsg[0])
                this.setState({ unreadMessages: arrMsg[0] })
              })
          })
        })
    }
  }

  lastMessage = () => {
    const { chat } = this.props
    const isGroupChat = chat.hasOwnProperty('chatId')
    if (isGroupChat) {
      database
        .ref(`groupChats/${chat.id}/messages`)
        .limitToLast(1)
        .on('value', snapshotLastMessage => {
          snapshotLastMessage.forEach(snapshot => {
            const lastMessage = snapshot.val()
            if (lastMessage) this.setState({ lastMessage })
          })
        })
    } else {
      database
        .ref(`users/${auth.currentUser.uid}/chats/${chat.id}`)
        .limitToLast(1)
        .on('value', snapshotLastMessage => {
          snapshotLastMessage.forEach(snapshot => {
            const lastMessage = snapshot.val()
            if (lastMessage) this.setState({ lastMessage })
          })
        })
    }
  }

  render() {
    const { chat, navigation } = this.props    
    const { unreadMessages } = this.state
    const { authorName, text, milliseconds } = this.state.lastMessage
    const isGroupChat = chat.hasOwnProperty('chatId')
    const nav = isGroupChat ? 'GroupChat' : 'PrivateChat'
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(nav, { chatId: chat.id })}
      >
        <View style={styles.chatContainer}>
          <View style={styles.chatImage}>
            <Image style={styles.image} source={{ uri: chat.photoUrl }} />
          </View>
          <View style={styles.chatBody}>
            <Text style={styles.chatName}>{chat.displayName}</Text>
            {isGroupChat ? (
              <Text style={styles.chatName}>{authorName || null}</Text>
            ) : null}
            <Text numberOfLines={1} style={styles.chatText}>
              {text || 'Нет сообщений'}
            </Text>
          </View>
          <View style={styles.chatTimeUnreadMsg}>
            <Text style={styles.chatTime}>
              {moment(milliseconds).fromNow() || null}
            </Text>
            {unreadMessages ? (
              <Text style={styles.unreadMessages}>{unreadMessages}</Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  setCountUnreadMessages: (id: string, count: number) =>
    dispatch(setCountUnreadMessages(id, count)),
})

const mapStateToProps = (state: any) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatItem)
