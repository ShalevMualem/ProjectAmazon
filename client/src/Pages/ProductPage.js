import React from 'react'
import { Row, Col } from'react-bootstrap'
import MessageBox from '../Components/MessageBox';
import Loading from '../Components/Loading';

const ProductPage = () => {
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
