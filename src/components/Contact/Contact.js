import React, { Component } from "react";

import "./Contact.css";
import Footer from "../Footer/Footer";
import HeaderInnerNavbar from "../HeaderInnerNavbar/HeaderInnerNavbar";
import { Container, Col, Row, Button, Jumbotron, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Contact extends Component {

  constructor(props) {
    super(props)
    // Create a ref object 
    this.state = {
    
    }
}


  render() {
    return (
      <section>
        <HeaderInnerNavbar />

        <div id="ForgetPassword_Main_Section">
          <Jumbotron fluid className="text-center">
            <Container>
              <h4> Contact Us</h4>
            
              <div className="ForgetPassword_Inner_Section">
                <ul className="Inner_nav">
                  <Link to="/">
                    <li>
                      <a>
                        <i className="fa fa-sign-in"></i> Home
                      </a>
                    </li>
                  </Link>
                  <Link to="/SignIn">
                    <li>
                      <a>
                        <i class="fa fa-user-circle-o"></i> Contact Us
                      </a>
                    </li>
                  </Link>
                </ul>
              </div>
            </Container>
          </Jumbotron>
        </div>
        <div>
          <Container>
            <Row>
              <Col md={12}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.330270191653!2d80.14208261526984!3d12.950705718839338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525fa8a84d31a9%3A0xe57c6667cf801f29!2sVimkes%20Group!5e0!3m2!1sen!2sin!4v1603982482484!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  frameborder="0"
                  aria-hidden="false"
                  tabindex="0"
                ></iframe>
              </Col>
            </Row>
          </Container>
        </div>
        <div id="Address_Section">
          <Container>
            <Row>
              <Col md={4} xs={12}>
                <div className="Address_Section_InnerContainer">
                  <div className="Icon_Container">
                    <i className="fa fa-sign-in"></i>
                  </div>
                  <h4>Phone</h4>
                  <h6>+91 9940065054</h6>
                </div>
              </Col>
              <Col md={4} xs={12}>
                <div className="Address_Section_InnerContainer">
                  <div className="Icon_Container">
                    <i className="fa fa-sign-in"></i>
                  </div>
                  <h4>Email</h4>
                  <h6>info@Amisuzi.online</h6>
                </div>
              </Col>
              <Col md={4} xs={12}>
                <div className="Address_Section_InnerContainer">
                  <div className="Icon_Container">
                    <i className="fa fa-sign-in"></i>
                  </div>
                  <h4>Address</h4>
                  <h6>
                    #62, Station Rd, Radha Nagar, Chromepet, Chennai, Tamil Nadu
                    600044
                  </h6>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="Contact_Form_Section">
          <Container>
            <Row>
              <Col md={3}></Col>
              <Col md={6}>
                <Form>
                  <h3>Enquriy Now</h3>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Name" />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Email" />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Subject" />
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="SignIn">
                    Send Message
                  </Button>
                </Form>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </section>
    );
  }
}
