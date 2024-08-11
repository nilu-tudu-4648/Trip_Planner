import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppLoader, DrawerHeader, NoDataFound } from "../components";
import { useDispatch } from "react-redux";

import ItemCarDontainer from "../components/ItemCarDontainer";
import { getMyAdsData } from "../constants/functions";

const MyAdsScreen = ({ route }) => {
  const { user } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [adsData, setadsData] = useState([]);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const getData = () => getMyAdsData(setIsLoading, user, setadsData);
  useEffect(() => {
    getData();
  }, [dispatch]);

  const RoomComponent = ({ user }) => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-1 items-center justify-evenly">
          {adsData.length > 0 ? (
            <>
              {adsData.map((data, i) => {
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
                    title={data?.name}
                    location={data?.address}
                    data={{ ...data, ads: true }}
                    func={setQuery}
                    getData={getData}
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
    <View style={styles.container}>
      <DrawerHeader user={user} iconColor={"black"} />
      {isLoading ? <AppLoader loading={isLoading} /> : <RoomComponent />}
    </View>
  );
};

export default MyAdsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green",
    margin: 20,
    textAlign: "center",
  },
  subheading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Dark Gray
    margin: 10,
    textAlign: "center",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF", // White
    borderBottomColor: "#E0E0E0", // Lighter Gray
    borderBottomWidth: 1,
    height: 80,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10,
  },
  itemText: {
    color: "#333", // Dark Gray
    fontSize: 16,
    fontWeight: "bold",
  },
  hiddenContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 80,
    borderRadius: 20,
  },
  hiddenButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 80,
  },
  closeButton: {
    backgroundColor: "green", // Green
    borderRadius: 20,
  },
  deleteButton: {
    backgroundColor: "#E74C3C", // Red
    borderRadius: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
