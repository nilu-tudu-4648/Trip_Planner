import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import AppText from "./AppText";

const MenuContainer = ({ title, imageSrc, type, setType }) => {
  const handlePress = () => {
    setType(title.toLowerCase());
  };
  return (
    <TouchableOpacity
      className="items-center justify-center space-y-2"
      onPress={handlePress}
    >
      <View
        className={`w-24 h-24 p-2 shadow-sm rounded-full items-center justify-center ${
          type === title.toLowerCase() ? "bg-gray-200" : ""
        }`}
      >
        <Image source={imageSrc} className="w-full h-full object-contain" />
      </View>
      <AppText className="text-[#00BCC9] text-xl font-semibold">{title}</AppText>
    </TouchableOpacity>
  );
};

export default MenuContainer;
