import {
  AppHeader,
  FormInput,
  RoomImages,
  SelectChip,
  StyleView,
} from "../components";
import { StyleSheet, ScrollView, BackHandler, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AppText from "../components/AppText";
import AppLoader from "../components/AppLoader";
import { db } from "../../firebaseConfig";
import { AppButton } from "../components";
import {
  addDoc,
  collection,
  getDocs,
  query,
  runTransaction,
  updateDoc,
  where,
} from "firebase/firestore";
import { NAVIGATION } from "../constants/routes";
import {
  BachelorsAllowed,
  bedroomData,
  CarParking,
  createSellingdata,
  FIRESTORE_COLLECTIONS,
  furnishingOptions,
  Listedby,
  SellingTypes,
  types,
} from "../constants/data";
import { showToast } from "../constants/functions";
import { useNavigation } from "@react-navigation/native";

const CreateSelling = ({ route }) => {
  const { user } = route.params;
  const [loading, setloading] = useState(false);
  const [tabSelect, settabSelect] = useState(false);
  const [formdata, setFormdata] = useState(createSellingdata);

  async function getAdExistsInDatabase(adTitle) {
    const q = query(
      collection(db, FIRESTORE_COLLECTIONS.AD_DATA),
      where("adTitle", "==", adTitle)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length > 0;
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      adTitle: "",
      description: "",
      superBuiltArea: "",
      carpetArea: "",
      maintenance: "",
      totalFloors: "",
      floorNo: "",
      mobile: "",
      price: "",
    },
  });
  const onSubmit = async (data) => {
    const {
      adTitle,
      description,
      superBuiltArea,
      carpetArea,
      maintenance,
      totalFloors,
      floorNo,
      price,
      mobile,
    } = data;

    try {
      setloading(true); // Ensure setloading is defined in the component using this hook
      const adExists = await getAdExistsInDatabase(adTitle);
      if (adExists) {
        showToast("Ad already exists");
        return;
      } else {
        await runTransaction(db, async (transaction) => {
          const adCollectionRef = collection(db, FIRESTORE_COLLECTIONS.AD_DATA);
          const adData = {
            userId: user.id,
            adTitle,
            description,
            id: "",
            maintenance,
            price,
            superBuiltArea,
            carpetArea,
            mobile,
            totalFloors,
            floorNo,
            createdAt: new Date(),
            ...formdata, 
          };
          const docRef = await addDoc(adCollectionRef, adData);
          await updateDoc(docRef, { id: docRef.id });
          showToast("Ad posted successfully");
        });
      }
      // Optionally navigate to another screen
      navigation.navigate(NAVIGATION.DISCOVER);
    } catch (error) {
      console.error("An error occurred during sign-up:", error);
      showToast("Ad post failed. Please try again.");
    } finally {
      setloading(false); // Ensure setloading is defined in the component using this hook
    }
  };
  const rules = {
    required: "",
  };
  const handleSelectChange = (field, value) => {
    setFormdata((prevFormdata) => ({
      ...prevFormdata,
      [field]: value,
    }));
  };
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (tabSelect) {
          settabSelect(false);
          return true; // Return true to prevent default back behavior
        }
        navigation.navigate(NAVIGATION.DISCOVER); // Adjust the route name if needed
        return true;
      }
    );

    return () => backHandler.remove(); // Clean up the event listener
  }, [tabSelect, settabSelect, navigation]);
  const phonePattern = /^[6-9][0-9]{9}$/;
  return (
    <>
      <AppHeader header={"Properties"} />
      <StyleView>
        <AppLoader loading={loading} />
        {tabSelect !== true ? (
          <>
            {SellingTypes.map(
              (item, i) => (
                <Pressable key={i} onPress={() => settabSelect(true)}>
                  <AppText style={{marginVertical:6}}>{item}</AppText>
                </Pressable>
              )
            )}
          </>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <SelectChip
                selected={formdata.type}
                setSelect={(value) => handleSelectChange("type", value)}
                data={types}
                type="Type*"
              />
              <SelectChip
                selected={formdata.Bedroom}
                setSelect={(value) => handleSelectChange("Bedroom", value)}
                data={bedroomData}
                type="Bedrooms"
              />
              <SelectChip
                selected={formdata.Bathroom}
                setSelect={(value) => handleSelectChange("Bathroom", value)}
                data={bedroomData}
                type="Bathrooms"
              />
              <SelectChip
                selected={formdata.Furnishing}
                setSelect={(value) => handleSelectChange("Furnishing", value)}
                data={furnishingOptions}
                type="Furnishing"
              />
              <SelectChip
                selected={formdata.Listedby}
                setSelect={(value) => handleSelectChange("Listedby", value)}
                data={Listedby}
                type="Listed by"
              />
              <FormInput
                control={control}
                rules={rules}
                placeholder={"Super Builtup area(ft)"}
                name="superBuiltArea"
              />
              <FormInput
                control={control}
                rules={rules}
                placeholder={"Carpet Area(ft)"}
                name="carpetArea"
              />

              <SelectChip
                selected={formdata.BachelorsAllowed}
                setSelect={(value) =>
                  handleSelectChange("BachelorsAllowed", value)
                }
                data={BachelorsAllowed}
                type="Bachelors Allowed"
              />

              <FormInput
                control={control}
                rules={rules}
                placeholder={"Maintenance(Monthly)"}
                name="maintenance"
              />
              <FormInput
                control={control}
                rules={rules}
                keyboardType={"numeric"}
                placeholder={"Total Floors"}
                name="totalFloors"
              />
              <FormInput
                control={control}
                rules={rules}
                keyboardType={"numeric"}
                placeholder={"Floor No"}
                name="floorNo"
              />
              <SelectChip
                selected={formdata.CarParking}
                setSelect={(value) => handleSelectChange("CarParking", value)}
                data={CarParking}
                type="Car Parking"
              />
              <FormInput
                control={control}
                rules={rules}
                placeholder={"Ad Title"}
                name="adTitle"
              />
              <FormInput
                control={control}
                rules={rules}
                inputStyle={{}}
                placeholder={"Add Description"}
                name="description"
              />
              <FormInput
                control={control}
                rules={rules}
                placeholder={"Price"}
                name="price"
              />
              <FormInput
                control={control}
                rules={{
                  required: "This field is mandatory",
                  pattern: {
                    value: phonePattern,
                    message: "Please enter valid Phone number",
                  },
                  minLength: {
                    value: 10,
                    message: "Please enter valid Phone number",
                  },
                }}
                keyboardType={"numeric"}
                placeholder={"Enter Mobile Number"}
                name="mobile"
                maxLength={10}
              />
              <RoomImages setFormdata={setFormdata} />
            </ScrollView>
            <AppButton title="Post Now" onPress={handleSubmit(onSubmit)} />
          </>
        )}
      </StyleView>
    </>
  );
};

export default CreateSelling;

const styles = StyleSheet.create({});
