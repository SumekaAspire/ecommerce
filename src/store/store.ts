import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSice'; //import user slice reducer from 'userSlice file , colllection of redux reducer logic and actions


// create and export redux store using configureStore
export const store = configureStore({
    reducer:{
        //register user slice reducer under 'user' key in the state
        //usereducer will be accessed under state.user.
        user: userReducer
    }
})


//defines the type of redux store's state- used in selectors
export type RootState = ReturnType<typeof store.getState>;// returns type of getstate- returns current state of the store
export type AppDispatch = typeof store.dispatch;// dispatch function - to send actions to store.