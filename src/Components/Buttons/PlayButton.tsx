import * as React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 30,
    borderRadius: 16,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    fontWeight: '700',
  },
})

export interface PlayButtonProps {
  title: string
  backgroundColor?: string;
  onPress?: () => void;
}

interface State {}

export default class PlayButton extends React.Component<
  PlayButtonProps,
  State
> {
  render() {
    const { title, backgroundColor, onPress } = this.props
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <View style={[styles.container, { backgroundColor }]}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
