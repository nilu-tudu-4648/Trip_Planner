import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { AppButton, AppText } from "../components";

const ItemScreen = ({ route }) => {
  const navigation = useNavigation();
  const data = route?.params?.param;
 const [liked, setliked] = useState(false)

  return (
    <SafeAreaView className="flex-1 bg-white relative py-10">
      <ScrollView className="flex-1 px-4">
        <View className="relative bg-white shadow-lg">
          <Image
            source={{
              uri: data?.photo?.images?.large?.url
                ? data?.photo?.images?.large?.url
                : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg",
            }}
            className="w-full h-72 object-cover rounded-2xl"
          />

          <View className="absolute flex-row inset-x-0 top-5 justify-between px-3">
            <TouchableOpacity
              onPress={() => navigation.navigate("Discover")}
              className="w-10 h-10 rounded-md items-center justify-center bg-white"
            >
              <FontAwesome5 name="chevron-left" size={24} color="#06B2BE" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setliked(!liked)} className="w-10 h-10 rounded-md items-center justify-center bg-[#06B2BE]">
            <AntDesign name={liked?"heart":"hearto"} size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-6">
            <View className="flex-row space-x-2 items-center">
              <AppText className="text-[12px] font-bold text-gray-100">
                {data?.price_level}
              </AppText>
              <Text className="text-[12px] font-bold text-red-100">
                {data?.price}
              </Text>
            </View>

            <View className="px-2 py-1 rounded-md bg-teal-100">
              <Text>{data?.open_now_text}</Text>
            </View>
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-[#428288] text-[24px] font-bold">
            {data?.name}
          </Text>
          <View className="flex-row items-center space-x-2 mt-2">
            <FontAwesome name="map-marker" size={25} color="#8C9EA6" />
            <Text className="text-[#8C9EA6] text-[20px] font-bold">
              {data?.location_string}
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center justify-between">
          {data?.rating && (
            <View className=" flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <FontAwesome name="star" size={24} color="#D58574" />
              </View>
              <View>
                <Text className="text-[#515151]">{data?.rating}</Text>
                <Text className="text-[#515151]">Ratings</Text>
              </View>
            </View>
          )}

          {data?.price_level && (
            <View className=" flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <MaterialIcons name="attach-money" size={24} color="black" />
              </View>
              <View>
                <Text className="text-[#515151]">{data?.price_level}</Text>
                <Text className="text-[#515151]">Price Level</Text>
              </View>
            </View>
          )}

        </View>

        {data?.description && (
          <Text className=" tracking-wide text-[16px] font-semibold text-[#97A6AF]">
            {data?.description}
          </Text>
        )}

        <View className=" space-y-2 mt-4 bg-gray-100 rounded-2xl px-4 py-2">
          {data?.phone && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="phone" size={24} color="#428288" />
              <Text className="text-lg">{data?.phone}</Text>
            </View>
          )}
          {data?.email && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="envelope" size={24} color="#428288" />
              <Text className="text-lg">{data?.email}</Text>
            </View>
          )}
          {data?.address && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="map-pin" size={24} color="#428288" />
              <Text className="text-lg">{data?.address}</Text>
            </View>
          )}
          <AppButton title={'Book Now'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemScreen;
