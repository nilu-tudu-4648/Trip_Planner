import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
const initialState = {
  loader: false,
  user: null,
  userLoggedIn: "false",
  allRooms: [],
  myAds: [],
  allAds:[]
  //admin
};

const localReducer = createSlice({
  name: "localReducer",
  initialState,
  reducers: {
    localReducerDataRequested: (localReducer, action) => {
      localReducer.loader = true;
    },
    localReducerDataRequestFailed: (localReducer, action) => {
      localReducer.loader = false;
    },
    setLoginUser: (localReducer, action) => {
      localReducer.user = action.payload;
    },
    setAllRooms: (localReducer, action) => {
      localReducer.allRooms = action.payload;
    },
    setAllAds: (localReducer, action) => {
      localReducer.allAds = action.payload;
    },
    setMyAds: (localReducer, action) => {
      localReducer.myAds = action.payload;
    },
    checkUserLogin: (userReducer, action) => {
      userReducer.loading = false;
      userReducer.userLoggedIn = action.payload;
    },
  },
});

const { localReducerDataRequestFailed, localReducerDataRequested } =
  localReducer.actions;

export default localReducer.reducer;
export const {
  setLoginUser,
  checkUserLogin,
  setAllRooms,
  setMyAds,
  setAllAds
} = localReducer.actions;
export const getunloadingData = (data) =>
  apiCallBegan({
    method: "post",
    data,
    onStart: localReducerDataRequested.type,
    // onSuccess: getunloadingDataRecieved.type,
    onError: localReducerDataRequestFailed.type,
  });
