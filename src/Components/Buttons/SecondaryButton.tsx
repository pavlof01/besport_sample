import * as React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    shadowOffset: { width: 3, height: 0 },
  },
  text: {
    color: '#173eff',
    fontSize: 14,    
    fontFamily:'Montserrat-Bold'
  },
})

export interface SecondaryButtonProps {
  title: string
  style?: object
  fontStyle?: object
  marginHorizontal?: number
  onPress?: () => void
}

interface State {}

export default class SecondaryButton extends React.Component<
  SecondaryButtonProps,
  State
> {
  render() {
    const { title, onPress, marginHorizontal, style, fontStyle } = this.props
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <View
          style={[styles.container, style, { marginHorizontal: marginHorizontal }]}
        >
          <Text style={[styles.text, fontStyle]}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
