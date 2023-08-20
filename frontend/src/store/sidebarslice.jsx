import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState:{
        currtabP:"doctors",
        currtabD:"patients",
        currtabH:"doctors",
    },
    reducers:{
        changeTab(state,action){
            state.currtabP=action.payload
        },
        changeDTab(state,action){
            state.currtabD=action.payload
        }
    },
})
export const {changeTab,changeDTab}=sidebarSlice.actions;