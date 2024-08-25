import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AppSearchBar, AppText } from "../components";
import { SIZES } from "../constants/theme";
import AppSafeView from "../components/AppSafeView";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from "../constants/routes";

const SearchScreen = ({ route }) => {
  const [query, setQuery] = useState("");
  const { mainData,user } = route.params;
  const navigation = useNavigation();

  const filterData = (query, data) => {
    // Normalize the query to lower case and trim any extra spaces
    const normalizedQuery = query.toLowerCase().trim();
  
    // Regular expressions to match patterns like "1 bhk in kanke" or "1 bhk kanke" or "2 bhk flat for rent"
    const bhkMatch = normalizedQuery.match(/(\d+)\s*bhk/i);
    const placeMatch = normalizedQuery.match(/(?:in\s+)?(\w+)$/i);
    const typeMatch = normalizedQuery.match(/flat|house|apartment|pg/i);
  
    if (!bhkMatch) return [];
  
    const bhk = bhkMatch[1];
    const place = placeMatch ? placeMatch[1].toLowerCase() : '';
    const type = typeMatch ? typeMatch[0].toLowerCase() : '';
  
    return data.filter((item) => {
      // Normalize the place name and type in the data item
      const itemPlace = item.location ? item.location.toLowerCase() : '';
      const itemType = item.type ? item.type.toLowerCase() : '';
  
      // Check for BHK match and optionally type and place match
      const bhkCondition = item.Bedroom === bhk;
      const typeCondition = type ? itemType.includes(type) : true;
      const placeCondition = place ? itemPlace.includes(place) : true;
  
      return bhkCondition && typeCondition && placeCondition;
    });
  };
  
  

  const filteredData = filterData(query, mainData);

  const handlePress = () => {
    if (filteredData.length > 0) {
      navigation.navigate(NAVIGATION.SEARCH_RESULT_SCREEN, { filteredData,user });
    }
  };

  return (
    <AppSafeView>
      <View
        style={{
          justifyContent: "flex-start",
          padding: SIZES.padding,
          gap: SIZES.base,
        }}
      >
        <AppSearchBar
          onChangeSearch={(text) => setQuery(text)}
          searchQuery={query}
          placeholder={"Find Properties & Apartments near Ranchi"}
        />
        <AppSearchBar
          onChangeSearch={(text) => setQuery(text)}
          editable={false}
          searchQuery={"Ranchi"}
          placeholder={"For Sale: Houses & Apartments near Ranchi"}
        />
      </View>
      <View>
        {filteredData.length > 0 ? (
          <TouchableOpacity onPress={handlePress}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                padding: SIZES.padding,
              }}
            >
              <Entypo name="magnifying-glass" size={24} color="black" />
              <View style={{ width: "80%" }}>
                <AppText>{`${query}`}</AppText>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              padding: SIZES.padding,
              alignItems: "center",
            }}
          >
            <AppText>No results found</AppText>
          </View>
        )}
      </View>
    </AppSafeView>
  );
};

export default SearchScreen;
