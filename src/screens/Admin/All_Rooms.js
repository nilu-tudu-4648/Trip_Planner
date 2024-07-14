import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BackHandler, ScrollView, StyleSheet, View,Image } from "react-native";
import {
  AppButton,
  AppLoader,
  AppSearchBar,
  AppText,
  AppView,
  HomeHeader,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoomss, deleteRoom } from "../../constants/functions";
import { NAVIGATION } from "../../constants/routes";
import { COLORS, FSTYLES, SIZES } from "../../constants/theme";
import { Avatar, Chip } from "react-native-paper";

const AllRoomsScreen = ({ navigation }) => {
  const { allRooms } = useSelector((state) => state.entities.localReducer);
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(null); // Define query state variable

  const dispatch = useDispatch();

  const filterFunction = useMemo(() => {
    return (item) => {
      const lowercaseQuery = query.toLowerCase();
      return (
        item.name?.toLowerCase().includes(lowercaseQuery) ||
        item.address?.toLowerCase().includes(lowercaseQuery)
      );
    };
  }, [query]);

  const filterData = useCallback(() => {
    if (query) {
      const filteredData = allRooms.filter(filterFunction);
      setData(filteredData);
    } else {
      setData(allRooms);
    }
  }, [query, allRooms, filterFunction]);

  const callGetAllplayer = () => getAllRoomss(dispatch, setloading);

  useEffect(() => {
    callGetAllplayer(); // Assuming this function fetches data and sets it in Redux store
  }, [dispatch,allRooms]);

  useEffect(() => {
    filterData();
  }, [query, allRooms, filterFunction, filterData]);

  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.navigate(NAVIGATION.ADMIN_HOME);
      return () => true;
    },
    []
  );

  const navigateToEditRoom = (item) => {
    navigation.navigate(NAVIGATION.CREATE_ROOM,{item})
  };

  return (
    <>
      <AppLoader loading={loading} />
      <HomeHeader header={"All Rooms"} />
      <AppView>
        <AppSearchBar
          style={{ width: "99%" }}
          onChangeSearch={(text) => setQuery(text)} // Use setQuery to update query state
          searchQuery={query}
          placeholder={'Search by "Name or Address'}
        />
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          {data?.map((item, i) => (
            <View key={i} style={{...styles.card,backgroundColor:item.booked==='false'?'lightgreen':'white'}}>
              <View style={{ ...FSTYLES }}>
                {item.roomPics.Roompic1 ? (
                  <Image
                    style={{height:100,width:100}}
                    source={{ uri: item.roomPics.Roompic1 }}
                  />
                ) : (
                  <Avatar.Icon
                    size={SIZES.largeTitle * 1.7}
                    icon="home"
                    style={{ backgroundColor: COLORS.gray }}
                  />
                )}
                <View style={{ width: "60%", alignItems: "center" }}>
                  <AppText bold={true}>{item.name}</AppText>
                  <AppText color={COLORS.primary}>{item.address}</AppText>
                  <AppText color={COLORS.primary}>{item.rentPrice}</AppText>
                </View>
              </View>
              <View style={{marginVertical:2}}>
                <AppText size={1.6}>{"amenities"}</AppText>
                {item.amenities.map((item, i) => (
                  <Chip style={{marginVertical:1}} key={i}>{item}</Chip>
                ))}
              </View>
              <View style={{ ...FSTYLES, width: "100%" }}>
                <AppButton
                  varient={"outlined"}
                  title={"Update"}
                  onPress={() => navigateToEditRoom(item)}
                  style={{ width: "48%" }}
                />
                <AppButton
                  varient={"outlined"}
                  borderColor={COLORS.red}
                  onPress={() => deleteRoom(item.id, callGetAllplayer)}
                  title={"Delete"}
                  style={{ width: "48%" }}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </AppView>
    </>
  );
};

export default AllRoomsScreen;

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    backgroundColor: "white",
    borderRadius: 10,
    padding: SIZES.base,
    width: "99%",
    height: SIZES.height * .4,
    justifyContent: "space-between",
    alignSelf: "center",
    marginVertical: 10,
  },
});
