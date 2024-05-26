import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const AppHeader = ({header}) => {
    const navigation = useNavigation()
    const _goBack = () => navigation.goBack();

  return (
    <Appbar.Header>
    <Appbar.BackAction onPress={_goBack} />
    <Appbar.Content title={header}/>
  </Appbar.Header>
  )
}

export default AppHeader

const styles = StyleSheet.create({})