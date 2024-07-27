import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Chip } from "react-native-paper";
import { COLORS } from "../constants/theme";

const SelectChip = ({ selected, setSelect, data, type }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.typeText}>{type}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map((item, i) => (
          <Chip
            key={i}
            style={[
              styles.chip,
              selected === item && styles.selectedChip,
            ]}
            mode="outlined"
            onPress={() => setSelect(item)}
          >
            {item}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  chip: {
    backgroundColor: COLORS.white,
    marginHorizontal: 4,
    paddingHorizontal: 6,
    minWidth: 70,
  },
  selectedChip: {
    backgroundColor: COLORS.lightgray1, // Replace with your desired selected color
    color: COLORS.white,
  },
});

export default SelectChip;
