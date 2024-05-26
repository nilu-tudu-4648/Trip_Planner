import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATION } from "../constants/routes";
import { Avatar } from "../../assets";

const HomeHeader = ({ header }) => {
  const _goBack = () => navigation.goBack();

  const navigation = useNavigation();
  const { user } = useSelector((state) => state.entities.localReducer);
  return (
    <Appbar.Header>
      {header !== "HOME" && <Appbar.BackAction onPress={_goBack} />}
      <Appbar.Content title={header} />
      <TouchableOpacity
        onPress={() => navigation.navigate(NAVIGATION.PROFILE)}
        className="w-12 h-12 bg-gray-400 rounded-xl self-end items-center justify-center shadow-lg"
      >
        <Image
          source={user.profilePic ? { uri: user.profilePic } : Avatar}
          className="w-full h-full rounded-xl object-contain"
        />
      </TouchableOpacity>
    </Appbar.Header>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
