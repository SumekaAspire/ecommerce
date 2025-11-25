import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Product{
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

//define structure of cart item
interface CartState{
    products:Product[];
}

//initialstate for Cart state
const initialState: CartState = {
    products:[],
}

//to create cart slice
const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        /**
         * action to add an product to the cart
         * @param state current state
         * @param action contains payload(cartproducts)
         */
        addToCart: (state, action) =>{
           const existingProduct = state.products.find((item) =>item.id === action.payload.id);
           if(existingProduct){
            //if product is already exists, update teh quantity
            existingProduct.quantity += action.payload.quantity;
           }else{ //if not add that product newly to the cart
            state.products.push(action.payload);
           }
        },
        removeProductFromCart:(state, action) =>{
           state.products = state.products.filter((item) => item.id !== action.payload.id)
        },
        updateProductQuantity:(state, action) =>{
            const {id, quantity} = action.payload;
            const product = state.products.find(product => product.id === id);
            if(product){
                product.quantity = quantity;
            }
        },
        /**
         * action to  clear all product in the cart
         * @param state current state
         */
        clearCart:(state) =>{
            state.products =[];
        }
    }
})


// export the actions to be used in components
export const {addToCart, clearCart, removeProductFromCart, updateProductQuantity} = cartSlice.actions;


//custom selector to get cart state
export const cartSelector = (state: RootState) =>state.cart.products;

//export the reducer to be used in store configurations
export default cartSlice.reducer;