import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  bottomContainer: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointContainer: {
    borderColor: '#cfcbe2',
    borderWidth: 1,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2b224c',
  },
  rowItem: {
    marginLeft: 20,
  },
  titleOfInfoGame: {
    fontFamily: 'ProximaNova-Regular',
    color: '#818181',
    fontSize: 12,
  },
  pointAboutGame: {
    fontFamily: 'ProximaNova-Semibold',
    fontSize: 15,
    color: '#1f1f1f',
    fontWeight: '600',
  },
  separatorBetweenPoints: {
    height: 23,
    width: 1,
    backgroundColor: '#cfcbe2',
    marginLeft: 7,
    marginVertical: -5,
  },
})

export interface IBottomSectionProps {
  place: string
  adress: string
  date: string
}

const BottomSection = ({ place, adress, date }: IBottomSectionProps) => {
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.row}>
        <View style={styles.pointContainer}>
          <View style={styles.point} />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.titleOfInfoGame}>Площадка</Text>
          <Text style={styles.pointAboutGame}>{place}</Text>
        </View>
      </View>
      <View style={styles.separatorBetweenPoints} />
      <View style={styles.row}>
        <View style={styles.pointContainer}>
          <View style={styles.point} />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.titleOfInfoGame}>Адрес</Text>
          <Text style={styles.pointAboutGame}>{adress}</Text>
        </View>
      </View>
      <View style={styles.separatorBetweenPoints} />
      <View style={styles.row}>
        <View style={styles.pointContainer}>
          <View style={styles.point} />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.titleOfInfoGame}>Дата/время</Text>
          <Text style={styles.pointAboutGame}>{date}</Text>
        </View>
      </View>
    </View>
  )
}

export default BottomSection
