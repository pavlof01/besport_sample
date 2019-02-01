import * as React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  checkBoxContainer: {
    width: 30,
    height: 30,
    borderRadius: 2,
    backgroundColor: '#ffd500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  title: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  subTitle: {
    color: '#000000',
    fontSize: 10,
    fontFamily: 'Montserrat-Light',
  },
})

export interface ICheckboxProps {
  onPress?: () => void
  onlyForFriends:boolean
}

interface State {}

export default class Checkbox extends React.Component<
ICheckboxProps,
  State
> {
  render() {
    const { onPress, onlyForFriends } = this.props
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.checkBoxContainer}>
            {onlyForFriends ? (<Image source={require('../../../assets/icons/Checkbox.png')} />):null}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.subTitle}>
              After you can easily change this
            </Text>
            <Text style={styles.title}>Only for my friends</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
