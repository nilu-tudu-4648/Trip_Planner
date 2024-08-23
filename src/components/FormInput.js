import React from "react";
import { StyleSheet } from "react-native";
import { COLORS, SIZES, } from "../constants/theme";
import { Controller } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import AppText from "./AppText";

const FormInput = ({
    control,
    name,
    placeholder,
    rules = {},
    keyboardType,
    maxLength,
    inputStyle,
    errorDisabled,
    ...otherProps
}) => {

    return (
        <Controller
            control={control}
            rules={rules}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <>
                <AppText size={1.7} style={{marginVertical:SIZES.base1,left:SIZES.paddingShort}}>{placeholder}</AppText>
                    <AppTextInput
                        onBlur={onBlur}
                        keyboardType={keyboardType}
                        onChangeText={onChange}
                        value={value}
                        maxLength={maxLength}
                        inputStyle={[{ borderColor: error ? 'red' : COLORS.gray }, inputStyle]}
                        {...otherProps}
                    />
                    {error ? !errorDisabled && <AppText style={styles.error}>{error.message || "Error"}</AppText> : <AppText style={styles.error}>{ }</AppText>}
                </>
            )}
        />
    );
};

const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: SIZES.h6,
        left:SIZES.paddingShort
    }
});

export default FormInput;
