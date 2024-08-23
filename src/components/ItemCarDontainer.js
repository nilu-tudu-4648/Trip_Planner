import { View, Image, Pressable } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATION } from "../constants/routes";
import { COLORS } from "../constants/theme";
import { deleteMyAds } from "../constants/functions";
import AppText from "./AppText";

const ItemCarDontainer = ({
  user,
  imageSrc,
  getData,
  location,
  data,
  func,
}) => {
  const navigation = useNavigation();
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    const options = { day: "2-digit", month: "short" }; // Format options
    const formattedDate = date
      .toLocaleDateString("en-US", options)
      .toUpperCase(); // Convert to "12 JUL" format
    return formattedDate;
  };
  return (
    <Pressable
      onPress={() => {
        func("");
        navigation.navigate(NAVIGATION.ITEMSCREEN, { param: data });
      }}
      style={styles.container}
    >
      <Image
        source={typeof imageSrc === "string" ? { uri: imageSrc } : imageSrc}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <View>
          <View style={styles.header}>
            <AppText style={styles.priceText}>
              ₹ {data?.price || data?.rentPrice}
            </AppText>
            {!data?.ads ? (
              <AntDesign
                name={
                  user?.likedPlaces?.includes(data?.adTitle)
                    ? "heart"
                    : "hearto"
                }
                size={24}
                color="black"
              />
            ) : (
              user?.admin === true && (
                <MaterialIcons
                  onPress={() => deleteMyAds(data?.id, getData)}
                  name="delete"
                  size={24}
                  color={COLORS.red}
                />
              )
            )}
          </View>
          <AppText style={styles.subText}>
            {data.Bedroom}-bds-{data.Bathroom}ba-{data.carpetArea} ft²
          </AppText>
          <AppText style={styles.grayText}>{data?.Furnishing}</AppText>
        </View>
        <View style={styles.footer}>
          <AppText style={styles.grayText}>
            {location?.length > 18 ? `${location.slice(0, 14)}..` : location}
          </AppText>
          <AppText style={styles.grayText}>{formatDate(data.createdAt)}</AppText>
        </View>
      </View>
    </Pressable>
  );
};

export default ItemCarDontainer;

const styles = {
  container: {
    width: "100%",
    height: 180,
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 6,
    backgroundColor: "white",
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
  },
  image: {
    width: "40%",
    height: 160,
    // borderRadius: 8,
  },
  infoContainer: {
    width: "55%",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  grayText: {
    color: "gray",
    fontSize: 13,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
};
