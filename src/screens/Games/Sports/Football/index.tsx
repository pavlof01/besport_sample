import * as React from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationInjectedProps } from 'react-navigation'
import { loadFootballGames } from '../../../../Actions/football'
import { loadFootballInvites } from '../../../../Actions/footballInvites'
import FootballItem from '../../../../Components/FootballItem'
import { Friend, FootballGame } from '../../../../Interfaces'

const styles = StyleSheet.create({
  activityIndicator: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  flatList: {
    marginTop: 10,
    backgroundColor: '#f5f5f5',
  },
  noGamesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
})

export interface FootballProps {
  games: [FootballGame]
  friends: [Friend]
  loadGames: () => void
  loading: boolean
}

class Football extends React.Component<
  FootballProps & NavigationInjectedProps
> {
  componentWillMount = () => {
    const { loadGames, loadFootballInvites } = this.props
    loadFootballInvites()
    loadGames()
  }

  renderFootballGameItem = ({ item }: ListRenderItemInfo<FootballGame>) => {
    const { friends, navigation } = this.props
    return (
      //@ts-ignore
      <FootballItem
        friends={friends}
        game={item}
        playersIn={Object.values(item.playersIn || {})}
        navigation={navigation}
      />
    );
  }

  gameId = (game: FootballGame) => `${game.id}`

  render() {
    const { games, loading } = this.props
    if (loading) {
      return <ActivityIndicator size="large" style={styles.activityIndicator} />
    }
    return (
      <FlatList
        contentContainerStyle={styles.flatList}
        data={games}
        extraData={[this.props]}
        keyExtractor={this.gameId}
        renderItem={this.renderFootballGameItem}
        ListEmptyComponent={<Text style={styles.noGamesTitle}>Нет игр</Text>}
      />
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadGames: () => dispatch(loadFootballGames()),
  loadFootballInvites: () => dispatch(loadFootballInvites())
})

const mapStateToProps = (state: any) => ({
  loading: state.football.get('loading'),
  games: state.football.get('games').toJS(),
  friends: state.friends.friends,
})

export default connect(mapStateToProps, mapDispatchToProps)(Football)
