import {createSlice} from "@reduxjs/toolkit"

const slice=createSlice({
    name:"auth",
    initialState:{
        user:null
    },
    reducers:{
        setCredentials:(state,action)=>{
            const {payload}=action;
            state.user=payload;
        },

    }
})

export const {setCredentials}=slice.actions
export default slice.reducer;