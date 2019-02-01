import  * as React from 'react'
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00CFFF',
  },
  backgroundImage: {
    flex: 1,
  },
  title: {
    fontSize: 52,
    fontWeight: '700',
    color: '#ffd500',
  },
  subTitle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
  },
})

export interface ISplashScreenProps{
  onLoad?:() => void
}

class SplashScreen extends React.Component<ISplashScreenProps> {
  render() {
    const { onLoad } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../../../img/backgroundImage.jpg')}
          onLoad={onLoad}
        >
          <View style={{ top: '40%' }}>
            <Text style={styles.title}>BeSport</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

export default SplashScreen
