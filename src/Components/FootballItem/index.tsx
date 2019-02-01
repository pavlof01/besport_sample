import * as React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Dimensions, Alert } from 'react-native'
import moment from 'moment'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { play, exitGame, deleteGame } from '../../Actions/football'
import { database, auth, SERVER_TIMESTAMP } from '../../firebase'
import { Friend, FootballPlayer, FootballGame } from '../../Interfaces'
import OwnerSection from './components/top'
import About from './components/about'
import Players from './components/players'
import BottomAboutGame from './components/bottom'
import InviteFriendsModal from './components/InviteFriendsModal'
import Friends from '../../screens/Profile/Friends'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },

  icon: {
    width: 18,
    height: 18,
    marginRight: 7,
  },
})

export interface FootballItemProps {
  navigation: NavigationScreenProp<NavigationState>
  id: number
  friends: [Friend]
  playersIn: [FootballPlayer]
  game: FootballGame
  play: (gameId: string) => void
  exitGame: (gameId: string) => void
}

interface IState {
  isVisibleModalInviteFriends: boolean
}

class FootballItem extends React.Component<FootballItemProps & IState> {
  constructor(props: FootballItemProps) {
    super(props)
    this.state = { isVisibleModalInviteFriends: false }
  }

  formatDate = (date: Date) =>
    moment(date).calendar(SERVER_TIMESTAMP, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY',
    })

  checkMeInGame = () => {
    const { playersIn } = this.props
    let inGame
    playersIn.forEach(player => {
      //@ts-ignore
      player.id === auth.currentUser.uid ? (inGame = true) : false
    })
    return inGame
  }

  deleteGame = () => {
    const { gameId } = this.props
    Alert.alert(
      'Вы уверены что хотите удалить игру?',
      'Нельзя будет восстановить',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deleteGame(gameId) },
      ],
      { cancelable: true }
    )
  }

  openPlayerProfile = (id: string | number) => {
    const { navigation } = this.props
    if (id === auth.currentUser.uid) {
      return navigation.navigate('Profile')
    }
    navigation.navigate('User', {
      uid: id,
      firstRoute: navigation.state.routeName,
      navigationStory: [],
    })
  }

  sendInvitesToTheGame = (invitedFriends: [Friend]) => {
    const { game } = this.props
    invitedFriends.forEach((friend: Friend) => {
      database
        .ref('users')
        .child(friend.id)
        .child('footballInvites')
        .child(game.id)
        .set(game.id)
    })
  }

  showModalInviteFriends = (value: boolean) =>
    this.setState({ isVisibleModalInviteFriends: value })

  render() {
    const { isVisibleModalInviteFriends } = this.state
    const { playersIn } = this.props
    const {
      id,
      author,
      photoOfAuthor,
      authorID,
      duration,
      maxPlayers,
      players,
      cost,
      date,
      place,
      onlyForFriends,
      adress,
    } = this.props.game
    const numPlayers = maxPlayers / 2
    return (
      <View style={styles.container}>
        <OwnerSection
          author={author}
          // есть ли смысл отправлять auth
          currentUserId={auth.currentUser.uid}
          authorID={authorID}
          gameId={id}
          photoOfAuthor={photoOfAuthor}
          play={play}
          exitGame={exitGame}
          deleteGame={this.deleteGame}
          openPlayerProfile={this.openPlayerProfile}
          checkMeInGame={this.checkMeInGame}
        />
        <About duration={duration} numPlayers={numPlayers} cost={cost} />
        <Players
          playersIn={playersIn}
          maxPlayers={maxPlayers}
          players={playersIn.length}
          openPlayerProfile={this.openPlayerProfile}
          inviteFriends={this.showModalInviteFriends}
        />
        <BottomAboutGame place={place} adress={adress} date={date} />
        <InviteFriendsModal
          toggleModal={this.showModalInviteFriends}
          isVisible={isVisibleModalInviteFriends}
          sendInvitesToTheGame={this.sendInvitesToTheGame}
        />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  // play: (gameId: string) => dispatch(play(gameId)),
  // exitGame: (gameId: string) => dispatch(exitGame(gameId)),
})

export default connect(null, mapDispatchToProps)(FootballItem)
