import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from "rn-id-blurview";
import { TabButton } from './TabButton';

const { width } = Dimensions.get('screen');

export const NavigationTab: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();

  const barAnim = React.useRef(new Animated.Value(2)).current;

  const hexLeft = barAnim.interpolate({
    inputRange: [0, 4],
    outputRange: [34, 4 * (width - 44) / 5 + 34]
  });

  const containerStyle: ViewStyle = {
    bottom: 0,
    paddingBottom: insets.bottom,
    height: 77 + insets.bottom,
  }

  return (
    <View style={[styles.container, containerStyle]}>

      <View style={{
        overflow: 'hidden',
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      }}>

        <BlurView
          blurType='light'
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
        />
      </View>

      <Animated.Image
        source={require('../../../../assets/icons/hexagon.png')}
        resizeMode="contain"
        style={{
          position: 'absolute',
          bottom: insets.bottom,
          left: -17,
          transform: [{
            translateX: hexLeft,
          }],
          height: 100,
          width: 78,
        }} />
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            Animated.timing(barAnim, {
              toValue: index,
              duration: 300,
              useNativeDriver: true,
            }).start();

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              //@ts-ignore
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabButton
              key={route.key}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              index={index}
            />
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    flexDirection: 'row',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'visible',
    backgroundColor: '#ff00ff20',
  },
  tabContainer: {
    paddingHorizontal: 22,
    paddingTop: 14,
    flexDirection: 'row',
    width,
  },
})
