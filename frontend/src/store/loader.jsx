import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
    name: 'loader',
    initialState:{
        loading:false
    },
    reducers:{
        setLoading(state){
            state.loading=!state.loading
        }
    },
})
export const {setLoading}=loaderSlice.actions;