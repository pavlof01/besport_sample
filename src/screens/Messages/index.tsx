import * as React from 'react'
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment/min/moment-with-locales'
import { NavigationInjectedProps } from 'react-navigation'
import { auth, database } from '../../firebase'
import { Friend, GroupChat } from '../../Interfaces'
import Input from '../../Components/CreateGameTextInput'
import ChatItem from '../../Components/ChatItem'

moment.locale('ru')

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    flex: 1,
  },
  createChatContainer: {
    marginTop: 30,    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  createChatText: {
    marginRight: 10,
    fontFamily: 'Montserrat-Medium',
  },
  searchContainer: {
    marginVertical: 10,
    paddingVertical: 0,
    paddingHorizontal: 5,
  },
  searchContainerText: {
    fontSize: 12,
    marginLeft: 10,
    fontFamily: 'Montserrat-Light',
  },
  createChatIcon: {
    width: 15,
    height: 15,
  },
  searchIcon: {
    width: 12,
    height: 12,
  },
})

export interface IMessagesProps {
  groupChats: Array<GroupChat>
  friends: Array<Friend>
  
}

interface IState {
  loading: boolean
  chats: Array<Friend | GroupChat>
}

class Messages extends React.Component<
  IMessagesProps & NavigationInjectedProps,
  IState
> {
  constructor(props: IMessagesProps) {
    super(props)
    this.state = {      
      loading: false,
      chats: [...props.friends, ...props.groupChats]
    }
  }

  componentWillReceiveProps(nextProps: any){
    const { groupChats, friends } = this.props
    if (groupChats.length != nextProps.groupChats && nextProps.groupChats){
      this.setState({chats: [...friends, ...nextProps.groupChats]})
    }
  }

  filterChats = (chatName: string) => {    
    const chatNameLowCase = chatName.toLowerCase()
    const chats = [...this.props.friends, ...this.props.groupChats]
    const filteredChatsList = chats.filter((chat: any) =>
      chat.displayName.toLowerCase().match(chatNameLowCase)
    )    
    if (!chatNameLowCase || chatNameLowCase === '') {
      this.setState({ chats: [...this.props.friends, ...this.props.groupChats] })
    } else {
      this.setState({
        chats: filteredChatsList,
      })
    }
  }

  renderChat = (chat: Array<Friend | GroupChat>) => {
    const { navigation } = this.props
    const { item } = chat
    return <ChatItem navigation={navigation} chat={item} />
  }

  keyExtractor = (chat: any) => chat.id

  render() {
    const { navigation } = this.props    
    const { chats } = this.state 
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateGroupChat')}>
          <View style={styles.createChatContainer}>
            <Text style={styles.createChatText}>Создать чат</Text>
            <Image style={styles.createChatIcon} source={require('../../../assets/icons/createChat.png')}/>
          </View>
        </TouchableOpacity>
        <Input
          icon={<Image style={styles.searchIcon} source={require('../../../assets/icons/search.png')}/>}
          placeholder="Search friend"
          style={styles.searchContainer}
          fontStyle={styles.searchContainerText}
          onChangeText={chatName => this.filterChats(chatName)}
        />
        <FlatList
          data={chats}
          extraData={this.props}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderChat}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state: any) => ({
  friends: state.friends.friends,
  groupChats: state.groupChats.chats,
})

export default connect(mapStateToProps, null)(Messages)
