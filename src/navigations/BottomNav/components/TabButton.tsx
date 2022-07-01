import React, { FC, useEffect, useRef } from 'react'
import { Animated, Text, TouchableOpacity } from 'react-native';

interface ITabButton {
  isFocused: boolean;
  onPress(): void;
  onLongPress(): void;
  index: number;
}

const icons = [
  require('../../../../assets/icons/bar.png'),
  require('../../../../assets/icons/more.png'),
  require('../../../../assets/icons/home.png'),
  require('../../../../assets/icons/search.png'),
  require('../../../../assets/icons/profile.png'),
]

export const TabButton: FC<ITabButton> = ({ isFocused, onPress, onLongPress, index }) => {
  const animRef = useRef(new Animated.Value(isFocused ? -19 : 0)).current

  useEffect(() => {
    Animated.timing(animRef, {
      toValue: isFocused ? -19 : 0,
      duration: 350,
      useNativeDriver: true,
    }).start();

  }, [isFocused])

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.8}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.Image source={icons[index]} style={{
        transform: [{
          translateY: animRef,
        }]
      }} />
    </TouchableOpacity>
  );

}