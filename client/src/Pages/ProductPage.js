import React from 'react'
import { Row, Col } from'react-bootstrap'
import MessageBox from '../Components/MessageBox';
import Loading from '../Components/Loading';
import { Store } from '../Context/Store';
import { useEffect ,useContext,useReducer} from 'react';
import { ProductPageReducer } from '../Reducers/productPageReducer';
import axios from 'axios';
import { useParams,useNavigate} from 'react-router-dom';
import { GET_SUCCESS,GET_REQUEST,GET_FAIL } from '../Reducers/Actions';
import { AddToCartHandler } from '../Services/AddToCart';
import CartDescription from '../Components/CartDescription';
import ProductDescription from '../Components/ProductDescription';
import { getError } from '../Services/getError';




const ProductPage = () => {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const initialState = {
    loading: true,
    error: "",
    products: [],
  };

  const [{ loading, error, product }, dispatch] = useReducer(
    ProductPageReducer,
    initialState
  );

  const addToCart = async () => {
    await AddToCartHandler(product, cartItems, ctxDispatch);
    navigate("/cart");
  };

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: GET_REQUEST });

      try {
        const res = await axios.get(`/products/token/${token}`);
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: getError(err) });
      }
    };

    getProduct();
  }, [token]);
    return (
        <div>
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div>
              <Row>
                <Col md={6}>
                  <img
                    src={`${product.image}`}
                    alt={product.title}
                    className="card-img-top card-image"
                  />
                </Col>
    
                <Col md={3}>
                  <ProductDescription {...product} />
                </Col>
    
                <Col md={3}>
                  <CartDescription product={product} addToCart={addToCart} />
                </Col>
              </Row>
            </div>
          )}
    </div>
    );
}

export default ProductPage
