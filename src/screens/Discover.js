import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Hotels,
  NotFound,
  ComingSoon,
} from "../../assets";
import MenuContainer from "../components/MenuContainer";

import ItemCarDontainer from "../components/ItemCarDontainer";
import { FIRESTORE_COLLECTIONS, roomsData } from "../constants/data";
import { AppLoader } from "../components";
import { useSelector } from "react-redux";
import AppSearchBar from "../components/AppSearchBar";
import { NAVIGATION } from "../constants/routes";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Discover = ({ navigation }) => {
  const [type, setType] = useState("rooms");
  const { user } = useSelector((state) => state.entities.localReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [query, setQuery] = useState("");
  async function geroomsDataFunc() {
    try {
      setIsLoading(true); // Set loading state to true when fetching data

      const roomsCollectionRef = collection(
        db,
        FIRESTORE_COLLECTIONS.All_ROOMS
      );
      const querySnapshot = await getDocs(roomsCollectionRef);
      const rooms = [];

      querySnapshot.forEach((doc) => {
        // For each document, push its data into the rooms array
        rooms.push({ id: doc.id, ...doc.data() });
      });

      // Once all rooms are fetched, update the mainData state with the fetched rooms
      setMainData(rooms);

      // Set loading state to false after data is fetched
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false); // Ensure loading state is set to false even in case of error
      console.error("Error fetching rooms:", error);
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
    geroomsDataFunc();
  }, [type]);
  return (
    <SafeAreaView className="flex-1 bg-white relative my-4">
      <View className="flex-row items-center justify-between p-6">
        <View>
          <Text className="text-[30px] text-[#0B646B] font-bold my-2">
            Hey {user.firstName}
          </Text>
          <Text className="text-[#527283] text-[26px]">
            Book hostels and Rooms
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION.PROFILE)}
            className="w-12 h-12 bg-gray-400 rounded-md self-end items-center justify-center shadow-lg"
          >
            <Image
              source={user.profilePic ? { uri: user.profilePic } : Avatar}
              className="w-full h-full rounded-md object-cover"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mx-2">
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
          {/* <View className=" flex-row items-center justify-between px-6 mt-2">
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
          </View> */}
          {type === "rooms" ? (
            <View>
              <View className="flex-row items-center justify-between px-4 mt-8">
                <Text className="text-[#2C7379] text-[20px] font-bold">
                  Popular Rooms
                </Text>
              </View>

              <View className="px-1 mt-8 flex-row items-center justify-evenly flex-wrap">
                {filteredData.length > 0 ? (
            <>
            {filteredData.map((data, i) => {
              const imageUrls = Object.values(data.roomPics).filter(url => url.trim() !== "");
              return (
                <ItemCarDontainer
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
                    <Image
                      source={NotFound}
                      className=" w-32 h-32 object-cover"
                    />
                    <Text className="text-1xl text-[#428288] font-semibold">
                      Opps...No Data Found
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ) : (
            <View className="w-full h-[400px] items-center space-y-8 justify-center">
              <Image source={ComingSoon} className=" w-32 h-32 object-cover" />
              <Text className="text-1xl text-[#428288] font-semibold">
                Coming Soon
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
