import * as React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#395aff',
    borderWidth: 2,
    borderRadius: 23,
    width:150
  },
  text: {
    color: '#395aff',
    fontSize: 18, 
    fontFamily:'Montserrat-Bold'
  },
})

export interface TransparentButtonProps {
  title: string
  style?: object
  marginHorizontal?: number
  onPress?: () => void
  fontStyle?:object
}

interface IState {}

export default class TransparentButton extends React.Component<
TransparentButtonProps,
  IState
> {
  render() {
    const { title, onPress, marginHorizontal, style, fontStyle } = this.props
    return (
      <TouchableOpacity activeOpacity={0.3} onPress={onPress}>
        <View
          style={[styles.container, style, { marginHorizontal: marginHorizontal }]}
        >
          <Text style={[styles.text, fontStyle]}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
