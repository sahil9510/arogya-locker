import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState:{
        curruser:null,
        loginas:"None",
        data:null,
        doctors:null
    },
    reducers:{
        changeUser(state,action){
            state.curruser=action.payload
        },
        changeloginas(state,action){
            state.loginas=action.payload
        },
        changedata(state,action){
            state.data=action.payload
        },
        changedoctors(state,action){
            state.doctors=action.payload
        }
    },
})
export const {changeUser,changeloginas,changedata,changedoctors}=loginSlice.actions;