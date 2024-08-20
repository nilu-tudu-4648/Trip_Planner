import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Chip } from "react-native-paper";
import { COLORS } from "../constants/theme";

const ChipComponent = ({setSortCriteria}) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <Chip
          style={styles.chip}
          mode="outlined"
          onPress={() => setSortCriteria("low-high")}
        >
          Sort Low-High
        </Chip>
        <Chip
          style={styles.chip}
          mode="outlined"
          onPress={() => setSortCriteria("high-low")}
        >
          Sort High-Low
        </Chip>
        <Chip
          style={styles.chip}
          mode="outlined"
          onPress={() => setSortCriteria("popularity")}
        >
          Sort Popularity
        </Chip>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  chip: {
    backgroundColor: COLORS.white,
    margin: 3,
    paddingHorizontal: 1, // Add padding to ensure there's space around the text
    minWidth: 80, // Minimum width to ensure small text doesn't make the chip too small
  },
});

export default ChipComponent;
