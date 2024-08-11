import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DrawerHeader } from "../components";
import { useSelector } from "react-redux";
import { NotFound } from "../../assets";
import ItemCarDontainer from "../components/ItemCarDontainer";

const FavoritesScreen = ({route}) => {
  const { user,allAds } = route.params
const liked = allAds.filter((ite=>user.likedPlaces.includes(ite.adTitle)))
  const RoomComponent = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-1 items-center justify-evenly">
          {liked.length > 0 ? (
            <>
              {liked.map((data, i) => {
               // Safeguard against undefined or null roomPicsData
               const roomPicsData = data.roomPicsData || {};

               // Extract image URLs if they exist, otherwise fallback to an empty array
               const imageUrls = Object.values(roomPicsData).filter(
                 (url) => url && url.trim() !== ""
               );

               // Determine the image source: either from roomPicsData or fallback to the local image
               const imageSrc =
                 imageUrls.length > 0
                   ? { uri: imageUrls[0] } // For remote URLs
                   : require("../../assets/roomImage.jpeg"); // For local images

                return (
                  <ItemCarDontainer
                    user={user}
                    key={i}
                    imageSrc={imageSrc}
                    data={data}
                    func={()=>console.log('first')}
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
