/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
import { FoodCard, Gap, HomeProfile, HomeTabSection } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FoodDummy1, FoodDummy2 } from '../../assets';
// import { getFoodData } from '../../redux/action';

const Home = ({ navigation }: any) => {
  const food = [
    {
      id: '1',
      name: 'Cherry Healthy',
      picturePath: FoodDummy1,
      rate: 4.5
    },
    {
      id: '2',
      name: 'Burger Tamayo',
      picturePath: FoodDummy2,
      rate: 4.5
    }
  ];
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.page}>
        <HomeProfile />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.foodCardContainer}>
              <Gap width={24} />
              {food.map((itemFood) => {
                return (
                  <FoodCard
                    key={itemFood.id}
                    name={itemFood.name}
                    image={itemFood.picturePath}
                    rating={itemFood.rate}
                    onPress={() => navigation.navigate('FoodDetail', itemFood)}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={styles.tabContainer}>
          <HomeTabSection />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: { flex: 1 },
  foodCardContainer: { flexDirection: 'row', marginVertical: 24 },
  tabContainer: { flex: 1, height: 'auto', backgroundColor: 'red' }
});
