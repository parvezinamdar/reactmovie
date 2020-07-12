import React from 'react';
import './Slider.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Container, Card, Row, Col } from "react-bootstrap";

const slider = (props) => {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };
    return (
        <Container>
            <Slider {...settings}>
                <React.Fragment>
                    <Col>
                        <Card>
                            <Card.Img 
                                variant="top"
                                src={props.images}
                            />
                            <Card.Body></Card.Body>
                        </Card>
                    </Col>
                </React.Fragment>                  
            </Slider>
        </Container>
        
            
    )
}

export default slider;