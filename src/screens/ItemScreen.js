import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AppButton, DrawerHeader } from "../components";
import Carousel from "react-native-reanimated-carousel";
import { SIZES } from "../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../constants/functions";
import { NAVIGATION } from "../constants/routes";
import { useNavigation } from "@react-navigation/native";
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
      const checkLiked = userLikedPlaces.includes(data.adTitle)
        ? userLikedPlaces.filter((item) => item !== data.adTitle)
        : [...userLikedPlaces, data.adTitle];

      const updatedUserData = { ...user, likedPlaces: checkLiked };
      await updateUser(updatedUserData, dispatch);
    } catch (error) {
      console.log(error);
    }
  };
  const mobileNumber = "9155186701";
  const initiateWhatsApp = () => {
    if (mobileNumber.length != 10) {
      alert("Please insert correct WhatsApp number");
      return;
    }
    const whatsAppMsg = `Hi ,I want this room name:${data}`;
    let url =
      "whatsapp://send?text=" + whatsAppMsg + "&phone=91" + mobileNumber;
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened");
      })
      .catch(() => {
        alert("Make sure Whatsapp installed on your device");
      });
  };
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.navigate(NAVIGATION.DISCOVER);
      return () => true;
    },
    []
  );
  const imageUrls = data.roomPics
    ? Object.values(data.roomPics).filter((url) => url.trim() !== "")
    : []; // If roomPics is undefined, fallback to an empty array

  // If no images are available, set the default image
  const dataSource =
    imageUrls.length > 0 ? imageUrls : [require("../../assets/roomImage.jpeg")];

  const {
    Bedroom,
    type,
    Bathroom,
    Furnishing,
    Listedby,
    CarParking,
    superBuiltArea,
    carpetArea,
    maintenance,
    floorNo,
  } = data;
  const Datas={
    Type: type,
    Bedrooms: Bedroom,
    Bathroom,
    Furnishing,
    "Listed by": Listedby,
    "Car Parking": CarParking,
    "Super Builtup area": superBuiltArea,
    "Carpet Area (ft)": carpetArea,
    Maintenance: maintenance,
    "Total Floors": floorNo,
  }
  return (
    <SafeAreaView className="flex-1 bg-white relative py-5">
      <DrawerHeader user={user} iconColor={"black"} />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
        <View className="relative bg-white shadow-lg">
          <Carousel
            loop
            width={SIZES.width}
            height={SIZES.width / 1.2}
            data={dataSource}
            scrollAnimationDuration={1000}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    typeof item === "string" && item.startsWith("http")
                      ? { uri: item }
                      : item // Local image
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "stretch",
                  }}
                />
              </View>
            )}
          />
        </View>
        {/* Details Section */}
        <View className="mt-6">
          <View className="flex-row justify-between">
            <Text className="text-[black] text-[26px] font-bold">
              ₹{data?.price}
            </Text>
            {!data.ads && (
              <TouchableOpacity
                onPress={() => addtoLikedPlace()}
                className="w-10 h-10 rounded-md items-center justify-center"
              >
                <AntDesign
                  name={
                    user?.likedPlaces?.includes(data.adTitle)
                      ? "heart"
                      : "hearto"
                  }
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{ height: 0.7, backgroundColor: "gray", marginVertical: 1 }}
          />
          <View className="flex-row items-center space-x-2 my-1">
            <Text className="text-[#8C9EA6] text-[15px] font-bold">
              {data?.address}
            </Text>
          </View>
        </View>
        <View
          style={{ height: 0.7, backgroundColor: "gray", marginVertical: 1 }}
        />
        <Text className="text-[#515151] font-bold text-[22px]">Details</Text>
        {Object.keys(Datas).map((item) => (
          <View key={item} className="flex-row justify-between">
            <Text className="my-1">{item}</Text>
            <View>
              <Text>{Datas[item]}</Text>
            </View>
          </View>
        ))}
        <Text className="text-[#515151] font-bold text-[22px]">
          Description
        </Text>
        {data?.description && (
          <Text className="tracking-wide text-[16px] font-semibold text-[#97A6AF]">
            {data?.description}
          </Text>
        )}
      </ScrollView>
      <View className="space-y-2 rounded-2xl px-4 py-2">
        <AppButton
          disabled={data.booked === "true"}
          onPress={initiateWhatsApp}
          title={data.booked === "true" ? "Already Booked" : "Book Now"}
        />
      </View>
    </SafeAreaView>
  );
};

export default ItemScreen;
