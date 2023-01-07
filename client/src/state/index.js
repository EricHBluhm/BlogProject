// import { createSlice } from "@reduxjs/toolkit";

// //1:56
// //learn about redux/redux toolkit
// const initialState = { //state that will be stored in our global state. Informationa accessable throughout entire app, can can grab anywhere we want. Dont have to pass in state and properites down to different components
//     mode: "light", //darkmode/light mode
//     user: null, //auth info
//     token: null,  //auth ifo
//     posts: [], //store posts
// };

// export const authSlice = createSlice({
//     name: "auth", //represent auth workflow
//     initialState, //pass in initial state
//     reducers: { //our actions, or basically funtcions, involved in modifying global state
//         setMode: (state) => { //changeing from light to dark mode 
//             state.mode = state.mode === "light" ? "dark" : "light"; //if state is dark, move to light. If state is light, move to dark
//             //fist state.mode is previous condition, the second state.mode is the new state we are keeping
//         },
//         setLogin: (state, action) => { //action is a params basically, sets payload
//             state.user = action.payload.user; //in our payload we are setting the user parameter 
//             state.token = action.payload.token; //action includes all arguments/parameters
//         },
//         setLogOut: (state) =>{ //when we log out, set state to have nothing in there
//             state.user = null;
//             state.token = null;
//         },
//         setFriends: (state, action) => {//set friends into local state, because we want to keep this info
//             if( state.user ) { //if user already exists
//                 state.user.friends = action.payload.friends; //if user exists, set friends inside our state
//             } else {
//                 console.error("user friends don't exist")
//             }
//         },
//         setPosts: (state,action) =>{
//             state.posts = action.payload.posts;
//         },
//         setPost: (state, action) => {
//             const updatedPosts = state.posts.map((post) =>{ //grab list of posts, map through each one, and if post._id is equal to current post that we are sending into this fucntion, return action.payload.post. IE return only relavent posts. Else return what we currently have
//                 if (post._id === action.payload.post._id) return action.payload.post; //updated posts that we changed
//                 return post;  
//             });
//             state.posts = updatedPosts;
//         },
//     },
// })

// //part of redux toolkit, we have to write all of our actions
// export const { setMode, setLogin, setLogOut, setFriends, setPosts, setPost } =
//     authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogOut: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogOut, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
