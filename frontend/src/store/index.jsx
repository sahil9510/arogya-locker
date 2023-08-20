import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./loginslice";
import { sidebarSlice } from "./sidebarslice";
import { otpSlice } from "./otpslice";
import { loaderSlice } from "./loader";

const store =configureStore({
    reducer:{
        login:loginSlice.reducer,
        sidebar:sidebarSlice.reducer,
        otp:otpSlice.reducer,
        loader:loaderSlice.reducer
    }
})

export default store;