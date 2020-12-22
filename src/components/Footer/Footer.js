import React, { Component } from 'react';
import { Container, Col, Row, } from 'react-bootstrap';
import './Footer.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class Footer extends Component {
  render() {
    return (
      <section className="Footer_background_section">
        <footer>

          <Container>

            <Row className="pt-5 footer_Main_Details_Mobile_View" >
              <Col md={2} className="overView ">
                <h5 className="mb-4">OVERVIEW</h5>
                <ul>
                  <li> <a> New Delhi</a></li>
                  <li><a>Bengaluru</a> </li>
                  <li><a>Hyderabad</a> </li>
                  <li><a>Gurugram</a> </li>
                  <li><a>Kolkata</a> </li>
                  <li><a>Hyderabad</a> </li>
                  <li><a>Gurugram</a> </li>
                  <li><a>Kolkata</a> </li>

                </ul>

              </Col>
              <Col md={3} className="overView ">
                <h5 className="mb-4">NETWORK SITES</h5>
                <ul>
                  <li> <a> Amisuzi Canada</a></li>
                  <li> <a> Amisuzi Canada</a></li>
                  <li> <a> Amisuzi Canada</a></li>
                  <li> <a> Amisuzi Canada</a></li>
                  <li> <a> Amisuzi Canada</a></li>

                </ul>

              </Col>
              <Col md={3} className="overView ">
                <h5 className="mb-4">CONNECT WITH US</h5>
                <ul class="connectWithUs">
                  <li>Write to us at
<div class="box"> <a href="mailto:connect@Amisuzi.com"><span>connect@Amisuzi.com</span></a> </div>
                  </li>
                  <li>Existing Clients
<div class="box"> <a href="mailto:customercare@Amisuzi.com"><span>customercare@Amisuzi.com</span></a> </div>
                  </li>
                  <li>Call us on, toll free number
<div class="box"> <a href="tel:18002083344"><strong>1800 208
3344</strong></a> </div>
                  </li>
                </ul>

              </Col>

              <Col md={4} className="overView ">
                <h5 className="mb-4">EXPERIENCE AMISUZI APP ON MOBILE</h5>
               
                <h5>KEEP IN TOUCH</h5>

                <div className="Social_Icons_Container">
                  <ul>
                    <li><i class="fa fa-facebook-square" aria-hidden="true"></i></li>
                    <li><i class="fa fa-instagram" aria-hidden="true"></i></li>
                    <li><i class="fa fa-youtube" aria-hidden="true"></i></li>
                  </ul>
                </div>
              </Col>

            


              <Col md={12}>
                <div class="ourPresence">
               

            


<div className="Copy_right_Last_Section">
 
  <h6 style={{ color: 'white', textAlign: 'center' }}>Copyright 2020.Azacus . All rights reserved</h6>

</div>
<ToastContainer autoClose={2000}  position="bottom-right" />

                </div>


              </Col>


            </Row>

          </Container>
       
        </footer>


      </section>
    );
  }
}
