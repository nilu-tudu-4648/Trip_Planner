import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppLoader, DrawerHeader, NoDataFound } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { NotFound } from "../../assets";

import { FontAwesome, AntDesign } from "@expo/vector-icons";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { getMyAdsData } from "../constants/functions";
import { SwipeListView } from 'react-native-swipe-list-view';
import { FSTYLES } from "../constants/theme";

const MyAdsScreen = () => {
  const { user, myAds } = useSelector((state) => state.entities.localReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    getMyAdsData(dispatch, setIsLoading, user);
  }, []);

  const RoomComponent = ({ user }) => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
      <View className="px-1 items-center justify-evenly">
        {myAds.length > 0 ? (
          <>
            {myAds.map((data, i) => {
              const imageUrls = Object.values(data.roomPicsData).filter(
                (url) => url.trim() !== ""
              );
              return (
                <ItemCarDontainer
                  user={user}
                  key={i}
                  imageSrc={imageUrls[0]}
                  title={data?.name}
                  location={data?.address}
                  data={data}
                  func={setQuery}
                />
              );
            })}
          </>
        ) : (
          <NoDataFound />
        )}
      </View>
    </ScrollView>
    );
  };
 

  return (
    <View className="flex-1 bg-white relative my-5">
      <DrawerHeader user={user} iconColor={"black"}/>
      {isLoading ? <AppLoader loading={isLoading} /> : <RoomComponent />}   
    </View>
  );
};

export default MyAdsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee', // Light Gray
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
    margin: 20,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark Gray
    margin: 10,
    textAlign: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF', // White
    borderBottomColor: '#E0E0E0', // Lighter Gray
    borderBottomWidth: 1,
    height: 80,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10,
  },
  itemText: {
    color: '#333', // Dark Gray
    fontSize: 16,
    fontWeight: 'bold',
  },
  hiddenContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 80,
    borderRadius: 20,
  },
  hiddenButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 80,
  },
  closeButton: {
    backgroundColor: 'green', // Green
    borderRadius: 20,
  },
  deleteButton: {
    backgroundColor: '#E74C3C', // Red
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
