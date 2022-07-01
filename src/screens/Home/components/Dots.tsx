import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface IDots {
  onPress(): void,
}

export const Dots: FC<IDots> = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ padding: 5, marginTop: 10 }}
      onPress={onPress}>
      <View style={styles.horizontal}>
        <View style={[styles.dot, {
          backgroundColor: '#3C3BA0',
        }]} />
        <View style={[styles.dot, {
          backgroundColor: '#4342A9',
        }]} />
      </View>
      <View style={styles.horizontal}>
        <View style={[styles.dot, {
          backgroundColor: '#242369',
        }]} />
        <View style={[styles.dot, {
          backgroundColor: '#17164A',
        }]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 5,
    width: 5,
    borderRadius: 3,
    margin: 2.5,
  },
  horizontal: {
    flexDirection: 'row',
  }
})