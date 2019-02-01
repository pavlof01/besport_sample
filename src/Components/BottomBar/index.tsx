import * as React from 'react';
import { ImageSourcePropType } from 'react-native';
import { NavigationScreenConfig } from 'react-navigation';
import { PrimaryColor_dim } from '../../Constants'
import TabBarComponent from './TabBar'

export function createBottomBarOptions(routName: string, src: ImageSourcePropType): NavigationScreenConfig<any> {
  return {
    tabBarLabel: routName,
    tabBarIcon: (props: any) => <TabBarComponent routName={routName} src={src} {...props} />,
    tabBarOptions : {      
      activeTintColor: PrimaryColor_dim,
      style: {
        backgroundColor: '#ffffff',
      },
      showLabel: false
    },
  };
}

