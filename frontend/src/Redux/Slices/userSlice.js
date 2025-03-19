import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:null,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserInfo:(state,action)=>{
            state.userInfo=action.payload;
        },
        logoutUser:(state)=>{
            state.userInfo=null;      
        }
    }
})

export const {setUserInfo,logoutUser}=userSlice.actions;

export default userSlice.reducer