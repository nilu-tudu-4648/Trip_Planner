import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS, FSTYLES, SIZES } from "../constants/theme";
import { NAVIGATION } from "../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import AppText from "./AppText";

const DrawerHeader = ({
  style,
  user,
  iconColor,
  header="RENTHUNT",
  headerColor = COLORS.black,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <Ionicons
        onPress={() => navigation.openDrawer()}
        name="reorder-three-sharp"
        size={SIZES.largeTitle * 0.8}
        color={iconColor || COLORS.white}
      />
      {header && (
        <AppText bold={true} color={headerColor} size={2}>
          {header}
        </AppText>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate(NAVIGATION.PROFILE)}
        style={styles.profileButton}
      >
        {!user.profilePic ? (
          <FontAwesome5
            name="user-circle"
            size={SIZES.largeTitle * 0.6}
            color={iconColor || COLORS.white}
          />
        ) : (
          <Image
            source={{ uri: user.profilePic}}
            style={styles.profilePic}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...FSTYLES,
    padding: SIZES.h6/2,
    height:65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  profilePic: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    objectFit: "cover",
  },
});

export default DrawerHeader;
