import { StyleSheet, Image, View,ScrollView } from 'react-native'
import React from 'react'
import { AppButton, AppHeader, AppText, AppTextInput, AppView } from '../components'

import { COLORS, SIZES } from "../constants/theme";
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
const ProfileScreen = () => {
  const { user } = useSelector((state) => state.entities.localReducer);
 
  const handleSubmit=()=>{

  }
  return (
    <>
    <AppHeader header={'Profile'}/>
    <AppView>
      {
        user.profilePic?
        <Avatar.Image size={SIZES.height*.1} source={{uri:user.profilePic}} />:
        <Avatar.Icon size={SIZES.height*.1} icon="account" />
      }

    {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        {/* <Image source={require("../../assets/icon.png")} style={styles.logo} /> */}
        <View style={styles.inputContainer}>
          <AppTextInput
            placeholder={"First name"}
            name="firstName"
          />
          <AppTextInput
            placeholder={"Last Name"}
            name="lastName"
          />
          <AppTextInput
            placeholder={"Email"}
            name="email"
          />
          <AppTextInput
            keyboardType={"numeric"}
            placeholder={"Enter Mobile Number"}
            name="mobile"
            maxLength={10}
          />
          <AppTextInput
          style={styles.inputStyle}
            placeholder={"Password"}
            name="password"
          />
        </View>
        <View style={{width:'100%'}}>
        <AppButton title="Update" onPress={handleSubmit()} />
      </View>
      {/* </ScrollView> */}
      <AppText>Version: 1.00</AppText>
    </AppView>
    </>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  inputContainer: {
    flex:1,
    width:'100%',
    marginVertical: SIZES.padding * 2,
    justifyContent:'space-around'
  },
  inputStyle:{
width:'100%'
  }
})