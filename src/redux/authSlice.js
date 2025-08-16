import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    suggestedUsers: [],
    userProfile: null,
    selectedUser: null, 
  },
  reducers: {
    //actions
    setAuthUser: (state, action) => {
      state.user = action.payload;
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
  },
});

export const {
  setAuthUser,
  setSuggestedUsers,
  setUserProfile,
  setSelectedUser,
  setIsAuthenticated
} = authSlice.actions;

export default authSlice.reducer;
