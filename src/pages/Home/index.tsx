/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FoodCard, Gap, HomeProfile, HomeTabSection } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFoodData } from '../../redux/action';

const Home = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { food } = useSelector((state: any) => state.homeReducer);

  useEffect(() => {
    dispatch(getFoodData());
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.page}>
        <HomeProfile />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.foodCardContainer}>
              <Gap width={24} />
              {food.map((itemFood: any) => {
                return (
                  <FoodCard
                    key={itemFood.id}
                    name={itemFood.name}
                    image={{ uri: itemFood.picturePath }}
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
