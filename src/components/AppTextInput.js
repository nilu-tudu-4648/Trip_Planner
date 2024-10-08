import React from "react";
import { KeyboardAvoidingView, StyleSheet, TextInput, } from "react-native";
import { COLORS, SIZES, } from "../constants/theme";

const AppTextInput = ({
    style,
    inputStyle,
    onChangeText,
    placeholder,
    keyboardType,
    ...otherProps
}) => {
    return (
        <KeyboardAvoidingView style={[styles.container, style]}>
            <TextInput
                placeholderTextColor={COLORS.gray}
                placeholder={placeholder}
                style={[styles.textInput, inputStyle]}
                onChangeText={onChangeText}
                
                keyboardType={keyboardType ? keyboardType : "default"}
                {...otherProps}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        width: "100%",
        justifyContent: "center",
    },
    textInput: {
        height: SIZES.largeTitle * .95,
        padding: SIZES.base,
        borderRadius: SIZES.base1,
        borderColor: COLORS.gray,
        borderWidth: .5,
        fontSize: SIZES.h4*.7,
        color: COLORS.gray,

    }
});

export default AppTextInput;
