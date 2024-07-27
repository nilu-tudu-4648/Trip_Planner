import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppLoader, DrawerHeader } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { NotFound } from "../../assets";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { getMyAdsData } from "../constants/functions";

const MyAdsScreen = () => {
  const { user, myAds } = useSelector((state) => state.entities.localReducer);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getMyAdsData(dispatch, setIsLoading, user);
  }, []);

  const RoomComponent = ({ user }) => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {myAds?.length > 0 ? (
            myAds.map((data, i) => {
              const imageUrls = Object.values(data.roomPicsData || {}).filter(
                (url) => url.trim() !== ""
              );
              return (
                <ItemCarDontainer
                  key={i}
                  ads={true}
                  user={user}
                  imageSrc={imageUrls[0] || "default_image_url"} // Provide a default image URL if no images are available
                  title={data?.name || "No Title"}
                  location={data?.address || "No Address"}
                  data={data}
                />
              );
            })
          ) : (
            <View
              style={{
                width: "100%",
                height: 400,
                alignItems: "center",
                justifyContent: "center",
                spaceBetween: 8,
              }}
            >
              <Image
                source={NotFound}
                style={{ width: 128, height: 128, objectFit: "cover" }}
              />
              <Text
                style={{ fontSize: 24, color: "#428288", fontWeight: "600" }}
              >
                Oops... No Data Found
              </Text>
            </View>
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

const styles = StyleSheet.create({});
