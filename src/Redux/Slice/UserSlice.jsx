import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentuser:null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true,
            state.error = null;
        },
        signInSuccess:(state,action)=>{
            state.currentuser = action.payload
            state.loading = false,
            state.error = null
        },
        signFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },

        
        signOutSuccess:(state)=>{
            state.currentuser = null
            state.loading = false
            state.error = null
        }
    }

})

export const {signOutSuccess , signFailure,signInSuccess,signInStart} = userSlice.actions;
export default userSlice.reducer;