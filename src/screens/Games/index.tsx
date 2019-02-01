import * as React from 'react'
import { Tab, Tabs, ScrollableTab } from 'native-base'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Platform,
} from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import Football from './Sports/Football'
import CreateGameButton from '../../Components/CreateGameButton'
import { Red } from '../../Constants'

const isAndroid = Platform.OS === 'android'

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 45,
    marginTop: isAndroid ? 0 : 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 22,
    fontFamily: 'Montserrat-ExtraBold',
  },
  tabStyle: {
    backgroundColor: '#fff',
  },
  tabTextStyle: {
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    fontWeight: '600',
  },
  activeTabTextStyle: {
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    fontWeight: '600',
  },
  icon: {
    width: 18,
    height: 18,
  },
  createGameButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  left: {
    paddingHorizontal: 20,
  },
  titleContainer: {
    flex: 1,
  },
  right: {
    paddingHorizontal: 20,
  },
  notificationTextContainer: {
    position: 'absolute',
    top: 0,
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
})

export interface GamesProps {}

interface State {}

class Games extends React.Component<
  GamesProps & NavigationInjectedProps,
  State
> {
  render() {
    const { navigation, footballInvitesCount } = this.props
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.left}
            onPress={() => console.warn('filter')}
          >
            <Image
              style={styles.icon}
              source={require('../../../assets/icons/filter.png')}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Игры</Text>
          </View>
          <TouchableOpacity
            style={styles.right}
            onPress={() => navigation.navigate('GameInvites')}
          >
            <View>
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/notification.png')}
              />
              {footballInvitesCount ? (
                <View style={styles.notificationTextContainer}>
                  <Text style={styles.notificationText}>
                    {footballInvitesCount}
                  </Text>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
        <Tabs
          tabContainerStyle={{ marginBottom: 50 }}
          tabBarUnderlineStyle={{ backgroundColor: '#ffd500' }}
          tabBarBackgroundColor="#fff"
          renderTabBar={() => <ScrollableTab />}
        >
          <Tab
            heading="Футбол"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.tabStyle}
            textStyle={styles.tabTextStyle}
            activeTextStyle={styles.activeTabTextStyle}
          >
            <Football navigation={navigation} />
          </Tab>
          <Tab
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.tabStyle}
            textStyle={styles.tabTextStyle}
            activeTextStyle={styles.activeTabTextStyle}
            heading="Баскетбол"
          >
            <Text>Баскетбол</Text>
          </Tab>
          <Tab
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.tabStyle}
            textStyle={styles.tabTextStyle}
            activeTextStyle={styles.activeTabTextStyle}
            heading="Волейбол"
          >
            <Text>Волейбол</Text>
          </Tab>
          <Tab
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.tabStyle}
            textStyle={styles.tabTextStyle}
            activeTextStyle={styles.activeTabTextStyle}
            heading="Теннис"
          >
            <Text>Теннис</Text>
          </Tab>
        </Tabs>
        <View style={styles.createGameButton}>
          <CreateGameButton
            onPress={() => navigation.navigate('CreateFootballGame')}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state: any) => ({
  footballInvitesCount: state.footballInvites.get('invites').size,
})

export default connect(mapStateToProps, null)(Games)
