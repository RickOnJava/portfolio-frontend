import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    selectedPost: null,
    userWhoGiveLikes: null,
  },
  reducers: {
    //actions
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    setUserWhoGiveLikes: (state, action) => {
      state.userWhoGiveLikes = action.payload;
    },
  },
});

export const { setPosts, setSelectedPost, setUserWhoGiveLikes } = postSlice.actions;
export default postSlice.reducer;
