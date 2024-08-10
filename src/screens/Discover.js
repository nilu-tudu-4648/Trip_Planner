import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ItemCarDontainer from "../components/ItemCarDontainer";
import {
  AppLoader,
  ChipComponent,
  DrawerHeader,
  NoDataFound,
} from "../components";
import AppSearchBar from "../components/AppSearchBar";
import { getRoomsDataFunc } from "../constants/functions";
import { useDispatch } from "react-redux";

const Discover = ({ route }) => {
  const { user } = route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [query, setQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState(null); // State for sorting criteria
  const sortData = (data) => {
    if (!sortCriteria) return data; // Return data as is if no sorting criteria is set

    return data.slice().sort((a, b) => {
      if (sortCriteria === "low-high") {
        return a.rentPrice - b.rentPrice;
      } else if (sortCriteria === "high-low") {
        return b.rentPrice - a.rentPrice;
      }
      return 0; // Return 0 if no valid sorting criteria
    });
  };

  const filterData = () => {
    if (!query) {
      return mainData; // Return all data if the query is empty
    }
    return mainData.filter(
      (data) =>
        data.adTitle.toLowerCase().includes(query.toLowerCase()) ||
        data.address.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredData = sortData(filterData());
  useEffect(() => {
    getRoomsDataFunc(dispatch, setMainData, setIsLoading, user);
  }, [user]);

  const AllRooms = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-1 items-center justify-evenly">
          {filteredData.length > 0 ? (
            <>
              {filteredData.map((data, i) => {
                const roomPicsData = data.roomPicsData || {};

                // Extract image URLs if they exist, otherwise fallback to an empty array
                const imageUrls = Object.values(roomPicsData).filter(
                  (url) => url && url.trim() !== ""
                );

                // Determine the image source: either from roomPicsData or fallback to the local image
                const imageSrc =
                  imageUrls.length > 0
                    ? { uri: imageUrls[0] } // For remote URLs
                    : require("../../assets/roomImage.jpeg"); // For local images

                return (
                  <ItemCarDontainer
                    user={user}
                    key={i}
                    imageSrc={imageSrc}
                    title={data?.name}
                    location={data?.address}
                    data={data}
                    func={setQuery}
                  />
                );
              })}
            </>
          ) : (
            <NoDataFound />
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <View className="flex-1 bg-white relative my-5">
      <DrawerHeader user={user} iconColor={"black"} />
      <View className="m-1">
        <AppSearchBar
          onChangeSearch={(text) => setQuery(text)}
          searchQuery={query}
          placeholder={"For Sale:Houses & Apartments near Ranchi"}
        />
      </View>
      <ChipComponent setSortCriteria={setSortCriteria} />
      {isLoading ? <AppLoader loading={isLoading} /> : <AllRooms />}
    </View>
  );
};

export default Discover;
