import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DrawerHeader } from "../components";
import { useSelector } from "react-redux";
import { NotFound } from "../../assets";
import ItemCarDontainer from "../components/ItemCarDontainer";

const FavoritesScreen = () => {
  const { user, likedRooms } = useSelector(
    (state) => state.entities.localReducer
  );

  const RoomComponent = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-1 items-center justify-evenly">
          {likedRooms.length > 0 ? (
            <>
              {likedRooms.map((data, i) => {
                const imageUrls = Object.values(data.roomPics).filter(
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
                  />
                );
              })}
            </>
          ) : (
            <View className="w-full h-[400px] items-center space-y-8 justify-center">
              <Image source={NotFound} className=" w-32 h-32 object-cover" />
              <Text className="text-1xl text-[#428288] font-semibold">
                Opps...No Data Found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  };
  return (
    <View className="flex-1 bg-white relative my-5">
      <DrawerHeader user={user} iconColor={"black"}  />
      <RoomComponent />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({});
