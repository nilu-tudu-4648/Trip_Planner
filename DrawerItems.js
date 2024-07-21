import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Avatar } from "react-native-paper";
import { COLORS, ELEVATION, FSTYLES, SIZES } from "./src/constants/theme";
import AppText from "./src/components/AppText";
import { useDispatch, useSelector } from "react-redux";
import { dashboardCards } from "./src/constants/data";
import { logoutUser } from "./src/constants/functions";
import { NAVIGATION } from "./src/constants/routes";
import { AppButton, } from "./src/components";
const DrawerItems = ({ navigation }) => {
  const { user } = useSelector((state) => state.entities.localReducer);
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      <View style={styles.headerstyle}>
        {user?.ImgUrl ? (
          <Avatar.Image
            size={SIZES.largeTitle * 1.2}
            source={{ uri: user.ImgUrl }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION.PROFILE)}
          >
            <Avatar.Icon
              size={SIZES.largeTitle * 1.2}
              icon="account"
              style={{ backgroundColor: COLORS.white }}
            />
          </TouchableOpacity>
        )}
        <AppText bold={true} color={COLORS.white}>
          {user?.firstName} {user?.lastName} 
        </AppText>
      </View>
      <View style={styles.container}>
        {/* <View style={{ width: "100%" }}>
          {dashboardCards.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => navigation.navigate(item.navigation)}
              style={styles.drawerCards}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={{ width: SIZES.h3, height: SIZES.h3 }}
                />
                <StyleText bold={true} size={1.5} style={{ left: 12 }}>
                  {item.name}
                </StyleText>
              </View>
              <Entypo
                name="chevron-right"
                size={SIZES.h4}
                color={COLORS.black}
              />
            </TouchableOpacity>
          ))}
        </View> */}
        <View style={{height:100}}/>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            height: SIZES.height * 0.15,
            backgroundColor:'white',
            justifyContent:'center'
          }}
        >
          <AppText size={1.5} color={COLORS.darkblue}>
            1.0.2
          </AppText>
          <AppButton
            title={"Logout"}
            style={{
              width: "60%",
              height: SIZES.h1 * 1.1,
              borderRadius: SIZES.base,
            }}
            onPress={() => {
              navigation.closeDrawer();
              logoutUser(dispatch);
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerItems;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    borderTopRightRadius: SIZES.h3,
    borderTopLeftRadius: SIZES.h3,
    backgroundColor: COLORS.white,
    height: SIZES.height * 0.8,
  },
  drawerCards: {
    ...FSTYLES,
    paddingHorizontal: "10%",
    paddingVertical: "1%",
    marginVertical: "3%",
    backgroundColor: COLORS.white,
    ...ELEVATION,
    borderRadius: SIZES.h4,
    width: "80%",
    alignSelf: "center",
    height: SIZES.h1 * 1.2,
  },
  headerstyle: {
    justifyContent: "space-around",
    backgroundColor: COLORS.background,
    height: SIZES.height * 0.2,
    paddingHorizontal: "10%",
  },
});
