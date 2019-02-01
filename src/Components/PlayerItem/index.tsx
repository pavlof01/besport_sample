import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import { uid } from '../../firebase'
import { FootballPlayer } from '../../Interfaces'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  friendInvitedContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendInvitedBody: {},
  friendInvitedName: {
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    paddingTop: 5,
    textAlign: 'center',
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
})

export interface IPlayerCardProps {
  data: FootballPlayer
}

class PlayerCard extends Component<IPlayerCardProps & NavigationInjectedProps> {
  openPlayerProfile = (id: string | number) => {
    const { navigation } = this.props
    if (id === uid) {
      return navigation.navigate('Profile')
    }
    navigation.navigate('User', {
      uid: id,
      firstRoute: navigation.state.routeName,
      navigationStory: [],
    })
  }
  render() {
    const { data } = this.props
    const splitAuthorName = data.displayName.split(' ')
    return (
      <TouchableOpacity
        onPress={() => this.openPlayerProfile(data.id)}
        style={styles.container}
      >
        <View style={styles.friendInvitedContainer}>
          <View>
            <Image style={styles.friendImage} source={{ uri: data.photoUrl }} />
          </View>
          <View style={styles.friendInvitedBody}>
            <Text style={styles.friendInvitedName}>{splitAuthorName[0]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(PlayerCard)
