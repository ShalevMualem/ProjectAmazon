import React, { useContext } from "react";
import { Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { USER_SIGNOUT } from "../Reducers/Actions";
import SearchBox from "./SearchBox"; 
import axios from "axios";
import { AddToCartHandler } from "../Services/AddToCart";


import "./NavBar.css";
import { Store } from "../Context/Store";

const NavBar = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const signoutHandler = () => {
    ctxDispatch({type: USER_SIGNOUT})
  };
  const {
    cart,
    userInfo,
  } = state;
  const {cartItems} = cart;
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();

    const productId = event.dataTransfer.getData("text/plain");

    const { data } = await axios.get(`/products/${productId}`);

    await AddToCartHandler(data, cartItems, ctxDispatch);
  };
  return (
    <header className="App-header">
      <Navbar bg="dark" variant="dark">
        <Link
          className="ms-5"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Link>
        <Container className="container">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src="/images/amazon.png" width={100} alt="AMZN" />
            </Navbar.Brand>
          </LinkContainer>

          <nav
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="d-flex mx-auto align-items-center"
            >
              <SearchBox />
            </nav>

          <Link to="/cart" className="nav-link me-4 ms-4">
            <i className="fas fa-shopping-cart text-white"></i>
            {" "}
            {cartItems.length > 0 && (
              <Badge pill bg="danger">
                {" "}
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </Badge>
            )}
            </Link>
            {userInfo?(
              <NavDropdown className="text-white me-5" title={userInfo.name}>
                <Link className="dropdown-item" to="#signout" onClick={signoutHandler}>
                SignOut
                </Link>
              </NavDropdown>
            ) : (
              <Link className="text-white" to="/signin">SignIn</Link>
            )}
          
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
