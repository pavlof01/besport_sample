import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import PlayButton from '../../../Buttons/PlayButton'
import DeleteGameButton from '../../../Buttons/TransparentButton'

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'ProximaNova-Regular',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  authorContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'ProximaNova-Regular',
    color: '#818181',
    fontSize: 12,
    marginLeft: 6,
    marginTop: 4,
    textAlignVertical: 'center',
  },
  deleteGameBtnText: {
    fontSize: 9,
    color: 'red',
    fontFamily: 'Montserrat-Light',
  },
  deleteGameBtn: {
    height: 20,
    width: 75,
    borderColor: 'red',
    borderWidth: 1,
    marginLeft: 15,
  },
})

export interface IOwnerSectionProps {
  author: string
  authorID: string
  photoOfAuthor: string
  currentUserId: string
  gameId: string
  play: (gameId: string) => void
  exitGame: (gameId: string) => void
  openPlayerProfile: (authorID: string) => void
  checkMeInGame: () => boolean
  deleteGame: () => void
}

const OwnerSection = ({
  author,
  authorID,
  photoOfAuthor,
  currentUserId,
  play,
  exitGame,
  openPlayerProfile,
  checkMeInGame,
  deleteGame,
  gameId,
}: IOwnerSectionProps) => {
  return (
    <View style={styles.topContainer}>
      <View style={styles.authorContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => openPlayerProfile(authorID)}>
            <Image style={styles.authorImage} source={{ uri: photoOfAuthor }} />
          </TouchableOpacity>
          <View>
            <Text style={styles.baseText}>{author}</Text>
            <View style={styles.authorInfoContainer}>
              <Image
                source={require('../../../../../assets/icons/rating.png')}
              />
              <Text style={styles.ratingText}>4.8</Text>
              {currentUserId === authorID ? (
                <DeleteGameButton
                  onPress={deleteGame}
                  fontStyle={styles.deleteGameBtnText}
                  style={styles.deleteGameBtn}
                  title="Delete game"
                />
              ) : null}
            </View>
          </View>
        </View>
        <PlayButton
          onPress={
            checkMeInGame() ? () => exitGame(gameId) : () => play(gameId)
          }
          title={checkMeInGame() ? 'Отмена' : 'Играть'}
          backgroundColor={checkMeInGame() ? '#d36d6e' : '#11c486'}
        />
      </View>
    </View>
  )
}

export default OwnerSection
