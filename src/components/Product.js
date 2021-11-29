import React from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Product.css';

function Product(props) {
    return (
        <div>
            <Card style={{ width: 'auto', margin: '12px', borderRadius: "25px" }}>
                <Card.Img style={{ maxWidth: "60%", height: "auto", alignSelf: "center", minHeight: "300px", maxHeight: "300px" }} variant="top" src={props.img} />
                <div>
                    <p className="tag" style={{ color: "white" }}>{props.category}</p>
                </div>
                <Card.Body>
                    <Card.Title style={{ fontSize: "16px" }}>{props.title}</Card.Title>
                    <Card.Text className="desc" style={{ fontSize: "14px" }}>
                        {props.desc}
                    </Card.Text>
                    <div style={{ display: 'inline' }}>
                        <Button variant="primary">Buy Now</Button>
                        <p style={{ float: "right", marginLeft: "20px", fontFamily: 'serif', fontSize: "18px", fontWeight: "bold", color: "limegreen" }}>Price: ${props.price}</p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product;
