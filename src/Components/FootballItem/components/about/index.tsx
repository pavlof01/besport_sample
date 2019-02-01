import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  bodyContainer: {
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEEF0',
    borderTopWidth: 1,
    borderTopColor: '#EDEEF0',
  },
  aboutGameContainer: {
    flexDirection: 'row',
  },
  aboutGameContainerRow: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  baseText: {
    fontFamily: 'ProximaNova-Regular',
  },
  centerRow: {
    borderLeftWidth: 1,
    borderLeftColor: '#EDEEF0',
    borderRightWidth: 1,
    borderRightColor: '#EDEEF0',
  },
})

export interface IAboutProps {
  duration: number
  numPlayers: number
  cost: number
}

const About = ({ duration, numPlayers, cost }: IAboutProps) => {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.aboutGameContainer}>
        <View style={styles.aboutGameContainerRow}>
          <Text style={styles.baseText}>{duration} ч.</Text>
        </View>
        <View style={[styles.aboutGameContainerRow, styles.centerRow]}>
          <Text style={styles.baseText}>
            {numPlayers}х{numPlayers}
          </Text>
        </View>
        <View style={styles.aboutGameContainerRow}>
          <Text style={styles.baseText}>{cost}руб.</Text>
        </View>
      </View>
    </View>
  )
}

export default About
