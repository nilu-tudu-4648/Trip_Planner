import { StyleSheet, View, ToastAndroid, TouchableOpacity } from "react-native";
import React, {  useState } from "react";
import { COLORS, SIZES, STYLES, } from "../constants/theme";
import { useForm } from "react-hook-form";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import FormInput from "../components/FormInput";
import AppLoader from "../components/AppLoader";
import { AppView } from "../components";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, } from 'firebase/auth';
import { auth, db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLoginUser } from "../store/localReducer";
import { useDispatch } from "react-redux";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const LoginScreen = () => {
  const [loading, setloading] = useState(false)
  const [register, setregister] = useState(false)
  const dispatch = useDispatch()
  const handleSignUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        ToastAndroid.show("Sign Up successfully", ToastAndroid.SHORT);
        setregister(false)
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };
  const handleSignIn = async (email, password) => {
    setloading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if (userCredential.user) {
        const user = userCredential.user;
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(user))
        dispatch(setLoginUser(user))
        const usersCollectionRef = collection(db, "users");
        const userQuery = query(usersCollectionRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(userQuery);
        if (querySnapshot.empty) {
          await addDoc(usersCollectionRef, {
            userId: user.uid,
            email: user.email
          });
        }
        ToastAndroid.show("Login successfully", ToastAndroid.SHORT);
        setloading(false)
      }
    } catch (error) {
      setloading(false)
      ToastAndroid.show("Invalid credentials", ToastAndroid.SHORT);
      console.log('An error occurred:', error);
    }
  };
  const { control, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: {
      email: '', password: ''
    },
  });
  const onSubmit = async (data) => {
    setloading(true);

    try {
      // api calls
      if (!register) {
        await handleSignIn(data.email, data.password);
      } else {
        await handleSignUp(data.email, data.password);
      }
    } catch (error) {
      console.log(error, 'err');
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    } finally {
      setloading(false);
    }
  };

  const rules = {
    required: "This field is mandatory",
  };
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return (
    <>
      <AppLoader loading={loading} />
      <AppView>
        <AppText bold={true} style={{ alignSelf: 'center', marginTop: SIZES.h1 * 2 }} size={2.5}>{register ? 'Register' : 'Login'}</AppText>
        <View style={{ width: '99%' }}>
          <View>
            <AppText style={styles.smallText}>{'Email'}</AppText>
            <FormInput
              control={control}
              rules={{
                required: "This field is mandatory",
                pattern: {
                  value: emailPattern,
                  message: "Invalid Email Address",
                },
              }}
              keyboardType={'email-address'}
              placeholder={"email"}
              name="email"
            />
          </View>
          <View>
            <AppText style={styles.smallText}>{'Password'}</AppText>
            <FormInput
              control={control}
              rules={rules}
              placeholder={"password"}
              name="password"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity onPress={() => setregister(true)}>
            <AppText style={{ ...styles.smallText, alignSelf: 'flex-end' }}>{'New user? Sign up'}</AppText>
          </TouchableOpacity>
          <View style={{ height: SIZES.h1 }} />
        </View>
        <AppButton
          title={register ? 'Register' : 'Login'}
          onPress={handleSubmit(onSubmit)}
        />
      </AppView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
  },
  container: {
    ...STYLES,
    width: "100%",
    marginTop: SIZES.h1,
    height: SIZES.height,
    paddingHorizontal: SIZES.h4,
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  smallText: {
    fontSize: SIZES.h6,
    alignSelf: "stretch",
  },

});
