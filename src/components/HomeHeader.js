import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper';

const HomeHeader = ({header}) => {
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');
  
    const _handleMore = () => console.log('Shown more');
  return (
    <Appbar.Header>
    <Appbar.BackAction onPress={_goBack} />
    <Appbar.Content title={header}/>
    <Appbar.Action icon="magnify" onPress={_handleSearch} />
    <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
  </Appbar.Header>
  )
}

export default HomeHeader

const styles = StyleSheet.create({})