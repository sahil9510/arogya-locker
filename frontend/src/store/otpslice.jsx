import { createSlice } from "@reduxjs/toolkit";

export const otpSlice = createSlice({
    name: 'otp',
    initialState:{
        ph:"",
        otpv:false,
        otp:""
    },
    reducers:{
        setph(state,action){
            state.ph=action.payload
        },
        setotp(state,action){
            state.otp=action.payload
        },
        setotpv(state){
            state.otpv=!state.otpv
        }
    },
})
export const {setph,setotp,setotpv}=otpSlice.actions;