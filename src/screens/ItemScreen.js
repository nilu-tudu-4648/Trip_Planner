import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { FontAwesome, FontAwesome5, AntDesign,MaterialCommunityIcons  } from "@expo/vector-icons";
import { AppButton } from "../components";
import Carousel from "react-native-reanimated-carousel";
import { SIZES } from "../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../constants/functions";
import { NAVIGATION } from "../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { Chip } from 'react-native-paper';
const ItemScreen = ({ route }) => {
  const { user } = useSelector((state) => state.entities.localReducer);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const data = route?.params?.param;
  const [liked, setliked] = useState(false);

  const addtoLikedPlace = async () => {
    setliked(!liked);
    try {
      const userLikedPlaces = user.likedPlaces || [];
      const checkLiked = userLikedPlaces.includes(data.name)
        ? userLikedPlaces.filter((item) => item !== data.name)
        : [...userLikedPlaces, data.name];

      const updatedUserData = { ...user, likedPlaces: checkLiked };
      await updateUser(updatedUserData, dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.navigate(NAVIGATION.DISCOVER);
      return () => true;
    },
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-white relative py-10">
      <ScrollView className="flex-1 px-4">
        <View className="relative bg-white shadow-lg">
          <View>
            <Carousel
              loop
              width={SIZES.width}
              height={SIZES.width / 1.2}
              data={data.images}
              scrollAnimationDuration={1000}
              // onSnapToItem={(index) => console.log("current index:", index)}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={item}
                    style={{width:'100%',resizeMode:'cover'}}
                  />
                </View>
              )}
            />
          </View>

          <View className="absolute flex-row inset-x-0 top-5 justify-between px-3">
            <TouchableOpacity
              onPress={() => navigation.navigate("Discover")}
              className="w-10 h-10 rounded-md items-center justify-center bg-white"
            >
              <FontAwesome5 name="chevron-left" size={24} color="#06B2BE" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>addtoLikedPlace()}
              className="w-10 h-10 rounded-md items-center justify-center bg-[#06B2BE]"
            >
              <AntDesign
                name={user.likedPlaces?.includes(data.name) ? "heart" : "hearto"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <View className="absolute flex-row inset-x-0 bottom-5 justify-end px-6">
            <View className="px-2 py-1 rounded-md bg-teal-100">
              <Text>{"open_now"}</Text>
            </View>
          </View>
        </View>
        {/* Details Section */}
        <View className="mt-6">
          <Text className="text-[#428288] text-[20px] font-bold">
            {data?.name}
          </Text>
          <View className="flex-row items-center space-x-2 mt-2">
            <FontAwesome name="map-marker" size={25} color="#8C9EA6" />
            <Text className="text-[#8C9EA6] text-[18px] font-bold">
              {data?.address}
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center justify-between">
          {/* Rating Section */}
          {data?.rating && (
            <View className=" flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <FontAwesome name="star" size={24} color="#D58574" />
              </View>
              <View>
                <Text className="text-[#515151] font-bold">{data?.rating}</Text>
                <Text className="text-[#515151] font-bold">Ratings</Text>
              </View>
            </View>
          )}
       {/* <Chip onPress={() => console.log('Pressed')}>Example Chip</Chip> */}

          {/* Rent Price Section */}
          {data.rentPrice && (
            <View className=" flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <Text className="text-[#D58574] text-[18px] ">₹</Text>
              </View>
              <View>
                <Text className="text-[#515151] font-bold">{data?.rentPrice}</Text>
                <Text className="text-[#515151] font-bold">Rent</Text>
              </View>
            </View>
          )}
        </View>

        {/* Description Section */}
        {data?.description && (
          <Text className="tracking-wide text-[16px] font-semibold text-[#97A6AF]">
            {data?.description}
          </Text>
        )}

        {/* Additional Details Section */}
        <View className="space-y-2 mt-4 bg-gray-100 rounded-2xl px-4 py-2">
          {data?.sharingType && (
            <View className="items-center flex-row space-x-6">
            <MaterialCommunityIcons name="gender-male" size={24} color="#428288" />
              <Text className="text-lg">{data?.roomFor}</Text>
            </View>
          )}
          {data?.sharingType && (
            <View className="items-center flex-row space-x-6">
            <FontAwesome name="users" size={24} color="#428288" />
              <Text className="text-lg">{data?.sharingType}</Text>
            </View>
          )}

          {/* Email */}
          {data?.email && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="envelope" size={24} color="#428288" />
              <Text className="text-lg">{data?.email}</Text>
            </View>
          )}

          {/* Amenities */}
          {data?.amenities && data.amenities.length > 0 && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome5 name="tasks" size={24} color="#428288" />
              <View>
                {/* <Text className="text-lg">Amenities</Text> */}
                <Text className="text-lg">
                  {data?.amenities.join(", ")}
                </Text>
              </View>
            </View>
          )}

          {/* Distance from Petrol Pump */}
          {data?.distanceFromPetrolPump && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="tachometer" size={24} color="#428288" />
              <Text className="text-lg">
                {`Distance from Petrol Pump: ${data?.distanceFromPetrolPump} km`}
              </Text>
            </View>
          )}

          <AppButton title={"Book Now"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemScreen;
