import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
// import { useDispatch, useSelector } from 'react-redux';
// import { getFoodDataByTypes } from '../../../redux/action';
import ItemListFood from '../ItemListFood';
import { FoodDummy1, FoodDummy2, FoodDummy3 } from '../../../assets';

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBarStyle}
    renderLabel={({ route, focused }) => <Text style={styles.tabText(focused)}>{route.title}</Text>}
  />
);

const NewTaste = () => {
  const navigation = useNavigation();

  // const { newTaste } = useSelector((state) => state.homeReducer);

  // useEffect(() => {
  //   dispatch(getFoodDataByTypes('new_food'));
  // }, []);

  const newTaste = [
    {
      id: '1',
      name: 'Cherry Healthy',
      picturePath: FoodDummy1,
      price: 12000,
      rate: 4.5
    },
    {
      id: '2',
      name: 'Burger Tamayo',
      picturePath: FoodDummy2,
      price: 24000,
      rate: 4.5
    },
    {
      id: '3',
      name: 'Soup Bumil',
      picturePath: FoodDummy3,
      price: 24000,
      rate: 4.5
    }
  ];
  return (
    <View style={styles.containerNewTaste}>
      {newTaste.map((item) => {
        return (
          <ItemListFood
            key={item.id}
            type="product"
            name={item.name}
            price={item.price}
            rating={item.rate}
            image={item.picturePath}
            onPress={() => navigation.navigate('FoodDetail', item)}
          />
        );
      })}
    </View>
  );
};

const Popular = () => {
  // const navigation = useNavigation();
  // const dispatch = useDispatch();
  // const { popular } = useSelector((state) => state.homeReducer);

  // useEffect(() => {
  //   dispatch(getFoodDataByTypes('popular'));
  // }, []);

  return (
    <View style={styles.containerPopular}>
      {/* {popular.map((item) => {
        return (
          <ItemListFood
            key={item.id}
            type="product"
            name={item.name}
            price={item.price}
            rating={item.rate}
            image={{ uri: item.picturePath }}
            onPress={() => navigation.navigate('FoodDetail', item)}
          />
        );
      })} */}
    </View>
  );
};

const Recommended = () => {
  // const navigation = useNavigation();
  // const dispatch = useDispatch();
  // const { recommended } = useSelector((state) => state.homeReducer);

  // useEffect(() => {
  //   dispatch(getFoodDataByTypes('recommended'));
  // }, []);

  return (
    <View style={styles.containerRecommended}>
      {/* {recommended.map((item) => {
        return (
          <ItemListFood
            key={item.id}
            type="product"
            name={item.name}
            price={item.price}
            rating={item.rate}
            image={{ uri: item.picturePath }}
            onPress={() => navigation.navigate('FoodDetail', item)}
          />
        );
      })} */}
    </View>
  );
};

const initialLayout = { width: Dimensions.get('window').width };

const HomeTabSection = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: '1', title: 'New Taste' },
    { key: '2', title: 'Popular' },
    { key: '3', title: 'Recommended' }
  ]);

  const renderScene = SceneMap({
    1: NewTaste,
    2: Popular,
    3: Recommended
  });

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.tabView}
    />
  );
};

export default HomeTabSection;

const styles = StyleSheet.create({
  tabView: { backgroundColor: 'white' },
  indicator: {
    backgroundColor: '#020202',
    height: 3
  },
  tabBarStyle: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1
  },
  tabStyle: { width: 'auto' },
  tabText: (focused) => ({
    fontFamily: 'Poppins-Medium',
    color: focused ? '#020202' : '#8D92A3'
  }),
  containerNewTaste: { paddingTop: 8, paddingHorizontal: 24 },
  containerPopular: { paddingTop: 8, paddingHorizontal: 24 },
  containerRecommended: { paddingTop: 8, paddingHorizontal: 24 }
});
