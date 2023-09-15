import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../../assets";
import MenuContainer from "../components/MenuContainer";

import { FontAwesome } from "@expo/vector-icons";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { getPlacesData } from "../../api";
import { AppLoader } from "../components";

const Discover = ({ navigation }) => {
  const [type, setType] = useState("attractions");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([{"address": "Chord Road Hare Krishna Hill, Bengaluru 560010 India", "address_obj": {"city": "Bengaluru", "country": "India", "postalcode": "560010", "state": "Karnataka", "street1": "Chord Road", "street2": "Hare Krishna Hill"}, "ancestors": [{"abbrv": null, "location_id": "297628", "name": "Bengaluru", "subcategory": [Array]}, {"abbrv": null, "location_id": "12392950", "name": "Bangalore District", "subcategory": [Array]}, {"abbrv": null, "location_id": "297627", "name": "Karnataka", "subcategory": [Array]}, {"abbrv": null, "location_id": "293860", "name": "India", "subcategory": [Array]}], "awards": [], "bearing": "northwest", "booking": {"provider": "Viator", "url": "https://www.tripadvisor.com/Commerce?url=https%3A%2F%2Fwww.viator.com%2Ftours%2FBangalore%2FPrivate-Full-Day-Tour-of-Bangalore-City%2Fd5310-34682P13%3Feap%3Dmobile-app-11383%26aid%3Dtripenandr&partnerKey=1&urlKey=b4d414647ba194647&logme=true&uidparam=refid&attrc=true&Provider=Viator&area=TOP&slot=1&cnt=1&geo=325162&clt=TM&from=api&nt=true"}, "category": {"key": "attraction", "name": "Attraction"}, "description": "ISKCON Sri Radha Krishna temple was inaugurated in the year 1997. It is not just a temple, but a cultural complex housing the temples dedicated to the Deities of Sri Sri Radha Krishnachandra, Sri Sri Krishna Balarama, Sri Sri Nitai Gauranga, Sri Srinivasa Govinda, Sri Prahlada Narasimha, Bhakta Hanuman, Garudadeva and Srila Prabhupada, Founder Acharya of ISKCON. ISKCON Bangalore is a charitable society with the objective of propagating Krishna Consciousness all over the world, as explained by Srila Prabhupada, whose teachings are based on Bhagavad-gita and Srimad Bhagavatam.", "distance": "6.489226543554558", "distance_string": "6.5 km", "doubleclick_zone": "as.india.karnataka.bangalore", "email": "iskcon.communications@hkm-group.org", "fee": "YES", "hours": {"timezone": "Asia/Kolkata", "week_ranges": [[Array], [Array], [Array], [Array], [Array], [Array], [Array]]}, "is_candidate_for_contact_info_suppression": false, "is_closed": false, "is_jfy_enabled": false, "is_long_closed": false, "latitude": "12.983932", "location_id": "325162", "location_string": "Bengaluru, Bangalore District, Karnataka", "location_subtype": "none", "longitude": "77.57959", "name": "ISKCON Temple Bangalore", "nearest_metro_station": [], "num_reviews": "4842", "offer_group": {"has_see_all_url": true, "is_eligible_for_ap_list": true, "lowest_price": "$0.01", "offer_list": [[Object], [Object], [Object], [Object], [Object]]}, "open_now_text": "Opens in 12 min", "parent_display_name": "Bengaluru", "phone": "+91 98101 15661", "photo": {"caption": "Front view of temple", "helpful_votes": "2", "id": "597864848", "images": {"large": [Object], "medium": [Object], "original": [Object], "small": [Object], "thumbnail": [Object]}, "is_blessed": true, "published_date": "2022-05-31T06:26:55-0400", "uploaded_date": "2022-05-31T06:26:55-0400", "user": {"member_id": "0", "type": "user", "user_id": null}}, "preferred_map_engine": "default", "ranking": "#7 of 395 things to do in Bengaluru", "ranking_category": "attraction", "ranking_denominator": "395", "ranking_geo": "Bengaluru", "ranking_geo_id": "297628", "ranking_position": "7", "ranking_subcategory": "#7 of 395 things to do in Bengaluru", "rating": "4.5", "raw_ranking": "3.9691824913024902", "ride_providers": ["olaCabs"], "subcategory": [{"key": "47", "name": "Sights & Landmarks"}], "subcategory_ranking": "#7 of 395 things to do in Bengaluru", "subtype": [{"key": "10", "name": "Sacred & Religious Sites"}], "timezone": "Asia/Kolkata", "web_url": "https://www.tripadvisor.com/Attraction_Review-g297628-d325162-Reviews-ISKCON_Temple_Bangalore-Bengaluru_Bangalore_District_Karnataka.html", "website": "http://www.iskconbangalore.org/", "write_review": "https://www.tripadvisor.com/UserReview-g297628-d325162-ISKCON_Temple_Bangalore-Bengaluru_Bangalore_District_Karnataka.html"}]);
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
  useEffect(() => {
    // getPlacesDataFunc()
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  return (
    <SafeAreaView className="flex-1 bg-white relative my-4">
      <View className="flex-row items-center justify-between p-6">
        <View>
          <Text className="text-[30px] text-[#0B646B] font-bold my-2">Discover</Text>
          <Text className="text-[#527283] text-[26px]">the beauty today</Text>
        </View>

        <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover"
          />
        </View>
      </View>

      <View className="flex-row items-center  p-1 bg-white mx-4 rounded-xl px-4 shadow-lg mt-4">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
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
