import * as React from 'react';
import { Text, TextStyle } from 'react-native';

interface ICalligraphy {
  children?: React.ReactNode;
  style?: TextStyle;
  size?: number;
  color?: string;
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
  lineHeight?: number;
}

export const Calligraphy: React.FC<ICalligraphy> = ({ children, style, size, color, weight, lineHeight }) => {
  return (
    <Text style={[{
      fontSize: size,
      color: color ? color : '#fff',
      fontWeight: weight,
      lineHeight,
    }, style]}>{children}</Text>
  );
}