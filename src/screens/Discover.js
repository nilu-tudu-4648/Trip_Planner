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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../../assets";
import MenuContainer from "../components/MenuContainer";

import { FontAwesome } from "@expo/vector-icons";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { getPlacesData } from "../../api";
import { AppLoader, AppText } from "../components";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLoginUser } from "../store/localReducer";


const Discover = ({ navigation }) => {
  const [type, setType] = useState("attractions");
  const { user } = useSelector((state) => state.entities.localReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);
  async function getPlacesDataFunc() {
    try {
      setIsLoading(true);
      const data = await getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type)
      setMainData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  const dispatch = useDispatch()
  useEffect(() => {
    getPlacesDataFunc()
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);
  const auth = getAuth();
  const logoutFunc = () => {
    signOut(auth).then( async() => {
      // Sign-out successful.
      ToastAndroid.show("Logout successfully", ToastAndroid.SHORT);
      await AsyncStorage.removeItem('loggedInUser')
      dispatch(setLoginUser(null))
    }).catch((error) => {
      ToastAndroid.show("Logout failed", ToastAndroid.SHORT);
      // An error happened.
    });
  }
  return (
    <SafeAreaView className="flex-1 bg-white relative my-4">
      <View className="flex-row items-center justify-between p-6">
        <View>
          <Text className="text-[30px] text-[#0B646B] font-bold my-2">Discover</Text>
          <Text className="text-[#527283] text-[26px]">the beauty today</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => logoutFunc()}
          className="w-12 h-12 bg-gray-400 rounded-md self-end items-center justify-center shadow-lg">
            <Image
              source={Avatar}
              className="w-full h-full rounded-md object-cover"
            />
          </TouchableOpacity>
          <AppText size={1}>{user.email}</AppText>
        </View>
      </View>

      <View className="flex-row items-center  p-1 bg-white mx-4 rounded-xl px-4 shadow-lg mt-4">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(details?.geometry?.viewport);
            setBl_lat(details?.geometry?.viewport?.southwest?.lat);
            setBl_lng(details?.geometry?.viewport?.southwest?.lng);
            setTr_lat(details?.geometry?.viewport?.northeast?.lat);
            setTr_lng(details?.geometry?.viewport?.northeast?.lng);
          }}
          query={{
            key: "AIzaSyDVEs9DA2zQovp01wwOzQGSX8oiBCuOrO8",
            language: "en",
          }}
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
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#2C7379] text-[20px] font-bold">
                Top Tips
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#A0C4C7] text-[15px] font-bold">
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#A0C4C7"
                />
              </TouchableOpacity>
            </View>

            <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCarDontainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
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
