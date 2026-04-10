import { createSlice } from "@reduxjs/toolkit";


const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? JSON.parse(user) : null, 
    token: token || null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user)); 
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      
      localStorage.removeItem("token");
      localStorage.removeItem("user"); 
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;