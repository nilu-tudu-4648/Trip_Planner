import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AppButton, AppLoader, AppText, DrawerHeader } from "../components";
import Carousel from "react-native-reanimated-carousel";
import { SIZES } from "../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoomsDataFunc,
  updateUser,
} from "../constants/functions";
import { NAVIGATION } from "../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { FIRESTORE_COLLECTIONS } from "../constants/data";
import { db } from "../../firebaseConfig";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
const ItemScreen = ({ route }) => {
  const { user } = useSelector((state) => state.entities.localReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data = route?.params?.param;
  const [details, setdetails] = useState([]);
  const [likedData, setlikedData] = useState(0);
  const [loading, setloading] = useState(false);
  const addtoLikedPlace = async () => {
    try {
      const userLikedPlaces = user.likedPlaces || [];
      const checkLiked = userLikedPlaces.includes(data.adTitle)
        ? userLikedPlaces.filter((item) => item !== data.adTitle)
        : [...userLikedPlaces, data.adTitle];
      const setMainData = () => {};
      const setIsLoading = () => {};
      const updatedUserData = { ...user, likedPlaces: checkLiked };
      await updateUser(updatedUserData, dispatch);
      getRoomsDataFunc(dispatch, setMainData, setIsLoading, user);
    } catch (error) {
      console.log(error);
    }
  };
  const addViewDataToDB = async () => {
    try {
      const adCollectionRef = collection(
        db,
        FIRESTORE_COLLECTIONS.ITEM_LIKE_VIEWS
      );
      const docRef = doc(adCollectionRef, data.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          adTitle: arrayUnion(user.id),
        });
        setdetails(docSnap.data().adTitle.length);
      } else {
        const adData = {
          adTitle: [user.id],
        };
        await setDoc(docRef, adData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    addViewDataToDB();
  }, [data]);
  const addDataToDB = async () => {
    addtoLikedPlace();
    setloading(true);
    try {
        const adCollectionRef = collection(
            db,
            FIRESTORE_COLLECTIONS.ITEM_LIKE_VIEWS
        );
        const docRef = doc(adCollectionRef, data.id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const docData = docSnap.data();
            const currentLikedArray = docData.liked || [];
            setlikedData(currentLikedArray.length)
            if (currentLikedArray.includes(user.id)) {
                // If user already liked the item, remove from the liked array
                await updateDoc(docRef, {
                    liked: currentLikedArray.filter((id) => id !== user.id),
                });
                setlikedData((prev) => prev - 1); // Decrement the likedData count
            } else {
                // If user hasn't liked the item yet, add to the liked array
                await updateDoc(docRef, {
                    liked: arrayUnion(user.id),
                });
                setlikedData((prev) => prev + 1); // Increment the likedData count
            }
        } else {
            // If the document does not exist, create it with the user as the first liked entry
            const adData = {
                adTitle: [user.id],
                liked: [user.id], // Initialize liked array with the user ID
            };
            await setDoc(docRef, adData);
            setlikedData(1); // Set likedData to 1 as it's the first like
        }
    } catch (error) {
        console.error(error);
    } finally {
        setloading(false);
    }
};


  const mobileNumber = "9155186701";
  const initiateWhatsApp = () => {
    if (mobileNumber.length != 10) {
      alert("Please insert correct WhatsApp number");
      return;
    }
    const whatsAppMsg = `Hi ,I want this room name:${data}`;
    let url =
      "whatsapp://send?text=" + whatsAppMsg + "&phone=91" + mobileNumber;
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened");
      })
      .catch(() => {
        alert("Make sure Whatsapp installed on your device");
      });
  };
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.navigate(NAVIGATION.DISCOVER);
      return () => true;
    },
    []
  );
  const imageUrls = data.roomPics
    ? Object.values(data.roomPics).filter((url) => url.trim() !== "")
    : [];

  const dataSource =
    imageUrls.length > 0 ? imageUrls : [require("../../assets/roomImage.jpeg")];

  const {
    Bedroom,
    type,
    Bathroom,
    Furnishing,
    Listedby,
    CarParking,
    superBuiltArea,
    carpetArea,
    maintenance,
    floorNo,
  } = data;
  const Datas = {
    Type: type,
    Bedrooms: Bedroom,
    Bathroom,
    Furnishing,
    "Listed by": Listedby,
    "Car Parking": CarParking,
    "Super Builtup area": superBuiltArea,
    "Carpet Area (ft)": carpetArea,
    Maintenance: maintenance,
    "Total Floors": floorNo,
  };
  return (
    <SafeAreaView className="flex-1 bg-white relative py-5">
       {loading && <AppLoader loading={loading} /> }
      <DrawerHeader user={user} iconColor={"black"} />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
        <View className="relative bg-white shadow-lg">
          <Carousel
            loop
            width={SIZES.width}
            height={SIZES.width / 1.2}
            data={dataSource}
            scrollAnimationDuration={1000}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    typeof item === "string" && item.startsWith("http")
                      ? { uri: item }
                      : item // Local image
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "stretch",
                  }}
                />
              </View>
            )}
          />
        </View>
        {/* Details Section */}
        <View className="mt-6">
          <View className="flex-row justify-between">
            <AppText className="text-[black] text-[26px] font-bold">
              ₹{data?.price}
            </AppText>
            {!data.ads && (
              <TouchableOpacity
              onPress={async () => {// Toggle the liked state
                await addDataToDB(); // Call the function after toggling the state
              }}
                className="w-10 h-10 rounded-md items-center justify-center"
              >
                <AntDesign
                  name={
                    user?.likedPlaces?.includes(data.adTitle)
                      ? "heart"
                      : "hearto"
                  }
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{ height: 0.7, backgroundColor: "gray", marginVertical: 1 }}
          />
          <View className="flex-row items-center justify-between space-x-2 my-1">
            <AppText className="text-[#8C9EA6] text-[15px] font-bold">
              {data?.location}
            </AppText>
            <AppText className="text-[#8C9EA6] text-[15px] font-bold">
           {likedData} likes   {details? details : "1"} views
            </AppText>
          </View>
        </View>
        <View
          style={{ height: 0.7, backgroundColor: "gray", marginVertical: 1 }}
        />
        <AppText className="text-[#515151] font-bold text-[22px]">Details</AppText>
        {Object.keys(Datas).map((item) => (
          <View key={item} className="flex-row justify-between">
            <AppText className="my-1">{item}</AppText>
            <View>
              <AppText>{Datas[item]}</AppText>
            </View>
          </View>
        ))}
        <AppText className="text-[#515151] font-bold text-[22px]">
          Description
        </AppText>
        {data?.description && (
          <AppText className="tracking-wide text-[16px] font-semibold text-[#97A6AF]">
            {data?.description}
          </AppText>
        )}
      </ScrollView>
      <View className="space-y-2 rounded-2xl px-4 py-2">
        <AppButton
          disabled={data.booked === "true"}
          onPress={initiateWhatsApp}
          title={data.booked === "true" ? "Already Booked" : "Book Now"}
        />
      </View>
    </SafeAreaView>
  );
};

export default ItemScreen;
