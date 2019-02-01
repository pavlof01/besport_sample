import React from 'react'
import {
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { FootballPlayer } from '../../../../Interfaces'
import { SecondaryColor } from '../../../../Constants'

const styles = StyleSheet.create({
  playersBtnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEEF0',
  },
  buttonsOfPlayersContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inviteBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 147,
    height: 31,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 6,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 37,
    borderBottomRightRadius: 44,
    backgroundColor: '#ffd500',
    elevation: 3,
  },
  inviteBtnText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  showPlayersBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 39,
    height: 32,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 37,
    borderBottomRightRadius: 44,
    backgroundColor: '#ffd500',
    elevation: 3,
  },
  showPlayersIcon: {
    transform: [{ rotate: '-90deg' }],
  },
  numPlayers: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SecondaryColor,
    borderColor: '#ffffff',
    borderWidth: 2,
    marginRight: -7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numPlayersText: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 15,
    marginBottom: 3,
  },
  listOfPlayersText: {
    fontFamily: 'ProximaNova-Regular',
    color: '#818181',
    fontSize: 12,
  },

  playersContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEEF0',
  },
  playerContainer: {},
  player: {
    alignItems: 'center',
  },
  playerNameContainer: {},
  playerName: {
    color: '#1f1f1f',
    fontFamily: 'ProximaNova-Semibold',
    fontSize: 12,
    fontWeight: '600',
  },
  playerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#ffffff',
    borderWidth: 2,
    marginRight: -7,
  },
  friendsFlatList: {
    paddingHorizontal: 15,
  },
})

export interface IPlayersProps {
  playersIn: [FootballPlayer]
  maxPlayers: number
  players: number
  openPlayerProfile: (id: string) => void
  inviteFriends: (value: boolean) => void
}

interface State {
  isPlayersShow: boolean
}

class Players extends React.Component<IPlayersProps, State> {
  constructor(props: IPlayersProps) {
    super(props)
    this.state = {
      isPlayersShow: false,
    }
  }

  renderPlayer = (player: FootballPlayer) => {
    const { openPlayerProfile } = this.props
    const { id, displayName, photoUrl } = player
    return (
      <TouchableOpacity
        key={player.id}
        onPress={() => openPlayerProfile(id)}
        style={styles.playerContainer}
      >
        <View style={styles.player}>
          <Image style={styles.playerAvatar} source={{ uri: photoUrl }} />
          <View style={styles.playerNameContainer}>
            <Text style={styles.playerName}>{displayName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderPlayerAvatars = (player: FootballPlayer) => {
    const { id, photoUrl } = player
    return (
      <View key={id} style={styles.player}>
        <Image style={styles.playerAvatar} source={{ uri: photoUrl }} />
      </View>
    )
  }

  keyExtractor = (friend: FootballPlayer) => `${friend.id}`

  render() {
    const { playersIn, players, maxPlayers, inviteFriends } = this.props
    return (
      <View>
        <View style={styles.playersBtnContainer}>
          {playersIn.map(player => this.renderPlayerAvatars(player))}
          <View style={styles.numPlayers}>
            <Text style={styles.numPlayersText}>+{maxPlayers - players}</Text>
          </View>
        </View>
        <View style={styles.buttonsOfPlayersContainer}>
          <TouchableOpacity onPress={() => inviteFriends(true)} style={styles.inviteBtn}>
            <Text style={styles.inviteBtnText}>Invite +</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={this.showPlayers}
            style={styles.showPlayersBtn}
          >
            <Animated.Image
              // style={[{ transform: [{ rotateZ: rotateArrow }] }]}
              source={require('../../../../../assets/icons/arrow_back.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.playersContainer,
            // isPlayersShow ? null : { display: 'none' },
          ]}
        >
          {/*<FlatList
            contentContainerStyle={styles.friendsFlatList}
            data={playersIn}
            extraData={this.props}
            renderItem={this.renderPlayer}
            keyExtractor={this.keyExtractor}
            horizontal={true}
            ItemSeparatorComponent={() => (
              <View style={{ paddingHorizontal: 10 }} />
            )}
            />*/}
          {playersIn.map(player => this.renderPlayer(player))}
        </View>
      </View>
    )
  }
}

export default Players
