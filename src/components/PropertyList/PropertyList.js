import React, { Component } from 'react';
import {Col,Container,Form,Button,Row} from 'react-bootstrap'
import Footer from "../Footer/Footer";
import FooterCallButton from "../constants/FooterCallButton";
import HeaderInnerNavbar from "../HeaderInnerNavbar/HeaderInnerNavbar";
import './PropertyList.css';
import {
  Buliding_Data,
  Addional_Rooms_Data,
  Avaliable_Rooms_Data,
  Property_Data,
  Rooms_Data,
  Size_Data,
  Furnishing_Data,
  Bathroom_Data,
  Parking_Data,
  View_Facing_Data,
  Property_Data_Commercial,
  Rent_Data,
  Possession_Data,
  Age_Of_Propert_Data,
  Security_Deposit_Data,
  Office_Space_Data,
  Pantry_Data,
  Persoanal_Data,
  Image_Title_Data,
} from "../constants/AccountData";
export default class FilterProducts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      property_data: Property_Data,
  
    };
  }
  componentDidMount() {
  
  }


  render() {
    const { property_data } = this.state;

    return (
      <div className="Property_Wrapper">
        <HeaderInnerNavbar />
        <section className="Property_padding" id="Property_padding">
          <Container>
            <Row>
              <Col md={3} lg={3} xl={3}>
                <div className="sticky-top">

               
                <div className="Property_Sidnav Property_SidnavCard ">
                  <Form>
                    <Form.Control as="select" defaultValue="PropertyType...">
                      <option>Property Type...</option>
                      <option>Choose...</option>
                      <option>Choose...</option>
                      <option>Choose...</option>
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Control>
                    <Form.Control as="select" defaultValue="PropertyStatus">
                    <option>Property Status...</option>
                      <option>...</option>
                    </Form.Control>
                    <Form.Control as="select" defaultValue="City">
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Control>
                    <Row>
                      <Col md={6}>
                      <Form.Control type="email" placeholder="Price From" />
                      </Col>
                      <Col md={6}>
                      <Form.Control type="email" placeholder="Price To" />
                        </Col>
                    </Row>
                    <Form.Control type="text" placeholder="City" />
                    <Form.Control type="text" placeholder="Zip" />

                    <div className="SideNav_Title">
                    <h6>Featured</h6>
                    </div>
                    <Form.Group id="formGridCheckbox">
                      <Form.Check type="checkbox" label="Air Conditioning" />
                    </Form.Group>
                    <Form.Group id="formGridCheckbox">
                      <Form.Check type="checkbox" label="Barbeque" />
                    </Form.Group>
                    <Form.Group id="formGridCheckbox">
                      <Form.Check type="checkbox" label="Dryer" />
                    </Form.Group>
                    <Form.Group id="formGridCheckbox">
                      <Form.Check type="checkbox" label="Microwave" />
                    </Form.Group>
                    <Form.Group id="formGridCheckbox">
                      <Form.Check type="checkbox" label="Refrigerator" />
                    </Form.Group>
                    <Form.Group id="formGridCheckbox">
                      <Form.Check type="checkbox" label="TV Cable" />
                    </Form.Group>
                    <Button variant="primary w-100 Hiring_Button" type="submit">
                      Filter
                    </Button>
                  </Form>
                </div>
                </div>
              </Col>

              <Col md={9} lg={9} xl={9}>
              <div className="Property_SidnavCard Property_Border ">
           <Row>
             
            <div className="Property_Filter_Section">
              <div>
              <Form>
                    <Form.Control as="select" defaultValue="PropertyType...">
                      <option>Sort By Default</option>
                      <option>Choose...</option>
                      <option>Choose...</option>
                      <option>Choose...</option>
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Control>

                    </Form>
              </div>
              <div>
              <Form>
                    <Form.Control as="select" defaultValue="Show...">
                      <option>Show 12</option>
                      <option>Choose...</option>
                      <option>Choose...</option>
                      <option>Choose...</option>
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Control>

                    </Form>

                    <div>
                      
                    </div>
              </div>
            </div>
            
           </Row>

        
                </div>

                <Row className="padding_top_common">
                {property_data.map((data) => {
                            return (
                              <Col md={6} sm={12} lg={3} xl={4}>
                              <div className="Property_Card"> 
               
                              <div className="Property_Card_Image">
                                <img src="https://grandetest.com/theme/findhouse-html/images/property/fp3.jpg" className="w-100" />

                                <div className="image_overlay"> 

                                </div>
                                <div className="text_overlay"> 
                                <h6>For Rent</h6>

                                </div>
                              </div>
                              <div className="Property_Card_Wrapper">
                             <div className="Property_Card_Content">
                             <h6 className="title">Modern and quirky flat</h6>
                            <h6 className="location"><i class="fa fa-map-marker" aria-hidden="true"></i> 180th St, New York, NY 10033, USA</h6>
                             </div>
                             <div className="Property_Card_Amount">
                             <h6 className="title"><span>₹</span> 45000</h6>
                            <small className=""><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></small>
                             </div>
                             <div className="">
                           <div className="Property_Card_Amount">
                           <h6 className="title">Property size</h6>
                           <h6 className="title">2380 ft²</h6>
                           </div>
                           <div className="Property_Card_Amount">
               
                           <h6 className="title">Bedrooms</h6>
                           <h6 className="title">2</h6>
                           </div>
                           <div className="Property_Card_Amount">
               
                           <h6 className="title">Bathrooms</h6>
                           <h6 className="title">1</h6>
                           </div>
                           <div className="Property_Card_Amount">
               
                           <h6 className="title">Garages</h6>
                           <h6 className="title">1</h6>
                           </div>
                             </div>
               
                             <div className="">
                           <div className="Property_Card_Amount">
                           <h6 className="title"><i class="fa fa-calendar-o" aria-hidden="true"></i> 12 August, 2012</h6>
                           <h6 className="title">   <Button variant="primary w-100 Hiring_Button" type="submit">
                                     Details
                                   </Button></h6>
                           </div>
                         
                             </div>
                             </div>
                              </div>
               
                            </Col>
                            );
                          })}
    
        
             
           </Row>




              </Col>
            </Row>
           
          </Container>
        </section>

        <Footer />
        <FooterCallButton />
      </div>
    );
  }
}
