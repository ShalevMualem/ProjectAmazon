import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";

const Total = ({cartItems, checkoutHandler}) => {
    const total =cartItems.reduce((acc, item) => acc + item.quantity, 0)
    const total2 = cartItems.reduce((acc, item) => acc + item.price * item.quantity,0);
    console.log(total);
    console.log(total2);
  return (
    
    <Card>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>
              SubTotal :
              ({total} {" "}items) : ${total2.toFixed(2)}
              $
            </h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-grid">
              <Button
                type="button"
                variant="primary"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                CheckOut!
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Total;
