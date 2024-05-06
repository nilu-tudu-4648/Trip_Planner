import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from '../constants/routes';
import { Avatar } from '../../assets';

const HomeHeader = ({header}) => {
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');
  const navigation = useNavigation()
    const { user } = useSelector((state) => state.entities.localReducer);
    const _handleMore = () => console.log('Shown more');
  return (
    <Appbar.Header>
    <Appbar.BackAction onPress={_goBack} />
    <Appbar.Content title={header}/>
    <Appbar.Action icon="magnify" onPress={_handleSearch} />
    <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION.PROFILE)}
            className="w-12 h-12 bg-gray-400 rounded-md self-end items-center justify-center shadow-lg"
          >
            <Image
              source={user.profilePic? {uri:user.profilePic} : Avatar}
              className="w-full h-full rounded-md object-cover"
            />
          </TouchableOpacity>
  </Appbar.Header>
  )
}

export default HomeHeader

const styles = StyleSheet.create({})