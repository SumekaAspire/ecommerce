import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/asyncStorage";
import { RootState } from "../store";

// defines user onject
interface UserSlice{
    user: User| null;
}

//initialstate for user slice
const initialState: UserSlice = {user: null}; // default state is null- no user logged in

const userSlice = createSlice({
    name:'user',
    initialState: initialState,
    reducers:{
       /** 
        * action to set the user state with new state object
        * @param state current state
        * @param action contains the payload(user object)
        */
        setUser:(state, action) =>{
           state.user = action.payload;
        },
        /**
         * action to clear user state
         * @param state current state
         */
        clearUser:(state) =>{
           state.user = null; //reset the user state to null
        }
    }

})


// export the actions to be used in components
export const {setUser, clearUser} = userSlice.actions;


//custom selector to get user state
export const selectUser = (state: RootState) =>state.user.user;

//export the reducer to be used in store configurations
export default userSlice.reducer;