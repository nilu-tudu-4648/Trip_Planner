import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NAVIGATION } from "../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUser } from "../store/localReducer";

import {
  LoginScreen,
  Discover,
  SearchScreen,
  ItemScreen,
  CreateItinerary,
  SignUpScreen,
  ProfileScreen,
  FavoritesScreen,
  CreateSelling,
  MyAdsScreen,
  SearchResultScreen
} from "../screens";
import { Admin_Home, CreateRoom } from "../screens/Admin";
import AllRoomsScreen from "../screens/Admin/All_Rooms";
const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user } = useSelector((state) => state.entities.localReducer);
  const dispatch = useDispatch();
  const checkUserDetails = async () => {
    try {
      const loggedInUser = JSON.parse(
        await AsyncStorage.getItem("loggedInUser")
      );
      if (loggedInUser !== null) {
        dispatch(setLoginUser(loggedInUser));
      } else {
        console.log("No user details found");
      }
    } catch (error) {
      console.log({ error });
    }
  };
  React.useEffect(() => {
    checkUserDetails();
  }, [user]);
  const options = { headerShown: false };
  return (
    <Stack.Navigator>
      {user?.admin === "true" ? (
        <>
          <Stack.Screen
            options={options}
            name={NAVIGATION.ADMIN_HOME}
            component={Admin_Home}
          />
          <Stack.Screen
            options={options}
            name={NAVIGATION.CREATE_ROOM}
            component={CreateRoom}
          />
          <Stack.Screen
            options={options}
            name={NAVIGATION.ADMIN_ALL_ROOM}
            component={AllRoomsScreen}
          />
          <Stack.Screen
            options={options}
            name={NAVIGATION.PROFILE}
            component={ProfileScreen}
          />

        </>
      ) : user === null ? (
        <>
          <Stack.Screen
            options={options}
            name={NAVIGATION.LOGIN}
            component={LoginScreen}
          />
          <Stack.Screen
            options={options}
            name={NAVIGATION.SIGN_UP}
            component={SignUpScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={options}
            name={NAVIGATION.DISCOVER}
            initialParams={{user}}
            component={Discover}
          />
          <Stack.Screen
            options={options}
            name={NAVIGATION.ITEMSCREEN}
            component={ItemScreen}
          />
          <Stack.Screen
            options={options}
            name={NAVIGATION.SEARCH_SCREEN}
            component={SearchScreen}
          />
          <Stack.Screen
            options={options}
            name={NAVIGATION.ITINERARY}
            component={CreateItinerary}
          />
          <Stack.Screen
            options={options}
            name={NAVIGATION.PROFILE}
            component={ProfileScreen}
          />
          <Stack.Screen
            options={options}
            name={NAVIGATION.FAVORITES}
            component={FavoritesScreen}
          />
          <Stack.Screen
            options={options}
            name={NAVIGATION.CREATE_SELLING}
            component={CreateSelling}
          />
          <Stack.Screen
            options={options}
            name={NAVIGATION.MY_ADS}
            component={MyAdsScreen}
          />
                    <Stack.Screen
            options={options}
            name={NAVIGATION.SEARCH_RESULT_SCREEN}
            component={SearchResultScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator;
