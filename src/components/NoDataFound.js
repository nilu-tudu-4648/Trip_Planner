import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { NotFound } from '../../assets'

const NoDataFound = () => {
  return (
    <View
    style={{
      width: "100%",
      height: 400,
      alignItems: "center",
      justifyContent: "center",
      spaceBetween: 8,
    }}
  >
    <Image
      source={NotFound}
      style={{ width: 128, height: 128, objectFit: "cover" }}
    />
    <Text
      style={{ fontSize: 24, color: "#428288", fontWeight: "600" }}
    >
      Oops... No Data Found
    </Text>
  </View>
  )
}

export default NoDataFound

const styles = StyleSheet.create({})