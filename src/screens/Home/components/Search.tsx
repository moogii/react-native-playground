import React, { FC } from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native';

interface ISearch {
  onChange?(text: string): void;
  value?: string
}

export const Search: FC<ISearch> = ({ onChange, value }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/icons/search_black.png')} />
      <TextInput
        style={styles.input}
        placeholder='Search innovenium'
        placeholderTextColor={'#98989899'}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#1D1D1D',
    borderRadius: 15,
    margin: 20,
    marginTop: 0,
  },
  input: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 18,
    flex: 1,
    marginStart: 15,
  },
});