import React from 'react'
import { StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { COLORS, SIZES } from '../constants/theme'



const AppSearchBar = ({
    searchQuery,
    placeholder,
    onChangeSearch,
    editable,
    style
}) => {
    return (
        <Searchbar
            placeholder={placeholder ? placeholder : "Search"}
            placeholderTextColor={COLORS.lightgray1}
            onChangeText={onChangeSearch}
            value={searchQuery}
            editable={editable}
            inputStyle={{ fontSize: 14 }}
            style={[styles.container, style]}
        />
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: .7,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base/2
    }
})
export default React.memo(AppSearchBar)