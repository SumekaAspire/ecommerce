import { removeProductFromCart, updateProductQuantity } from "../store/slices/cartSlice"
import { Alert } from "react-native";
import { AppDispatch } from "../store/store";



// Cost Summary constants
const Tax_Percent = 0.17; 
const Shipping_Charges = 60;
const FreeShipping_Threshold = 500;


export const calculateTotals = (cartProducts: any[]) =>{
    const subTotal = cartProducts.reduce((acc, product) => acc+ product.price * product.quantity,0);
    const taxGST = subTotal * Tax_Percent;
    const shipping = subTotal > FreeShipping_Threshold ? 0 : Shipping_Charges;
    const totalAmount = subTotal + shipping+ taxGST;
    const totalQuantity = cartProducts.reduce((acc, product) => acc + product.quantity, 0);

    return { subTotal, taxGST, shipping, totalAmount, totalQuantity };
}

//handle increase product quantity button
  export const increaseBtn=(dispatch: AppDispatch,id: number, currentQuantity: number)=>{
    dispatch(updateProductQuantity({id, quantity: currentQuantity+1}))
  }
//handle decrease product quantity button or remove last item
  export const decreaseBtn=(dispatch: AppDispatch, id: number, currentQuantity: number)=>{
    if(currentQuantity > 1){
       dispatch(updateProductQuantity({id, quantity: currentQuantity-1}))
    }else if(currentQuantity === 1){
       dispatch(removeProductFromCart({id}))
    }
  }

  //showing alert for removal of products from cart
 export const handleRemove = (dispatch: AppDispatch,id:number) => {
        Alert.alert(
          "Remove Product",
          "Are you sure you want to remove this item/product from the cart?",
          [
            {
              text:"Cancel",
              onPress:() => console.log("Cancel Pressed."),
              style :"cancel",
            },
            {
              text:"Remove",
              onPress :() =>{ dispatch(removeProductFromCart({ id }));},
              style:"default",
            },
          ],
          {cancelable: true}
        )
     
     }
