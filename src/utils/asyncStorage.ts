import AsyncStorage from '@react-native-async-storage/async-storage';

//structure for user object
export interface User{
    id:string;
    name:string;
    email:string;
    password: string;
    firstName: string;
    lastName: string;
    country: string;
    pincode: string;
    city: string;
    state: string;
    address: string;
    houseFlat: string;
    phone: string;
}

/**
 * generic Function to store the data
 * @param key -  key under which data will be stored
 * @param value - value to be stored
 */
const  storeData = async(key: string, value: any) =>{
  try{
    await AsyncStorage.setItem(key,JSON.stringify(value));
  }catch(error){
    console.log('Error in storing the user data: ', error)
  }
}

/**
 * Generic Function to retrieve user data
 * @param key - key under which data is stored
 * @returs parsed value from AsyncStorage or null if not found
 */
const getData = async(key: string) =>{
   try{
     const userData = await AsyncStorage.getItem(key);
     return userData ? JSON.parse(userData) : null;
  }catch(error){
     console.error("Error in retrieving user data:", error);
  }
}

/**
 * Generic Function to remove data
 */

const removeData = async(key: string) =>{
   try{
     await AsyncStorage.removeItem(key);
  }catch(error){
     console.error("Error in removing user data:", error);
  }
}


//exporting to use in other parts of application
export{storeData, getData, removeData};