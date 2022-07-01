import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Calligraphy } from '../../../components';

const data = [
  {
    image: require('../../../../assets/images/rect1.png'),
    name1: 'Professors',
    name2: 'Connections',
    badge: 4,
  },
  {
    image: require('../../../../assets/images/rect2.png'),
    name1: 'Open',
    name2: 'Applications',
    badge: 2,
  },
  {
    image: require('../../../../assets/images/rect3.png'),
    name1: 'Mentorship',
    name2: 'Program',
    badge: 1,
  },
]

export const Navigation = () => {
  const navigation = useNavigation();

  const onPress = () => {
    // navigate to somewhere
    // navigation.navigate();
  }

  return (
    <>
      <View style={styles.container}>
        <Calligraphy size={24} lineHeight={50}>My <Calligraphy weight='bold'>Navigation</Calligraphy></Calligraphy>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {data.map((nav, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            key={index.toString()}>
            <ImageBackground source={nav.image} style={[styles.imgContainer, { marginLeft: index === 0 ? 20 : 0, marginRight: index === data.length ? 20 : 0 }]}>
              <View style={styles.badge}>
                <Calligraphy size={14} weight='500'>{nav.badge}</Calligraphy>
              </View>
              <View>
                <Calligraphy size={15} weight='300'>{nav.name1}</Calligraphy>
                <Calligraphy size={15} weight='700'>{nav.name2}</Calligraphy>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  imgContainer: {
    height: 150, width: 110, marginEnd: 15,
    padding: 8,
    justifyContent: 'space-between',
  },
  badge: {
    alignSelf: 'flex-end',
    height: 27,
    width: 27,
    borderRadius: 14,
    backgroundColor: '#5741F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
})