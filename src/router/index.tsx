import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Order, SignIn, SignUp, SignUpAddress, SplashScreen } from '../pages';
import { BottomNavigator } from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    // eslint-disable-next-line react/no-unstable-nested-components
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Order" component={Order} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen
        name="SignUpAddress"
        component={SignUpAddress}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Router;
