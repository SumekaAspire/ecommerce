import axios from "axios";


//Create a axios instance
const axiosInstance = axios.create({
    baseURL:'https://fakestoreapi.com',
    timeout: 10000,
})

//Fetch products API
export const fetchproducts = async() =>{
    try{
        const response = await axiosInstance.get('/products')
        return response.data;
    }catch(error){
        console.error('Error fetching products:', error);
        throw error;
    }
}