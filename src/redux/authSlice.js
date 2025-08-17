import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: user || null,
    token: token || null,
    suggestedUsers: [],
    userProfile: null,
    selectedUser: null, 
  },
  reducers: {
    //actions
    setAuthUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },
});

export const {
  setAuthUser,
  setSuggestedUsers,
  setUserProfile,
  setSelectedUser,
  setIsAuthenticated,
  setToken
} = authSlice.actions;

export default authSlice.reducer;
