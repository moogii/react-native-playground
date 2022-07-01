import React, { FC, useEffect, useRef } from 'react'
import { Alert } from 'react-native';
import { Animated, Dimensions, Image, PanResponder, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Calligraphy } from '../../../components';
import { IOpportunity } from './Swiper';

interface ICard {
  opportunity: IOpportunity;
  index: number;
  swiped(id: number, index: number, isLeft: boolean): void;
  zIndex: number,
}

const { width } = Dimensions.get('screen')
const SWIPE_THRESHOLD = 3;
const SWIPE_PERCENTAGE = 25;

export const Card: FC<ICard> = ({ opportunity, index, swiped, zIndex }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const depthAnim = useRef(new Animated.Value(zIndex)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove:
        Animated.event(
          [
            null,
            { dx: pan.x },

          ], {
          useNativeDriver: false,
        }),
      onPanResponderRelease: (e, gesture) => {
        const { dx, vx } = gesture;
        let direction = 0;
        pan.flattenOffset();

        // check swipe direction
        if (Math.abs(vx) > SWIPE_THRESHOLD) {
          direction = vx > 0 ? 1 : 2;

        } else if (Math.abs(dx) >= width / 100 * SWIPE_PERCENTAGE && dx * vx >= 0) {
          direction = dx > 0 ? 1 : 2
        }

        if (direction === 0) {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
          return;
        }

        const x = direction == 1 ? width * 2 : direction == 2 ? - width * 2 : dx;

        Animated.timing(pan, {
          toValue: { x, y: 0 },
          duration: 100,
          useNativeDriver: true,
        }).start(() => {
          swiped(opportunity.id, index, direction === 2);
          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            duration: 0,
            useNativeDriver: true,
          }).start()
        });
      },
      // when parent scrollview takes control, pan should reset position
      onPanResponderTerminate: () => {
        Animated.timing(pan, {
          toValue: { x: 0, y: 0 },
          duration: 100,
          useNativeDriver: true,
        }).start()
      }
    })
  ).current;

  useEffect(() => {
    Animated.timing(depthAnim, {
      toValue: zIndex,
      duration: zIndex === 0 ? 0 : 100,
      useNativeDriver: true,
    }).start();
  }, [zIndex])

  const scale = depthAnim.interpolate({
    inputRange: [0, 2],
    outputRange: [0.8, 1],
  });

  const topMargin = depthAnim.interpolate({
    inputRange: [0, 2],
    outputRange: [50, 0],
  });

  const opacity = depthAnim.interpolate({
    inputRange: [0, 2],
    outputRange: [0.6, 1],
  })

  const onApply = () => {
    Alert.alert('Alert', 'Trying to apply');
  }

  return (
    <Animated.View
      style={[styles.container, {
        transform: [
          { translateX: pan.x },
          { translateY: topMargin },
          { scale }
        ],
        opacity,
        zIndex,
      }]}
      // only front card is swipable
      {...(zIndex === 2 && panResponder.panHandlers)}
    >
      <View style={styles.card}>
        <View style={styles.horizontal}>
          <Image source={require('../../../../assets/images/assistant.png')} />
          <Calligraphy style={styles.title}>{opportunity.title}</Calligraphy>
        </View>

        <View style={[styles.horizontal,]}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Image source={require('../../../../assets/icons/location.png')} />
            </View>
          </View>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Image source={require('../../../../assets/icons/flask.png')} />
            </View>
          </View>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Image source={require('../../../../assets/icons/carbon_time.png')} />
            </View>
          </View>
        </View>

        <View style={styles.horizontal}>
          <Calligraphy style={styles.info}>{opportunity.location}</Calligraphy>
          <Calligraphy style={styles.info}>{opportunity.company}</Calligraphy>
          <Calligraphy style={styles.info}>{opportunity.type}</Calligraphy>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.applyBtn}
        onPress={onApply}>
        <Calligraphy weight='bold'>Apply now</Calligraphy>
      </TouchableOpacity>
    </Animated.View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B050FA',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 20,
    position: 'absolute',
    width: '100%',
  },
  card: {
    backgroundColor: '#8A3FC3',
    padding: 15,
    borderRadius: 20,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  circleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#B050FA',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  info: {
    flex: 1,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    flex: 1,
  },
  applyBtn: {
    borderRadius: 30,
    backgroundColor: '#8A3FC3',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 25,
    padding: 15,
    paddingVertical: 10,
  },
})