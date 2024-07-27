import { View, Text, Image, Pressable } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATION } from "../constants/routes";
import { FSTYLES } from "../constants/theme";

const ItemCarDontainer = ({ user, ads, imageSrc, location, data, func }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        func("");
        navigation.navigate(NAVIGATION.ITEMSCREEN, { param: data });
      }}
      className="rounded-md w-full h-45 border border-gray-300 p-2 shadow-md bg-white my-2 flex-row justify-between"
    >
      <Image source={{ uri: imageSrc }} className="w-[35%] h-40 rounded-md" />
      <View className="w-[60%] flex-column justify-between">
        <View>
          <View style={FSTYLES}>
            <Text className="text-[black] text-[26px] font-bold">
              ₹ {data.price || data.rentPrice}
            </Text>
            {!ads && (
              <AntDesign
                name={
                  user?.likedPlaces?.includes(data.name) ? "heart" : "hearto"
                }
                size={24}
                color="black"
              />
            )}
          </View>
          <Text className=" text-[13px] font-bold">2-bds-2ba-1500 ft2</Text>
          <Text className="text-gray-600 text-[13px]">{data.Furnishing}</Text>
        </View>
        <View style={FSTYLES}>
          <Text className="text-gray-600 text-[13px]">
            {location?.length > 18 ? `${location.slice(0, 14)}..` : location}
          </Text>
          <Text className="text-gray-600 text-[13px]">12 JULY</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ItemCarDontainer;
