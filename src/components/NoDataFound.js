import { StyleSheet, View,Image } from 'react-native'
import React from 'react'
import { NotFound } from '../../assets'
import { SIZES } from '../constants/theme'
import AppText from './AppText'

const NoDataFound = () => {
  return (
    <View
    style={{
      width: "100%",
      height: SIZES.height*.8,
      alignItems: "center",
      justifyContent: "center",
      spaceBetween: 8,
    }}
  >
    <Image
      source={NotFound}
      style={{ width: 100, height: 100, objectFit: "cover" }}
    />
    <AppText
      style={{ fontSize: 20, color: "#428288", fontWeight: "600" }}
    >
      Oops... No Data Found
    </AppText>
  </View>
  )
}

export default NoDataFound

const styles = StyleSheet.create({})