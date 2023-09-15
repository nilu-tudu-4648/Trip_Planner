import React from "react";
import { StyleSheet, TouchableOpacity, } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import AppText from "./AppText";


const AppButton = ({
    title,
    onPress,
    style,
    borderColor,
    textStyle,
    disabled,
    varient
}) => {
    return (
        <>
            {
                varient ?
                    <TouchableOpacity disabled={disabled}
                        onPress={onPress} style={
                            [{
                                ...styles.bntstyle,
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderColor: borderColor ? borderColor : 'green',
                            }, style]
                        }>
                        < AppText size={1.5} bold={true} style={[{ color: borderColor ? borderColor : 'green' }, textStyle]} >{title}</AppText >
                    </TouchableOpacity > :
                    <TouchableOpacity disabled={disabled} onPress={onPress}
                        style={[{ ...styles.bntstyle, backgroundColor: disabled ? COLORS.gray : COLORS.background, }, style]}>
                        <AppText style={[styles.text, textStyle]}>{title}</AppText>
                    </TouchableOpacity>
            }
        </>
    );
};

const styles = StyleSheet.create({
    bntstyle: {
        borderRadius: SIZES.base,
        width: '100%',
        justifyContent: 'center',
        height: SIZES.h1 * 1.5,
        alignItems: 'center',
        marginHorizontal: 3,
        backgroundColor: COLORS.background,
        alignSelf: 'center'
    },
    text: {
        ...FONTS.h5,
        color: COLORS.white,
    },
});

export default React.memo(AppButton)
