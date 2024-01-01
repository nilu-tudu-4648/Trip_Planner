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
import AppSearchBar from "../components/AppSearchBar";


const Discover = ({ navigation }) => {
  const [type, setType] = useState("attractions");
  const { user } = useSelector((state) => state.entities.localReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [query, setquery] = useState("");
  async function getPlacesDataFunc() {
    try {
      setIsLoading(true);
      const data = [{"address": "MG Road, Bengaluru India", "awards": [], "bearing": "northwest", "booking": {"provider": "Viator", "url": "https://www.tripadvisor.com/Commerce?url=https%3A%2F%2Fwww.viator.com%2Ftours%2FBangalore%2FPrivate-Full-Day-Tour-of-Bangalore-City%2Fd5310-34682P13%3Feap%3Dmobile-app-11383%26aid%3Dtripenandr&partnerKey=1&urlKey=b4d414647ba194647&logme=true&uidparam=refid&attrc=true&Provider=Viator&area=TOP&slot=1&cnt=1&geo=2587630&clt=TM&from=api&nt=true"}, "category": {"key": "attraction", "name": "Attraction"}, "description": "Cubbon Park dons many hats: a green lung in the heart of the city that also hosts a library, museums, a tennis academy, an aquarium, a toy train and many statues and pavilions. It’s probably one of the only parks to have a busy road cutting through it. In the wee hours of the morning or evenings, it paradise. Spring adds to the beauty of this park, with the lovely and colorful Tabebuia trees in full bloom.", "distance": "4.644140379108656", "distance_string": "4.6 km", "doubleclick_zone": "as.india.karnataka.bangalore", "is_candidate_for_contact_info_suppression": false, "is_closed": false, "is_jfy_enabled": false, "is_long_closed": false, "latitude": "12.97669", "location_id": "2587630", "location_string": "Bengaluru, Bangalore District, Karnataka", "location_subtype": "none", "longitude": "77.595", "name": "Cubbon Park", "nearest_metro_station": [], "num_reviews": "2499", "offer_group": {"has_see_all_url": true, "is_eligible_for_ap_list": true, "lowest_price": "$5.99"}, "parent_display_name": "Bengaluru", "phone": "+91 98101 15661", "photo": {"caption": "Excellent for morning jog.", "helpful_votes": "12", "id": "316183883",  "is_blessed": false, "published_date": "2018-05-04T10:15:09-0400", "uploaded_date": "2018-05-04T10:15:09-0400"}, "preferred_map_engine": "default", "ranking": "#21 of 399 things to do in Bengaluru", "ranking_category": "attraction", "ranking_denominator": "399", "ranking_geo": "Bengaluru", "ranking_geo_id": "297628", "ranking_position": "21", "ranking_subcategory": "#21 of 399 things to do in Bengaluru", "rating": "4.0", "raw_ranking": "3.8148915767669678", "ride_providers": ["olaCabs"], "subcategory_ranking": "#21 of 399 things to do in Bengaluru", "timezone": "Asia/Kolkata", "write_review": "https://www.tripadvisor.com/UserReview-g297628-d2587630-Cubbon_Park-Bengaluru_Bangalore_District_Karnataka.html"}]
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
  }, [type]);
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

      <View className="mx-4">
      <AppSearchBar
          onChangeSearch={(text) => setquery(text)}
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
                Top Tips
              </Text>
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
