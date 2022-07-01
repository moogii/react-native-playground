import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Calligraphy, Container } from '../../components';
import { Dots, Navigation, Search, Swiper } from './components';



const HomeScreen = () => {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.topContainer}>
          <View style={styles.profile}>
            <Image source={require('../../../assets/images/profile.png')} style={{ marginEnd: 7 }} />
            <View>
              <Calligraphy
                size={20}
                weight="300">Hello,</Calligraphy>
              <Calligraphy
                size={36}
                weight="bold">Sammy!</Calligraphy>
            </View>
          </View>
          <Dots onPress={() => { }} />
        </View>
        <Search />
        <Navigation />

        <Swiper />
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
})

export default HomeScreen;