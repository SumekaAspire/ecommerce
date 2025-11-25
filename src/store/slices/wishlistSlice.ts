import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

//define the structure of  Product object
interface Product{
  id: number;
  title: string;
  image?: string;
  price?: number;
}

//define the structure of the Wishlist state
interface WishlistState{
   items:Product[]
}

//initialstate of wishlist sttae
const initialState : WishlistState = {
    items:[]
}


const wishlistSlice = createSlice({
    name:"wishlist",
    initialState: initialState,
    reducers: {
        /** 
        * action to add the products to the wishlist
        * checks if the product already exists in the wishlist before adding
        * @param state current state
        * @param action contains the payload(product object)
        */
        addToWishlist: (state, action) => {
          const exists = state.items.find(item => item.id === action.payload.id);
          if(!exists){
            state.items.push(action.payload); //add product to wishlist if product doesn't exist
          }
        },
        /**
         * action to toggle aproduct in the whishlist(removed or added in the wishlist, vice-versa)
         * @param state current state
         * @param action  conatins payload(product object to be toggled)
         */
        toggleWishlist:(state, action) =>{
            const exists = state.items.find((item) => item.id === action.payload.id);
            if(exists){
                state.items = state.items.filter((item) => item.id !== action.payload.id);

            }else{
                state.items.push(action.payload);
            }
        },
        /**
         * action to clear all products from the whishlist
         * @param state current state
         */
        clearWishlist:(state) =>{
            state.items =[]; //reset ishlist to an empty array
        }
    }
})

// export the actions to be used in components
export const {addToWishlist,toggleWishlist,clearWishlist} = wishlistSlice.actions;


//custom selector to get whishlist state
export const wishlistSelector = (state: RootState) =>state.wishlist.items;

//export the reducer to be used in store configurations
export default wishlistSlice.reducer;