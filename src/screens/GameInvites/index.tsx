import React, { Component } from 'react'
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { connect } from 'react-redux'
import Header from '../../Components/Header'
import FootballInvite from '../../Components/FootballInvite'
import { FootballGame } from '../../Interfaces'

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#fff',
    flex: 1,
  },
  noGamesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  flatList: {
    marginHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 60,
  },
})

class GameInvites extends Component<NavigationInjectedProps> {
  renderInviteItem = ({ item }: ListRenderItemInfo<any>) => (
    <FootballInvite data={item} />
  )

  keyExtractor = (invite: FootballGame) => invite.id

  render() {
    const { navigation, footballInvites, footballGames } = this.props
    const invites = footballGames.filter((game: any) =>
      footballInvites.includes(game.id)
    )
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Header title="Приглашения" onPressLeft={() => navigation.goBack()} />
        <View>
          <FlatList
            contentContainerStyle={styles.flatList}
            data={invites}
            extraData={[this.props]}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderInviteItem}
            ListEmptyComponent={
              <Text style={styles.noGamesTitle}>Нет приглашений</Text>
            }
          />
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state: any) => ({
  /**
   * bad practice to use toJS at mSTP
   * TODO:! rebuild
   */
  footballInvites: state.footballInvites.get('invites').toJS(),
  footballGames: state.football.get('games').toJS(),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(GameInvites)
