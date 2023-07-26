import React ,{useContext}from 'react'
import { useNavigate } from 'react-router-dom';
import { Store } from '../Context/Store';
import Title from '../Components/Title';
import { Col,Row } from 'react-bootstrap';
import Cart from '../Components/Cart';
import axios from 'axios';
import { ADD_TO_CART, GET_FAIL, REMOVE_FROM_CART } from '../Reducers/Actions';
import Total from '../Components/Total';
import { toast } from "react-toastify";



const CartPage = () => {
    const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {cart } = state;
  const {cartItems} = cart;
  console.log(cartItems);
  const CheckOutHandler = () => {
    navigate('/signin?redirect=/shipping')
  };
  const updateCartHandler = async (item, Quantity) => {
    try{
        const {data} = await axios.get('/products/id/' + item._id)
    
        if(data.countInStock < Quantity){
            toast.error('Out of Stock');
            return;
            
        }
        ctxDispatch({type:ADD_TO_CART,payload:{...item,Quantity}})
    }catch(error){
        ctxDispatch({type:GET_FAIL,payload:error.message})
    }
};
const removeItemHandler =  (item) => {
    ctxDispatch({type:REMOVE_FROM_CART,payload:item})
};
  return (
    <div> 
        <Title Title="Shopping Cart" >
        </Title>
        <Row>
            <Col md={8}>
            <Cart cartItems={cartItems} updateCartHandler={updateCartHandler} removeCartHandler={removeItemHandler}></Cart>
            </Col>
            <Col md={4}>
                <Total cartItems={cartItems} checkoutHandler={CheckOutHandler}></Total>
            </Col>
        </Row>
    </div>
  )
}

export default CartPage
