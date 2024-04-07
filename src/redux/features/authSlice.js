import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isLoggedIn:
    localStorage.getItem("username") !== null &&
    localStorage.getItem("username") !== undefined &&
    localStorage.getItem("username") !== "",
  modalOpen: false,
  username: localStorage.getItem("username") ?? "",
  users: []
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateModal: (state, action) => {
      return { ...state, modalOpen: action.payload };
    },
    doLogin: (state, action) => {
      // if (
      //   action.payload.username === "z" &&
      //   action.payload.password === "x"
      // ) {
      // localStorage.setItem("username", "z");
      // return {
      //   ...state,
      //   username: "z",
      //   modalOpen: false,
      //   isLoggedIn: true,
      // };
      if (
        state.users.filter((user) => user.email === action.payload.username && user.password == action.payload.password).length !== 0
      ) {
        // console.log("do login called")
        localStorage.setItem("username", action.payload.username);
        return {
          ...state,
          username: action.payload.username,
          modalOpen: false,
          isLoggedIn: true,
        };
      } else {
        return state;
      }
    },
    doLogout: (state) => {
      localStorage.removeItem("username");
      return { ...state, username: "", isLoggedIn: false };
    },
    doSignUp: (state, action) => {
      // alert(JSON.stringify(action.payload))
      console.log(action.payload);
      return { ...state, users: [...state.users, action.payload] };
    },
  }
});

export const { updateModal, doLogin, doLogout, doSignUp } = authSlice.actions;
export default authSlice.reducer;
