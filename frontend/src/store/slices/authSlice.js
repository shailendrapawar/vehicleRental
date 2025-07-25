import {createSlice} from "@reduxjs/toolkit"

const slice=createSlice({
    name:"auth",
    initialState:{
        auth:null
    },
    reducers:{
        setCredentials:(state,action)=>{
            const {payload}=action;
            state.auth=payload;
        },

    }
})

export const {setCredentials}=slice.actions
export default slice.reducer;