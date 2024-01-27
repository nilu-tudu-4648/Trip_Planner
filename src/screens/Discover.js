import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Hotels, NotFound, Restaurants } from "../../assets";
import MenuContainer from "../components/MenuContainer";

import ItemCarDontainer from "../components/ItemCarDontainer";
import { roomsData } from "../constants/data";
import { AppLoader, AppText } from "../components";
import {  useSelector } from "react-redux";
import AppSearchBar from "../components/AppSearchBar";
import { NAVIGATION } from "../constants/routes";

const Discover = ({ navigation }) => {
  const [type, setType] = useState("attractions");
  const { user } = useSelector((state) => state.entities.localReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [query, setQuery] = useState("");

  async function getPlacesDataFunc() {
    try {
      setIsLoading(true);
      // Simulated data, replace with actual data fetching logic
      const data = [
        {
          // ... (unchanged data structure)
        },
      ];
      setMainData(roomsData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

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

  const filteredData = filterData();

  useEffect(() => {
    getPlacesDataFunc();
  }, [type]);

 

  return (
    <SafeAreaView className="flex-1 bg-white relative my-4">
      <View className="flex-row items-center justify-between p-6">
        <View>
          <Text className="text-[30px] text-[#0B646B] font-bold my-2">
            Discover
          </Text>
          <Text className="text-[#527283] text-[26px]">the beauty today</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION.PROFILE)}
            className="w-12 h-12 bg-gray-400 rounded-md self-end items-center justify-center shadow-lg"
          >
            <Image
              source={Avatar}
              className="w-full h-full rounded-md object-cover"
            />
          </TouchableOpacity>
          <AppText size={1}>{user.email}</AppText>
        </View>
      </View>

      <View className="mx-4">
        <AppSearchBar
          onChangeSearch={(text) => setQuery(text)}
          searchQuery={query}
          placeholder={"Search by Name or Place"}
        />
      </View>

      {/* Menu Container */}
      {isLoading ? (
        <AppLoader loading={isLoading} />
      ) : (
        <ScrollView>
          <View className=" flex-row items-center justify-between px-8 mt-8">
            <MenuContainer
              key={"hotels"}
              title="Rooms"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"restaurants"}
              title="Tiffin Service"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#2C7379] text-[20px] font-bold">
                Top Picks
              </Text>
            </View>

            <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
              {filteredData.length > 0 ? (
                <>
                  {filteredData.map((data, i) => (
                    <ItemCarDontainer
                      key={i}
                      imageSrc={data?.images[0]}
                      title={data?.name}
                      location={data?.address}
                      data={data}
                      func={setQuery}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                    <Image
                      source={NotFound}
                      className=" w-32 h-32 object-cover"
                    />
                    <Text className="text-1xl text-[#428288] font-semibold">
                      Opps...No Data Found
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
