import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/theme";

const StyleView = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: COLORS.white,
        padding:SIZES.base1
      }}
    >
      {children}
    </View>
  );
};

export default StyleView;

const styles = StyleSheet.create({});
