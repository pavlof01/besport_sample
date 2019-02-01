import * as React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Icon } from 'native-base'

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf',
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5,
    fontFamily: 'Montserrat-Regular',
  },
})

export interface ISecondaryButtonProps {
  style?: object
  fontStyle?: object
  placeholder?: string | null
  onChangeText: (text: string) => void
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined
  autoCorrect?: boolean
  featherName?: string | undefined
  iconSize?: number
  secureTextEntry?: boolean
  maxLength?: number
  value?: string
  clearTextOnFocus?: boolean
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | undefined
  returnKeyType?:
    | 'none'
    | 'default'
    | 'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send'
    | 'previous'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo'
    | 'emergency-call'
    | undefined
}

export default class SecondaryButton extends React.Component<
  ISecondaryButtonProps
> {
  render() {
    const {
      fontStyle,
      style,
      value,
      iconSize,
      placeholder,
      onChangeText,
      keyboardType,
      featherName,
      secureTextEntry,
      maxLength,
      returnKeyType,
      autoCorrect,
      autoCapitalize,
      clearTextOnFocus,
    } = this.props
    const changeText = (text: string) => onChangeText(text)
    return (
      <View style={[styles.inputContainer, style]}>
        <Icon
          style={{ fontSize: iconSize || 22 }}
          type="Feather"
          name={featherName}
        />
        <TextInput
          style={[styles.textInput, fontStyle]}
          placeholder={placeholder}
          onChangeText={changeText}
          autoCapitalize={autoCapitalize || 'none'}
          autoCorrect={autoCorrect || false}
          secureTextEntry={secureTextEntry || false}
          placeholderTextColor="#000000"
          keyboardType={keyboardType || 'default'}
          underlineColorAndroid="transparent"
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          value={value}
          clearTextOnFocus={clearTextOnFocus}
          autoComplete={false}
        />
      </View>
    )
  }
}
