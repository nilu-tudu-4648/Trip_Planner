import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { NotFound } from "../../assets";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { AppLoader, ChipComponent, DrawerHeader } from "../components";
import AppSearchBar from "../components/AppSearchBar";
import { getRoomsDataFunc } from "../constants/functions";


const Discover = ({ route }) => {
  const { user } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [likeddata, setLikedData] = useState([]);
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
        data.name.toLowerCase().includes(query.toLowerCase()) ||
        data.address.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredData = sortData(filterData());
  useEffect(() => {
    getRoomsDataFunc(setMainData, setLikedData, setIsLoading, user);
  }, [user]);

  const AllRooms = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-1 items-center justify-evenly">
          {filteredData.length > 0 ? (
            <>
              {filteredData.map((data, i) => {
                const imageUrls = Object.values(data.roomPics).filter(
                  (url) => url.trim() !== ""
                );
                return (
                  <ItemCarDontainer
                  user={user}
                    key={i}
                    imageSrc={imageUrls[0]}
                    title={data?.name}
                    location={data?.address}
                    data={data}
                    func={setQuery}
                  />
                );
              })}
            </>
          ) : (
            <View className="w-full h-[400px] items-center space-y-8 justify-center">
              <Image source={NotFound} className=" w-32 h-32 object-cover" />
              <Text className="text-1xl text-[#428288] font-semibold">
                Opps...No Data Found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <View className="flex-1 bg-white relative my-5">
      <DrawerHeader user={user} iconColor={"black"} header={"ROOMHUNT"} />
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
