import React, { useContext, useEffect, useState } from "react";
import { Container, Form , Button } from "react-bootstrap";
import Title from "../Components/Title";
import { Link , useLocation, useNavigate} from "react-router-dom";
import { Store } from "../Context/Store.js";
import axios from "axios";
import { USER_SIGNIN } from "../Reducers/Actions";
import { toast } from "react-toastify";

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if(password!== confirmPassword){
        toast.error("Passwords do not match");
            return;
    }
    try{
        const {data} = await axios.post("/users/signup",
        {email, password, name});
        ctxDispatch({type : USER_SIGNIN, payload : data});
        navigate(redirect);
    }catch(error){
        toast.error(error.message);
    }
  }

  return (
    <>
      <Container className="small-container">
        <Title>SignUp</Title>
        <h1 className="my-3">Sign Up</h1>
        <Form onSubmit={submit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter email"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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
            <Form.Label>Email : </Form.Label>
            <Form.Control
              type="password"
              placeholder="enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirm-password">
            <Form.Label>confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirm - password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">

            <Button type="submit">Sign Up</Button>
          </div>
          <div className="mb-3">
            Already Have An Account?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign In Here ! </Link>
          </div>
        </Form>
      </Container>
    </>
  );
};
