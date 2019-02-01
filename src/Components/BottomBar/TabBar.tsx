import * as React from 'react'
import {
  View,
  Image,
  Text,
  ImageSourcePropType,
  ImagePropsBase,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { Friend, GroupChat } from '../../Interfaces'
import { PrimaryColor_dim, Red } from '../../Constants'
import { database, auth } from '../../firebase'
import { setCountUnreadMessages } from '../../Actions/notificationsBottomBar'

const TABS = {
  games: 'Games',
  tournaments: 'Tournaments',
  messages: 'Messages',
  profile: 'Profile',
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationTextContainer: {
    position: 'absolute',
    top: '12%',
    left: '55%',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    fontSize: 10,
    fontFamily: 'ProximaNova-Semibold',
    color: '#fff',
  },
  isActive: {
    width: '100%',
    height: 2,
    position: 'absolute',
    top: 0,
    backgroundColor: PrimaryColor_dim,
  },
})

export interface ITabBarComponentProps {
  routName: string
  src: ImageSourcePropType
  tintColor: ImagePropsBase
  focused: boolean
  friends: Array<Friend>
  groupChats: Array<GroupChat>
  notifications: object
  friendRequests: number
  setCountUnreadMessages: (id: string, arr: any) => void
}

class TabBarComponent extends React.Component<ITabBarComponentProps> {
  componentWillMount() {
    const { friends, setCountUnreadMessages, groupChats } = this.props    
    const { uid } = auth.currentUser    
    friends.forEach((friend: Friend) => {
      database
        .ref('users')
        .child(`${uid}/chats/${friend.id}`)
        .orderByChild('milliseconds')
        .startAt(friend.lastMsgFetch)
        .on('value', messages => {
          const arrMsg = [0]
          if (messages) {
            messages.forEach(() => {
              arrMsg[0] = arrMsg[0] + 1
            })
          }
          setCountUnreadMessages(friend.id, arrMsg[0])
        })
    })
    groupChats.forEach((groupChat: GroupChat) => {
      database
        .ref('groupChats')
        .child(`${groupChat.id}/messages`)
        .orderByChild('milliseconds')
        .startAt(groupChat.lastMsgFetch)
        .on('value', messages => {
          const arrMsg = [0]
          if (messages) {
            messages.forEach(() => {
              arrMsg[0] = arrMsg[0] + 1
            })
          }
          setCountUnreadMessages(groupChat.id, arrMsg[0])
        })
    })
  }

  notificationsCount = () => {
    const { routName, notifications, friendRequests } = this.props    
    let notificationsCount
    if (notifications) {
      switch (routName) {
        case TABS.games:
          notificationsCount = 0
          break
        case TABS.tournaments:
          notificationsCount = 0
          break
        case TABS.messages:
          notificationsCount = notifications
            .get('unreadMessages')
            .reduce((sum: number, value: number) => sum + value)
          break
        case TABS.profile:
          notificationsCount = friendRequests
          break
        default:
          return notificationsCount
      }
      if (notificationsCount) {
        return (
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>{notificationsCount}</Text>
          </View>
        )
      }
    }
    return null
  }

  render() {
    const { src, tintColor, focused } = this.props    
    return (
      <View style={styles.container}>
        <Image source={src} style={{tintColor: tintColor}} tintColor={tintColor} />
        {this.notificationsCount()}
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  setCountUnreadMessages: (id: string, count: any) =>
    dispatch(setCountUnreadMessages(id, count)),
})

const mapStateToProps = (state: any) => ({
  friends: state.friends.friends,
  notifications: state.notificationsBottomBar,
  friendRequests: state.friendRequests.length,
  groupChats: state.groupChats.chats
})

export default connect(mapStateToProps, mapDispatchToProps)(TabBarComponent)
