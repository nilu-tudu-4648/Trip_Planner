import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATION } from "../constants/routes";
import { SIZES } from "../constants/theme";

const ItemCarDontainer = ({ imageSrc, title, location, data ,func}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        func("")
        navigation.navigate(NAVIGATION.ITEMSCREEN, { param: data })
      }
      }
      className="rounded-md w-full h-50 border border-gray-300 p-2 shadow-md bg-white my-2"
    >
      <Image
        source={{ uri:imageSrc}}
        className="w-full h-40 rounded-md"
      />

      {title ? (
        <>
          <Text className="text-[#428288] text-[16px] font-bold">
            {title?.length > 14 ? `${title.slice(0, 14)}..` : title}
          </Text>

          <View className="flex-row items-center space-x-1">
            <FontAwesome name="map-marker" size={20} color="#8597A2" />
            <Text className="text-[#428288] text-[13px] font-bold">
              {location?.length > 18 ? `${location.slice(0, 14)}..` : location}
            </Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </Pressable>
  );
};

export default ItemCarDontainer;
