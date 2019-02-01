import * as React from "react";
import { connect } from "react-redux";
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { NavigationInjectedProps } from 'react-navigation'
import { auth } from '../../firebase'
import { Friend } from '../../Interfaces'
import {
  deleteFriendData,
  acceptFriendRequest,
  sendFriendRequest,
  rejectFriendRequest,
  loadFriends
} from "../../Actions/friends";
import { loadUserInfo } from '../../Actions/currentWatchingUser'
import UserStatistic from "../Profile/UserStatistic";
import MainUserInfo from "../Profile/MainUserInfo";
import Separator from '../../Components/Separator'
import Header from '../../Components/Header'
import SecondaryButton from '../../Components/Buttons/SecondaryButton'
import PrimaryButton from '../../Components/Buttons/PrimaryButton'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  rightSection: {
    paddingRight: 0,
    paddingLeft: 10
  },
  title: {
    fontSize: 20,
    color: '#202030',
    fontFamily: 'Montserrat-Medium',
  },
  friendsAndSearchTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  friendsFlatList: {
    flex: 1,
    paddingHorizontal: 15
  },
  friendPhoto: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  friendName: {
    fontSize: 11,
    color: '#4b4b5a',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center'
  },
});

const userInfo = StyleSheet.create({
  container: {
    width,
    flexDirection: 'row',
    alignItems: "center",
    paddingHorizontal: 15,
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfoContainer: {
    flex: 1,
    marginLeft: 20
  },
  userName: {
    fontSize: Math.round(height / 40),
    fontFamily: 'Montserrat-Bold',
    color: '#202030',
  },
  userExperience: {
    fontSize: Math.round(height / 43),
    fontFamily: 'Montserrat-SemiBold',
    color: '#4b4b5a',
  },
  userRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userRating: {
    marginLeft: 10,
    fontSize: Math.round(height / 45),
    fontFamily: 'Montserrat-Medium',
    color: '#4b4b5a',
  },
  userActionsBtn: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row'
  },
  addFriendBtn: {
    paddingHorizontal: 15,
    height: 25,
    marginRight: 10
  },
  addFriendBtnText: {

  },
  messageBtn: {
    paddingHorizontal: 15,
    backgroundColor: '#ECEEF4',
    height: 25,
  },
  messageBtnText: {
    fontFamily: 'Montserrat-Light'
  },
});
export interface IUserProps {
  deleteFriend: (friendId: string) => void,
  sendFriendRequest: (friend: Friend) => void,
  acceptFriendRequest: (friend: Friend) => void,
  rejectFriendRequest: (friendId: string) => void,
  loading: boolean
  friendRequests: Array<Friend>
  friends: Array<Friend>
}
interface IState {

}
class User extends React.Component<IUserProps & NavigationInjectedProps, IState> {
  constructor(props: IUserProps) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    const { loadUserInfo } = this.props
    const { uid } = this.props.navigation.state.params    
    loadUserInfo(uid)    
  }

  onRefresh = () => {
    const { refreshFriendList } = this.props;
    refreshFriendList();
  };

  // TODO: this func go to utils
  openPlayerProfile = (
    id: string,
    displayName: string,
    photoUrl: string
  ) => {
    const { navigation } = this.props
    if (auth.currentUser.uid === id){
      return navigation.navigate('Profile')
    }
    const { uid, navigationStory, firstRoute } = this.props.navigation.state.params    
    navigationStory.push(uid)
    navigation.push('User', {
      uid: id,
      displayName,
      photoUrl: photoUrl,
      navigationStory,
      firstRoute
    })
  }

  goBack = () => {
    const { navigation } = this.props
    const { navigationStory, firstRoute } = this.props.navigation.state.params    
    if (navigationStory.length){
      const lastIndex = navigationStory.pop()       
      navigation.replace({routeName: 'User', params:{ uid:lastIndex, navigationStory, firstRoute} })      
    }else{      
      navigation.navigate(firstRoute)
    }    
  }

  renderFriendItem = (friend: Friend) => {
    const { item } = friend
    return (
      <TouchableOpacity onPress={() => this.openPlayerProfile(item.id, item.displayName, item.photoUrl)}>
        <View>
          <Image style={styles.friendPhoto} source={{ uri: item.photoUrl }} />
          <Text style={styles.friendName}>{item.displayName}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderMessageButton = () => {
    const {
      user,
      friends,
      navigation
    } = this.props;
    const isFriend = friends.find((friend: Friend) => friend.id === user.id);
    if (isFriend) {
      return <SecondaryButton
        fontStyle={userInfo.messageBtnText}
        style={userInfo.messageBtn}
        title='Message'
        onPress={() => navigation.navigate('PrivateChat', { chatId: user.id })}
      />
    }
  }

  userAction = () => {
    const {
      user,
      friendRequests,
      friends,
      sendFriendRequest,
      acceptFriendRequest,
      rejectFriendRequest,
      deleteFriend,
    } = this.props;
    const isFriend = friends.find((friend: Friend) => friend.id === user.id);
    const isSendRequsetForFriend = friendRequests.find((request: any) => request.id === user.id)
    if (isFriend) {
      return <PrimaryButton
        fontStyle={userInfo.addFriendBtnText}
        style={[userInfo.addFriendBtn, { backgroundColor: '#d36d6e' }]}
        title='Delete'
        onPress={() => deleteFriend(user)}
      />
    } else if (isSendRequsetForFriend) {
      return <PrimaryButton
        fontStyle={userInfo.addFriendBtnText}
        style={[userInfo.addFriendBtn, { backgroundColor: '#11c486' }]}
        title='Submit'
        onPress={() => acceptFriendRequest(user)}
      />
    } else {
      return <PrimaryButton
        fontStyle={userInfo.addFriendBtnText}
        style={userInfo.addFriendBtn}
        title='Add'
        onPress={() => sendFriendRequest(user)}
      />
    }
  }

  keyExtractor = (friend: Friend) => `${friend.lastMsgFetch}`

  render() {
    const {
      user,
      loadingUserData,
      navigation
    } = this.props;
    if (loadingUserData) {
      return <Text>Loading</Text>
    }    
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Header onPressLeft={this.goBack} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loadingUserData} onRefresh={this.onRefresh} />
          }
        >
          <View style={userInfo.container}>
            <View>
              <Image style={userInfo.userPhoto} source={{ uri: user.photoUrl }} />
            </View>
            <View style={userInfo.userInfoContainer}>
              <Text style={userInfo.userName}>
                {user.displayName}
              </Text>
              <Text style={userInfo.userExperience}>Experienced</Text>
              <View style={userInfo.userRatingContainer}>
                <Image source={require('../../../assets/icons/rating.png')} />
                <Text style={userInfo.userRating}>4.8</Text>
              </View>
              <View style={userInfo.userActionsBtn}>
                {this.userAction()}
                {this.renderMessageButton()}
              </View>
            </View>
          </View>
          <Separator marginVertical={10} />
          <UserStatistic />
          <Separator marginVertical={10} />
          <View style={styles.friendsAndSearchTextContainer}>
            <TouchableOpacity /*onPress={() => navigation.navigate('Friends')}*/>
              <Text style={styles.title}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SearchFriends')}>
              <Image source={require('../../../assets/icons/search.png')} />
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={styles.friendsFlatList}
            data={user.friends}
            extraData={this.props}
            renderItem={this.renderFriendItem}
            keyExtractor={this.keyExtractor}
            horizontal={true}
            ListEmptyComponent={<Text>No friends</Text>}
            ItemSeparatorComponent={() => <View style={{ paddingHorizontal: 10 }} />}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadUserInfo: (userId: string) => dispatch(loadUserInfo(userId)),
  deleteFriend: (friendId: string) => dispatch(deleteFriendData(friendId)),
  acceptFriendRequest: (friend: Friend) => dispatch(acceptFriendRequest(friend)),
  sendFriendRequest: (friend: Friend) => dispatch(sendFriendRequest(friend)),
  rejectFriendRequest: (friendId: string) => dispatch(rejectFriendRequest(friendId)),
  refreshFriendList: () => dispatch(loadFriends())
});

const mapStateToProps = (state: any) => ({
  friends: state.friends.friends,
  friendRequests: state.friendRequests,
  loading: state.friends.loading,
  user: state.currentWatchingUser.user,
  loadingUserData: state.currentWatchingUser.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
