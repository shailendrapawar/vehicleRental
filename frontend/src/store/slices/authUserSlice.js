import {createSlice} from "@reduxjs/toolkit"

const slice=createSlice({
    name:"authUser",
    initialState:{
        user:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.user=action.payload
            return
        }
    }
})

export const {setAuthUser}=slice.actions;
export default slice.reducer