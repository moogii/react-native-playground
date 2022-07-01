import React, { FC } from 'react'
import { StyleSheet, View, ViewStyle, SafeAreaView } from 'react-native';

interface IContainer {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const Container: FC<IContainer> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: '#000',
  },
})
