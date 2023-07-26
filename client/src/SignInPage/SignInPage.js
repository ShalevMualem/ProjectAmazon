import React, { useContext, useEffect, useState } from "react";
import { Container, Form , Button } from "react-bootstrap";
import Title from "../Components/Title";
import { Link , useLocation, useNavigate} from "react-router-dom";
import { Store } from "../Context/Store.js";
import axios from "axios";
import { USER_SIGNIN } from "../Reducers/Actions";
import { toast } from "react-toastify";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {search} =useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl? redirectInUrl : "/";

  const {state, dispatch : ctxDispatch} = useContext(Store);
  const {userInfo} = state;

  useEffect(()=>{
    userInfo && navigate(redirect); 
  },
  [navigate, redirect, userInfo]
  );

  const submit = async(e) => {
    e.preventDefault();
    try{
        const {data} = await axios.post("/users/signin",
        {email, password});
        ctxDispatch({type : USER_SIGNIN, payload : data});
        navigate(redirect);
    }catch(error){
        toast.error(error.message);
    }
  }

  return (
    <>
      <Container className="small-container">
        <Title>SignIn</Title>
        <h1 className="my-3">Sign In</h1>
        <Form onSubmit={submit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email adress :</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password : </Form.Label>
            <Form.Control
              type="password"
              placeholder="enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">

            <Button type="submit">Sign In</Button>
          </div>
          <div className="mb-3">
            New Customer?{""}
            <Link to={`/signup?redirect=${redirect}`}>Create New Account </Link>
          </div>
        </Form>
      </Container>
    </>
  );
};
