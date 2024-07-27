import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, } from 'react-native';
import { Avatar } from 'react-native-paper';
import { SIZES, STYLES, COLORS } from '../constants/theme';
import AppText from './AppText';
import { saveMediaToStorage, showToast } from '../constants/functions';
import * as ImagePicker from "expo-image-picker";

const RoomImages = ({setFormdata}) => {
  const [roomPicsData, setRoomPicsData] = useState({
    Roompic1: "",
    Roompic2: "",
    Roompic3: "",
    Roompic4: "",
    Roompic5: "",
  });

  const pickImage = async (type) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.1,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const urlParts = result.assets[0].uri;
        const url = await saveMediaToStorage(
          urlParts,
          `/allRooms/${Math.random()}`
        );
        setRoomPicsData((prevData) => {
            const updatedData = { ...prevData, [type]: url };
            setFormdata((prevFormdata) => ({
              ...prevFormdata,
              roomPicsData: updatedData
            }));
            return updatedData;
          });
  
        showToast("Upload successful");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      showToast("Failed to upload image. Please try again.");
    }
  };

  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
      {Object.keys(roomPicsData).map((ite, i) => (
        <TouchableOpacity
          key={i}
          style={styles.imageContainer}
          onPress={() => pickImage(ite)}
        >
          {roomPicsData[ite] ? (
            <Avatar.Image
              size={SIZES.largeTitle * 1.7}
              source={{ uri: roomPicsData[ite] }}
              style={styles.avatar}
            />
          ) : (
            <Avatar.Icon
              size={SIZES.largeTitle * 1.7}
              icon="camera"
              style={styles.icon}
            />
          )}
          <AppText style={styles.text}>{ite}</AppText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default RoomImages;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: SIZES.base,
  },
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: SIZES.base,
  },
  avatar: {
    backgroundColor: COLORS.primary,
  },
  icon: {
    backgroundColor: COLORS.gray,
  },
  text: {
    marginTop: SIZES.base / 2,
  },
});
