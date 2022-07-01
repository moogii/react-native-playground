import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "./BottomNav";


const MainNavigation = () => {
  return (
    <NavigationContainer>
      <BottomNav />
    </NavigationContainer>
  );
}

export default MainNavigation;