import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser=createAsyncThunk('fetchUser',async()=>{
    return await axios.get('/api/user')
    .then((response)=>response.data)
})

const userSlice=createSlice({
    name:'userData',
    initialState:{
        isLoading:false,
        data:[],
        isError:false,
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.pending,(state,action)=>{
            state.isLoading=true;
        });
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
        });
        builder.addCase(fetchUser.rejected,(state,action)=>{
            console.log('Error :',action.error.message)
            state.isError=true;
        })
    }

})

export default userSlice.reducer;