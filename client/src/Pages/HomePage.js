import React, { useEffect  , useReducer, useState } from "react";
import Products from "../Components/Products.js";
import axios from "axios";
import "./HomePage.css"
import MessageBox from "../Components/MessageBox.js";
import Loading from "../Components/Loading.js";
import { HomePageReducer, initState } from "../Reducers/HomePageReducer.js";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../Reducers/Actions.js";

    const HomePage = () => {
    //const [products, setProducts] = useState([]);
    const [{loading,error,products},dispatch] = useReducer(
      HomePageReducer,
      initState
      );
  
    useEffect(() => {
      dispatch({ type: GET_REQUEST });
        const getProducts = async () =>{
          try{
            const res = await axios.get("/products");
            dispatch({ type:GET_SUCCESS,payload:res.data});
          }catch(error){
            dispatch({type:GET_FAIL,payload:error.message});
          }
      };
      getProducts();
    }, []);
    
    
    return (
        //<>
        <div className="products">       
            <h1>Products</h1>
            {loading? <Loading/>:error ? <MessageBox variant="danger">{error}</MessageBox> : <Products products={products} />};
      </div>
        //</>
    )
}
export default HomePage;
