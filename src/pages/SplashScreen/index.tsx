import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Logo } from '../../assets';
import { Gap } from '../../components';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <Gap height={38} />
      <Text style={styles.text}>FoodMarket</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFC700',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: { fontSize: 32, color: '#020202', fontFamily: 'Poppins-Medium' }
});
