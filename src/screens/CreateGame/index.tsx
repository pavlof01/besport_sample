import * as React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { NavigationInjectedProps } from 'react-navigation'
import moment from 'moment/min/moment-with-locales.min'
import { FootballGamePlace } from '../../Interfaces'
import Header from '../../Components/Header'
import Input from '../../Components/CreateGameTextInput'
import DurationPicker from '../../Components/GameDurationPicker'
import PeoplesPicker from '../../Components/PickerGameType'
import OnlyForFriendsCheckbox from '../../Components/OnlyForFriendsCheckBox'
import ModalSelectGamePlace from '../../Components/ModalSelectPlaceFootballGame'
import TransparentButton from '../../Components/Buttons/TransparentButton'

const isAndroid = Platform.OS === 'android'

moment.locale('ru')

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {},
  title: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  form: {
    marginHorizontal: 16,
  },
  nextBtnContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const mapStyles = StyleSheet.create({
  mapContainer: {
    height: 300,
  },
  map: {
    width: '100%',
    height: 300,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    marginBottom: 5,
  },
  title: {
    fontSize: 12,
    color: '#707070',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
})

export interface ICreateGameProps {
  footballPlaces: Array<FootballGamePlace>
}

interface IState {
  date: string
  cost: number | null
  gameType: string | null
  place: any
  adress: string
  duration: number | null
  onlyForFriends: boolean
  showModalSelectPlace: boolean
  isDateTimePickerVisible: boolean
  dateToBase: any
}

class CreateGame extends React.Component<
  ICreateGameProps & NavigationInjectedProps,
  IState
> {
  constructor(props: ICreateGameProps) {
    super(props)
    this.state = {
      date: '',
      dateToBase: '',
      cost: null,
      gameType: null,
      place: {},
      adress: '',
      duration: null,
      onlyForFriends: false,
      isDateTimePickerVisible: false,
      showModalSelectPlace: false,
    }
  }

  setVisibleSelectGamePlace = (visible: boolean) =>
    this.setState({ showModalSelectPlace: visible })

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  handleDatePicked = (date: any) => {
    this.setState({ date: moment(date).format('llll'), dateToBase: date })
    this.hideDateTimePicker()
  }

  onChangeGameTypePicker = (gameType: string) => this.setState({ gameType })

  onChangeGameCostPerPeople = (cost: number) => this.setState({ cost })

  setOnlyForFriends = () =>
    this.setState({ onlyForFriends: !this.state.onlyForFriends })

  setPlace = (place: any) => this.setState({ place })

  setGameDuration = (duration: number) => this.setState({ duration })

  goNext = () => {
    const { date, cost, gameType, place, duration, onlyForFriends } = this.state
    const placeAdress = place.adress
    const placeName = place.name
    //TODO: REFACTORING
    if (!date) {
      alert('Enter date')
    } else if (!cost) {
      alert('Enter cost')
    } else if (!gameType) {
      alert('Enter gameType')
    } else if (!placeAdress) {
      alert('Choose place')
    } else if (!duration) {
      alert('Choose duration')
    } else {
      //------------------
      this.props.navigation.navigate('InviteFriends', {
        date,
        cost,
        gameType,
        duration,
        onlyForFriends,
        placeAdress,
        placeName,
      })
    }
  }

  render() {
    const { footballPlaces, navigation } = this.props
    const {
      date,
      gameType,
      isDateTimePickerVisible,
      onlyForFriends,
      showModalSelectPlace,
      place,
      duration,
    } = this.state
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Header
          onPressLeft={() => navigation.goBack()}
          fontStyle={styles.title}
          title="Create football game"
        />
        <ModalSelectGamePlace
          onPress={this.setVisibleSelectGamePlace}
          visible={showModalSelectPlace}
          places={footballPlaces}
          setPlace={this.setPlace}
          selectedPlace={place}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.form}>
            <Input
              icon={<Image source={require('../../../assets/icons/pin.png')} />}
              placeholder="Place"
              isLetShowKeyboard="none"
              onPress={() => this.setVisibleSelectGamePlace(true)}
              value={place.name}
            />
            <Input
              icon={
                <Image source={require('../../../assets/icons/calendar.png')} />
              }
              placeholder="Date"
              value={date}
              onPress={this.showDateTimePicker}
              isLetShowKeyboard="none"
            />
            <DateTimePicker
              isVisible={isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              mode="datetime"
              minuteInterval={10}
              cancelTextIOS="Отмена"
              confirmTextIOS="Выбрать"
              titleIOS="Выберите дату и время"
            />
            <PeoplesPicker
              gameType={gameType}
              onChange={this.onChangeGameTypePicker}
            />
            <Input
              icon={<Image source={require('../../../assets/icons/rub.png')} />}
              placeholder="Cost per people"
              onChangeText={this.onChangeGameCostPerPeople}
              keyboardType="numeric"
              returnKeyType="done"
              activeOpacity={1}
            />
            <DurationPicker
              duration={duration}
              onPress={this.setGameDuration}
              title="Duration"
            />
            <OnlyForFriendsCheckbox
              onPress={this.setOnlyForFriends}
              onlyForFriends={onlyForFriends}
            />
          </View>
          <View style={mapStyles.mapContainer}>
            <MapView
              provider={isAndroid ? PROVIDER_GOOGLE : null}
              style={mapStyles.map}
              region={{
                latitude: place.name ? place.latitude : 55.015829,
                longitude: place.name ? place.longitude : 82.901126,
                latitudeDelta: place.name ? 0.0035 : 0.15,
                longitudeDelta: place.name ? 0.0035 : 0.15,
              }}
            >
              {place.name ? (
                <Marker
                  coordinate={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }}
                >
                  <View style={mapStyles.markerContainer}>
                    <View style={mapStyles.marker}>
                      <Text style={mapStyles.title}>{place.name}</Text>
                      <Text style={mapStyles.subTitle}>{place.adress}</Text>
                    </View>
                    <Image source={require('../../../assets/icons/pin.png')} />
                  </View>
                </Marker>
              ) : null}
            </MapView>
            <View style={styles.nextBtnContainer}>
              <TransparentButton onPress={this.goNext} title="Next" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state: any) => ({
  footballPlaces: state.footballPlaces.places,
})

const mapDispatchToProps = (dispatch: any) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
