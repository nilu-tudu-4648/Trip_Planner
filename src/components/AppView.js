import { StyleSheet, View } from 'react-native'
import React from 'react'

const AppView = ({ children, style }) => {
    return (
        <View className={`flex-1 items-center justify-center p-5 bg-white ${style}`}>
            {children}
        </View>
    )
}

export default AppView

const styles = StyleSheet.create({})