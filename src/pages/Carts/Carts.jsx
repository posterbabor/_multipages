import "./Carts.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Carts({ carts, setCarts }) {
  return (
    <div>
      <div className="carts-items-container">
        {carts.map((cart) => {
          return (
            <Card style={{ width: "18rem" }} key={cart.id}>
              <Card.Img variant="" src={cart.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{cart.title}</Card.Title>
                <Card.Text>{cart.price}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() =>
                    setCarts(carts.filter((c) => c.id !== cart.id))
                  }
                >
                  Remove From Cart
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <h4>
        Product: {carts.length} items - Total: $
        {carts.reduce((p, c) => p + c.price, 0).toFixed(2)}
      </h4>
    </div>
  );
}

export default Carts;
