import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  AppButton,
  AppHeader,
  AppText,
  AppTextInput,
  AppView,
} from "../components";
import * as ImagePicker from "expo-image-picker";
import { SIZES } from "../constants/theme";
import {
  updateUser,
  saveMediaToStorage,
  showToast,
} from "../constants/functions";

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.entities.localReducer);
  const [input, setinput] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    mobile: user.mobile || "",
  });
  const [image, setimage] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      const data = { ...user, ...input };
      await updateUser(data, dispatch);
    } catch (error) {
      console.log(error);
    }
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.1,
        base64: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const urlParts = result.assets[0].uri;
        setimage(urlParts);
        const url = await saveMediaToStorage(
          urlParts,
          `/profile/${user.firstName}${user.lastName}`
        );
        const userUpdate = {
          ...user,
          profilePic: url,
        };
        await updateUser(userUpdate, dispatch);
        showToast("Profile picture updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AppHeader header={"Profile"} />
      <AppView>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {user.profilePic ? (
            <Avatar.Image
              size={SIZES.height * 0.1}
              source={{ uri: user.profilePic }}
            />
          ) : (
            <Avatar.Icon size={SIZES.height * 0.1} icon="account" />
          )}
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <ScrollView>
            <AppTextInput
              placeholder={"First name"}
              name="firstName"
              value={input.firstName}
              style={{ marginVertical: SIZES.base }}
              onChangeText={(text) =>
                setinput({ ...input, firstName: text.trim() })
              }
            />
            <AppTextInput
              placeholder={"Last Name"}
              name="lastName"
              value={input.lastName}
              style={{ marginVertical: SIZES.base }}
              onChangeText={(text) =>
                setinput({ ...input, lastName: text.trim() })
              }
            />
            <AppTextInput
              placeholder={"Email"}
              name="email"
              value={input.email}
              style={{ marginVertical: SIZES.base }}
              onChangeText={(text) =>
                setinput({ ...input, email: text.trim() })
              }
            />
            <AppTextInput
              placeholder={"Subscription"}
              value={`Plan validity : ${ user.subscriptionInfo.split("|")[1]}`}
              style={{ marginVertical: SIZES.base }}
              editable={false}
            />
            <AppTextInput
              keyboardType={"numeric"}
              placeholder={"Enter Mobile Number"}
              name="mobile"
              maxLength={10}
              style={{
                marginVertical: SIZES.base,
                marginBottom: SIZES.base * 2,
              }}
              value={input.mobile}
              onChangeText={(text) =>
                setinput({ ...input, mobile: text.trim() })
              }
            />
            <AppButton title="Update" onPress={handleSubmit} />
          </ScrollView>
        </View>
      </AppView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginVertical: SIZES.padding,
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    marginVertical: SIZES.padding * 2,
    // justifyContent: 'space-around',
  },
  inputStyle: {
    width: "100%",
  },
});
