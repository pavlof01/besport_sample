import * as React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native'

const isAndroid = Platform.OS === 'android'

const styles = StyleSheet.create({
  container: {
    height: 45,
    marginTop: isAndroid ? 0 : 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'right',
  },
  subTitle: {
    color: '#9f9f9f',
    fontSize: 9,
    fontFamily: 'Montserrat-Light',
  },
  sideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  rightImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
})

export interface ISecondaryButtonProps {
  title?: string
  subTitle?: string
  style?: object
  fontStyle?: object
  rightActionElementStyle?: object
  leftActionElementStyle?: object
  actionsElementStyle?: object
  subTitleStyle?: object
  uriImage?: string
  onPressLeft?: () => void
  onPressRight?: () => void
  rightActionElement?: JSX.Element
  leftActionElement?: JSX.Element
}

export default class Header extends React.Component<ISecondaryButtonProps> {
  rTitle = () => {
    const { title, fontStyle } = this.props
    if (title) return <Text style={[styles.title, fontStyle]}>{title}</Text>
    return null
  }

  rSubTitle = () => {
    const { subTitle, subTitleStyle } = this.props
    if (subTitle)
      return <Text style={[styles.subTitle, subTitleStyle]}>{subTitle}</Text>
    return null
  }

  rImage = () => {
    const { uriImage } = this.props
    if (uriImage)
      return (
        <Image
          resizeMode="contain"
          style={styles.rightImage}
          source={{ uri: uriImage }}
        />
      )
    return null
  }

  render() {
    const {
      title,
      onPressLeft,
      onPressRight,
      style,
      fontStyle,
      actionsElementStyle,
      leftActionElement,
      leftActionElementStyle,
      rightActionElement,
      rightActionElementStyle,
    } = this.props
    return (
      <View style={[styles.container, style]}>
        <View style={[actionsElementStyle, leftActionElementStyle]}>
          {leftActionElement || (
            <TouchableOpacity
              style={styles.sideContainer}
              activeOpacity={0.6}
              onPress={onPressLeft}
            >
              <Image source={require('../../../assets/icons/arrow_back.png')} />
            </TouchableOpacity>
          )}
        </View>
        {title && rightActionElement ? (
          <Text style={[styles.title, fontStyle]}>{title}</Text>
        ) : null}
        <View style={[actionsElementStyle, rightActionElementStyle]}>
          {rightActionElement || (
            <TouchableOpacity activeOpacity={0.6} onPress={onPressRight}>
              <View style={styles.sideContainer}>
                <View>
                  {this.rTitle()}
                  {this.rSubTitle()}
                </View>
                {this.rImage()}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}
