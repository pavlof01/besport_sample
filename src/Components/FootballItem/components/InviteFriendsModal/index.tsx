import * as React from 'react'
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native'
import InviteFriends from '../../../InviteFriends'
import { Friend } from '../../../../Interfaces'
import Header from '../../../Header'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    width,
    height,
    flex: 1,
  },
})

export interface IInviteFriendsModalProps {
  isVisible: boolean
  toggleModal: (value: boolean) => void
  sendInvitesToTheGame: (invitedFriends: Friend) => void
}

interface IState {
  isVisible: boolean
}

class InviteFriendsModal extends React.Component<
  IInviteFriendsModalProps,
  IState
> {
  render() {
    const { isVisible, toggleModal, sendInvitesToTheGame } = this.props
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.container}>
          <Header title="Пригласить друзей" />
          <View style={styles.main}>
            <InviteFriends
              buttonTitle="Пригласить"
              onButtonPress={sendInvitesToTheGame}
              onCancel={() => toggleModal(false)}
            />
          </View>
        </View>
      </Modal>
    )
  }
}

export default InviteFriendsModal
