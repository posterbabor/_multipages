import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./Products.css";

function Products({ products, carts, setCarts }) {
  return (
    <div className="products-container">
      <div className="product-items-container">
        {products.map((product) => {
          return (
            <Card style={{ width: "18rem" }} key={product.id}>
              <Card.Img variant='' src={product.thumbnailUrl}/>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}</Card.Text>

                {carts.find((cart) => cart.id === product.id) ? (
                  <span className="badge bg-danger">Added to Carts</span>
                ) : (
                  <Button
                    variant="outline-primary"
                    onClick={() => setCarts([...carts, product])}
                  >
                    Add to Cart
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
  
}

export default Products;
