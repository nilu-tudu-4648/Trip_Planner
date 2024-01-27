import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppButton, AppHeader, AppText, AppTextInput, AppView } from '../components';
import { SIZES } from "../constants/theme";
import { logoutUser, updateUser } from '../constants/functions';

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.entities.localReducer);
  const [input, setinput] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    mobile: user.mobile || '',
 });
const dispatch = useDispatch()
  const handleSubmit = async() => {
    try {
      const data = {...user,...input}
    await  updateUser(data,dispatch)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <AppHeader header={'Profile'} />
    <AppView>
      <View style={styles.avatarContainer}>
        {user.profilePic ? (
          <Avatar.Image size={SIZES.height * 0.1} source={{ uri: user.profilePic }} />
        ) : (
          <Avatar.Icon size={SIZES.height * 0.1} icon="account" />
        )}
      </View>
      <View style={styles.inputContainer}>
        <AppTextInput
          placeholder={"First name"}
          name="firstName"
          value={input.firstName}
          onChangeText={(text) => setinput({ ...input, firstName: text.trim() })}      
        />
        <AppTextInput
          placeholder={"Last Name"}
          name="lastName"
          value={input.lastName}
          onChangeText={(text) => setinput({ ...input, lastName: text.trim() })}        
        />
        <AppTextInput
          placeholder={"Email"}
          name="email"
          value={input.email}
          onChangeText={(text) => setinput({ ...input, email: text.trim() })}          
        />
        <AppTextInput
          keyboardType={"numeric"}
          placeholder={"Enter Mobile Number"}
          name="mobile"
          maxLength={10}
          value={input.mobile}
          onChangeText={(text) => setinput({ ...input, mobile: text.trim() })}
        />
      </View>
      <AppButton title="Update" onPress={handleSubmit} />
      <AppText size={1}>Version: 1.0.0</AppText>
      <TouchableOpacity onPress={()=>logoutUser(dispatch)}>
      <AppText>Logout</AppText>
      </TouchableOpacity>
    </AppView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginVertical: SIZES.padding,
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    marginVertical: SIZES.padding * 2,
    justifyContent: 'space-around',
  },
  inputStyle: {
    width: '100%',
  },
});
