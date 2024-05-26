import { StyleSheet, View, BackHandler, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { COLORS, FSTYLES, SIZES } from "../constants/theme";
import { useForm } from "react-hook-form";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import FormInput from "../components/FormInput";
import AppLoader from "../components/AppLoader";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NAVIGATION } from "../constants/routes";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../store/localReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIRESTORE_COLLECTIONS } from "../constants/data";
import { showToast } from "../constants/functions";
import { TouchableOpacity } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const [forgotPin, setforgotPin] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "9155186702",
      password: "123",
    },
  });
  const dispatch = useDispatch();
  async function getUser(mobile, forgot = false) {
  try {
    const q = query(
      collection(db, FIRESTORE_COLLECTIONS.USERS),
      where("mobile", "==", mobile)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      if (forgot) {
        showToast(`Your password is ${data.password}`);
      }
      return data;
    }
    // User does not exist
    showToast('User does not exist');
    return null;
  } catch (error) {
    console.error('Error fetching user:', error);
    // Handle error accordingly, e.g., show error toast
    showToast('Error fetching user. Please try again later.');
    return null;
  }
}
  const handleSignIn = async (phone, password) => {
    const userExists = await getUser(phone);

    if (!userExists) {
      showToast("Invalid credentials");
      console.log("User login failed.");
      return;
    }
    const checkPassword = userExists.password === password;
    if (checkPassword) {
      dispatch(setLoginUser(userExists));
      await AsyncStorage.setItem('loggedInUser',JSON.stringify(userExists))
      showToast("Login successful");
    } else {
      showToast("Invalid credentials");
      console.log("User login failed.");
    }
  };
  const onSubmit = async (data) => {
    if (forgotPin) {
      await getUser(data.phone, true);
      setforgotPin(false);
    } else {
      setloading(true);
      try {
        await handleSignIn(data.phone, data.password);
      } catch (error) {
        console.log(error, "err");
        showToast("Something went wrong");
      } finally {
        setloading(false);
      }
    }
  };
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.navigate(NAVIGATION.WELCOME);
      return () => true;
    },
    []
  );
  const phonePattern = /^[6-9][0-9]{9}$/;
  return (
    <View style={styles.container}>
      <AppLoader loading={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.logo}
          />
          <AppText bold={true} style={styles.title}>
            {"Login"}
          </AppText>
        </View>
        <View style={styles.inputContainer}>
          <FormInput
            control={control}
            rules={{
              required: "This field is mandatory",
              pattern: {
                value: phonePattern,
                message: "Please enter a valid phone number",
              },
              minLength: {
                value: 10,
                message: "Please enter a valid phone number",
              },
            }}
            keyboardType="numeric"
            placeholder="Enter Mobile Number"
            name="phone"
            maxLength={10}
          />
          {!forgotPin ? (
            <FormInput
              control={control}
              rules={{ required: "This field is mandatory" }}
              placeholder="Password"
              name="password"
              secureTextEntry={true}
            />
          ) : null}
<View style={FSTYLES}>
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => setforgotPin(true)}
          >
            <AppText size={1.3}>Forgot Pin?</AppText>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => navigation.navigate(NAVIGATION.SIGN_UP)}
          >
            <AppText color={COLORS.background} size={1.3}>New User?</AppText>
          </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 0.4 }} />
      </ScrollView>
      <View>
        <AppButton
          title={forgotPin ? "Get Password" : "Login"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    alignSelf: "center",
    marginVertical: SIZES.padding * 2,
  },
  title: {
    alignSelf: "center",
    marginVertical: SIZES.h3,
    fontSize: SIZES.h2,
  },
  inputContainer: {
    marginVertical: SIZES.padding * 2,
  },
});
