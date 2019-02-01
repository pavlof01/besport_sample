import * as React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: '#f4f4f5',    
  },
});

export interface ISeparatorProps {
    marginVertical?: number
    marginHorizontal?: number
    style?: object
 }

interface IState { }

export default class Separator extends React.Component<ISeparatorProps, IState> {
  constructor(props: ISeparatorProps) {
    super(props);
    this.state = {};
  }
  render() {
      const { style, marginVertical, marginHorizontal } = this.props
    return (
      <View style={[styles.container, style, {marginVertical, marginHorizontal}]} />      
    );
  }
}
