import * as React from 'react'
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
    backgroundColor: '#0199ca',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'rgb(0, 0, 0)',
    shadowRadius: 6,
    shadowOpacity: .5,
  },
  image: {},
})

export interface CreateGameButtonProps {  
  onPress?: () => void
}

export default class CreateGameButton extends React.Component<
  CreateGameButtonProps
> {
  render() {
    const { onPress } = this.props
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../../assets/icons/plus.png')}
          />
        </View>
      </TouchableOpacity>
    )
  }
}
