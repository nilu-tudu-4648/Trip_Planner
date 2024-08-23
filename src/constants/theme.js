import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: 'rgba(13, 125, 227, 1)',
    secondary: "rgba(238, 238, 238, 1)",
    background: '#06B2BE',
    // colors
    black: "rgba(0, 0, 0, 1)",
    white: "rgba(255, 255, 255, 1)",
    lightwhite: "rgb(255, 255, 255)",
    lightgray: 'rgba(238, 238, 238, 0.5)',
    gray: 'rgba(0, 0, 0, 0.4)',
    lightgray1: 'lightgray',
    lightgray2: 'rgba(0, 0, 0, 0.8)',
    red: '#EB121E',
    green: '#00cc7a',
    lighttext: "rgba(0, 0, 0, 0.5)",
    //others
    transparent: "transparent",
    yellow: '#F1D31A',
    lightyellow: "#FFFCEA",
    purple1: '#613DC1',
    purple2: '#858AE3',
    purple3: '#4E148C',
    purple4: 'rgba(97, 61, 193, 1)',
    //blue
    blue: '#2E85E0',
    darkblue: 'rgba(25, 73, 137, 1)'

};

export const STYLES = {
    justifyContent: 'center',
    alignItems: 'center'
}
export const FSTYLES = {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
}

export const SIZES = {
    // global sizes
    base: width * .03,
    base1: width * .02,
    base2: width * .001,
    font: 14,
    radius: 30,
    paddingShort: width * .01,
    padding: width * .02,
    padding2: width * .05,

    // font sizes
    largeTitle: width * .14,
    mediumTitle: width * .1,
    h1: width * .08,
    h2: width * .065,
    h3: width * .055,
    h4: width * .045,
    h5: width * .03,
    h6: width * .026,
    h7: width * .020,
    // app dimensions
    width,
    height
};

export const FONTS = {
    h1: { fontSize: SIZES.h1, color: COLORS.black, fontWeight: '700', lineHeight: width * .09 },
    h2: { fontSize: SIZES.h2, color: COLORS.black, fontWeight: '700', lineHeight: width * .08 },
    h3: { fontSize: SIZES.h3, color: COLORS.black, fontWeight: '700', lineHeight: width * .07 },
    h4: { fontSize: SIZES.h4, color: COLORS.black, fontWeight: '700', lineHeight: width * .06 },
    h5: { fontSize: SIZES.h5, color: COLORS.black, fontWeight: '700', lineHeight: width * .05 },
    h6: { fontSize: SIZES.h6, color: COLORS.black, fontWeight: '700', lineHeight: width * .04 },
};
export const RFONTS = {
    h7: { fontSize: width * .02, color: COLORS.black, fontWeight: '700' },
    h6: { fontSize: width * .03, color: COLORS.black, fontWeight: '700' },
    h5: { fontSize: width * .04, color: COLORS.black, fontWeight: '700' },
    h4: { fontSize: width * .05, color: COLORS.black, fontWeight: '700' },
    h3: { fontSize: width * .06, color: COLORS.black, fontWeight: '700' },
    h2: { fontSize: width * .07, color: COLORS.black, fontWeight: '700' },
    h1: { fontSize: width * .09, color: COLORS.black, fontWeight: '700' },
};

const appTheme = { COLORS, SIZES, FONTS, RFONTS, };

export default appTheme;