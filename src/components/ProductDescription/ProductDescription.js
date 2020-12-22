import React, { Component } from "react";

import "./ProductDescription.css";
import Footer from "../Footer/Footer";
import HeaderInnerNavbar from "../HeaderInnerNavbar/HeaderInnerNavbar";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Tab,
  Tabs,
  Carousel,
  Image,
} from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Config from "../../Config";

import MyVerticallyCenteredModal from "../constants/ModalComponent";
import images from "../constants/images";

export default class ProductDescription extends Component {
  constructor(props) {
    super(props);
    // Create a ref object
    this.state = {
      modalShow: false,
      Read_More: false,
      product_description: [],
      broucher_titles:[],
      banner_data: [],
      amenities_list: [],
      amenities_category: [],
    };
  }

  setModalShow = () => {
    this.setState((prevState) => ({
      modalShow: !prevState.modalShow,
    }));
  };

  ReadMoreShow = () => {
    this.setState((prevState) => ({
      Read_More: !prevState.Read_More,
    }));
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.GetPropertyData();
    this.GetPropertyImageList();
    this.GetAmenitiesList();
  }

  async GetAmenitiesList() {
    try {
      let response = await fetch(Config.BaseUrl + "AmenitiesList/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      });
      let responseJsonData = await response.json();

      this.setState({ amenities_list: responseJsonData });



 
 

      console.log(JSON.stringify(responseJsonData));

      let amenities_array = responseJsonData;
      let amenities_category = this.state.amenities_category;
      for (var i = 0; i < amenities_array.length; i++) {
        if (
          amenities_category.includes(amenities_array[i]["item_category_name"])
        ) {
        } else {
          amenities_category.push(amenities_array[i]["item_category_name"]);
        }
      }
      this.setState({ amenities_category: amenities_category });

    

      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  }

  async GetPropertyData() {
    try {
      const property_id = localStorage.getItem("property_id");

      const form_Data1 = JSON.stringify({ property_id });
      let response = await fetch(Config.BaseUrl + "GetPropertyData/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: form_Data1,
      });
      let responseJsonData = await response.json();

      this.setState({ product_description: responseJsonData });
      this.setState({broucher_titles:responseJsonData['broucher_title']})

      console.log(JSON.stringify(responseJsonData))
    
    


      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  }

  async GetPropertyImageList() {
    try {
      const property_id = localStorage.getItem("property_id");

      const form_Data1 = JSON.stringify({ property_id });
      let response = await fetch(Config.BaseUrl + "PropertyImageList/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: form_Data1,
      });
      let responseJsonData = await response.json();
      this.setState({ banner_data: responseJsonData });
      console.log("mydata");
      console.log(JSON.stringify(responseJsonData))

      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {broucher_titles}=this.state;
    return (
      <section>
        <HeaderInnerNavbar />
        <section
          className="Project_Information_Section"
          id="Project_Information_Section"
        >
          <Container>
            <Row>
              <Col md={6}>
                <Carousel>
                  {this.state.banner_data.map((data) => {
                    if (data.file_type === 1) {
                      return (
                        <Carousel.Item key={data.id}>
                          <img
                            className="d-block img-fluid w-100"
                            src={data.image_address}
                            alt="First slide"
                          />
                        </Carousel.Item>
                      );
                    }
                  })}
                </Carousel>
              </Col>
              <Col md={6}>
                <div className="Project_Title_Information">
                  <h1>{this.state.product_description["project_name"]}</h1>
                  <small>
                    {this.state.product_description["property_location"]}{" "}
                  </small>
                </div>

                <div className="Project_Amount_Text">
                  <h1>₹ {this.state.product_description["project_value"]}</h1>
                </div>
                <div className="Project_Emi_Amount">
                  <h6>Emi Start At ₹ 47600</h6>
                </div>
                <div></div>
                <div className="Project_Amount_Text">
                  <h6>Status: {this.state.product_description['possession_status'] === "1" ? 'Ready To Move' :'Under Construction'}</h6>
                </div>
                <div className="Project_Button_Container">
                  <div className="Project_Call_Back_Button">
                    <img
                      src="  https://www.flaticon.com/svg/static/icons/svg/3616/3616215.svg"
                      className="img-fluid"
                    />

                    <h6>
                      {" "}
                      <a href="tel:917092933603" target="blank">
                        {" "}
                        Get a Call Back{" "}
                      </a>
                    </h6>
                  </div>

                  <div className="Project_Call_Back_Button">
                    <img
                      src="https://www.flaticon.com/svg/static/icons/svg/1384/1384055.svg"
                      className="img-fluid"
                    />
                    <h6>
                      {" "}
                      <a
                        href="https://api.whatsapp.com/send?phone=917092933603"
                        target="blank"
                      >
                        {" "}
                        Get Whatsapp{" "}
                      </a>
                    </h6>
                  </div>
                  <div></div>
                </div>
                <div class="highlightBox">
                  <ul>
                    <li>
                      1 BHK-2 BHK Flat from 445 Sq. Ft. to 686 Sq. Ft. (Carpet)
                    </li>
                    <li>Spread across 2.32 acres</li>
                    <li>Total ~832 units </li>
                    <li>
                      Attractive 10 Ratio 90 Payment Plan - Pay 10% Now and
                      Nothing till Possession
                    </li>
                    <li>Contemporary style and an air of casual elegance</li>
                    <li>
                      Homes that are simply Bang On, ambience, location,
                      amenities
                    </li>
                    <li>
                      Close Proximityto Rajiv Gandhi IT Park and Hinjewadi IT
                      Park
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="Project_Details_Section">
          <Container>
            <ul>
              <li>2.3 km from Hinjewadi IT Hub</li>
              <li>Located on Hinjawadi-Wakad Link Road</li>
              <li>Unique Architecture</li>
              <li>Walking distance to Xion Mall</li>
            </ul>
          </Container>
        </section>

        <section className="Project_Details_Information_Section">
          <Container>
            <Row>
              <Col md={8}>
                <div className="Project_Registration_container">
                  <ul>
                    <li>
                      SquareYards RERA Reg. <span>A51800000454</span>
                    </li>
                    <li>
                      Project RERA Reg. <span>P52100004511,P52100015697</span>
                    </li>
                  </ul>
                </div>
                <div className="Whitebox">
                  <div className="First_heading">
                    <h2>Paranjape Trident Towers - Project Info</h2>
                  </div>
                  <div className="body_details">
                    <p></p>
                    <p>
                      Perfectly designed with no compromise to luxury and
                      comfort, Paranjape presents Trident Towers. Spacious homes
                      laden with all modern amenities and close to the IT hub of
                      Hinjawadi. Innovatively designed and splendidly appointed
                      with fancy flooring, branded fittings, exquisite
                      interiors, etc., these fabulous homes promise a global
                      lifestyle. Live in a home that is bang on style, and bang
                      on location too. Hurry up and book your home now!
                    </p>
                    <h3>
                      <br />
                    </h3>
                  </div>
                </div>

                {
                  broucher_titles==="" ?    
                  
                  
                  
                  
                  
              

                <div className="Whitebox">
                  <div className="First_heading">
                    <h2>Broucher Uploads</h2>

                    {/* <a rel="noopener noreferrer" href="https://image.shutterstock.com/image-photo/micro-peacock-feather-hd-imagebest-260nw-1127238599.jpg" target="_blank">Link Here</a> */}
                  </div>
                  <div className="body_details">
                    {(this.state.banner_data ||[]).map((data,index) => {
                      if (data.file_type === 2) {
                        return (
                          <div key={data.id} className="Pdf_Container">
                            <Image src={images.Pdf_Image} alt="Path" className="Pdf_Size"/>
                           {
                             (broucher_titles==="" || !(broucher_titles.includes(","))) ?
                             <React.Fragment>
                                 <h6>  {broucher_titles}</h6>
                             </React.Fragment>
                             :
                             <React.Fragment>
                               <h6>  {broucher_titles.split(",")[index]}</h6>

                             </React.Fragment>
                             
                           }
<a rel="noopener noreferrer" href={data.image_address} target="_blank">Link Here</a>


                          </div>
                        );
                      }
                    })}
                  </div>
                </div>    :null
                }




                <div className="Whitebox">
                  <div className="First_heading">
                    <h2>Paranjape Trident Towers - Floor Plans (5)</h2>
                  </div>
                  <div className="body_details">
                    <p></p>

                    <Tabs
                      defaultActiveKey="1_BHK"
                      id="uncontrolled-tab-example"
                    >
                      <Tab eventKey="1_BHK" title="1 BHK">
                        <div className="unitDetails_section">
                          <ul>
                            <li>
                              <p>
                                <a>
                                  <small itemprop="name">
                                    1 BHK 495 Sq. Ft. Flat
                                  </small>
                                </a>
                              </p>
                              <span>
                                <small itemprop="priceCurrency">₹</small>
                                <small itemprop="price">54.80 Lac</small>
                              </span>
                            </li>
                          </ul>

                          <div className="UnitDetails_More_Information">
                            <picture>
                              <img
                                class="img-responsive lazy"
                                alt="paranjape trident towers apartment 1bhk 445sqft 1"
                                src="https://static.squareyards.com/resources/images/pune/unit-image/paranjape-trident-towers-apartment-1bhk-445sqft-1.jpg?d=88x64"
                              />
                            </picture>
                            <ul>
                              <li>1 Bedroom + 1 Bathrooms + 1 Kitchen</li>
                              <li>
                                Carpet Area : <strong>495 Sq. Ft.</strong>
                              </li>
                            </ul>
                            <Button variant="success See_Details_Buton ">
                              See Details
                            </Button>{" "}
                          </div>
                        </div>

                        <div className="unitDetails_section">
                          <ul>
                            <li>
                              <p>
                                <a>
                                  <small itemprop="name">
                                    1 BHK 495 Sq. Ft. Flat
                                  </small>
                                </a>
                              </p>
                              <span>
                                <small itemprop="priceCurrency">₹</small>
                                <small itemprop="price">54.80 Lac</small>
                              </span>
                            </li>
                          </ul>

                          <div className="UnitDetails_More_Information">
                            <picture>
                              <img
                                class="img-responsive lazy"
                                alt="paranjape trident towers apartment 1bhk 445sqft 1"
                                src="https://static.squareyards.com/resources/images/pune/unit-image/paranjape-trident-towers-apartment-1bhk-445sqft-1.jpg?d=88x64"
                              />
                            </picture>
                            <ul>
                              <li>1 Bedroom + 1 Bathrooms + 1 Kitchen</li>
                              <li>
                                Carpet Area : <strong>495 Sq. Ft.</strong>
                              </li>
                            </ul>
                            <Button variant="success See_Details_Buton ">
                              See Details
                            </Button>{" "}
                          </div>
                        </div>
                      </Tab>
                      <Tab eventKey="2_BHK" title="2 BHK">
                        <div className="unitDetails_section">
                          <ul>
                            <li>
                              <p>
                                <a>
                                  <small itemprop="name">
                                    1 BHK 495 Sq. Ft. Flat
                                  </small>
                                </a>
                              </p>
                              <span>
                                <small itemprop="priceCurrency">₹</small>
                                <small itemprop="price">54.80 Lac</small>
                              </span>
                            </li>
                          </ul>

                          <div className="UnitDetails_More_Information">
                            <picture>
                              <img
                                class="img-responsive lazy"
                                alt="paranjape trident towers apartment 1bhk 445sqft 1"
                                src="https://static.squareyards.com/resources/images/pune/unit-image/paranjape-trident-towers-apartment-1bhk-445sqft-1.jpg?d=88x64"
                              />
                            </picture>
                            <ul>
                              <li>1 Bedroom + 1 Bathrooms + 1 Kitchen</li>
                              <li>
                                Carpet Area : <strong>495 Sq. Ft.</strong>
                              </li>
                            </ul>
                            <Button variant="success See_Details_Buton ">
                              See Details
                            </Button>{" "}
                          </div>
                        </div>

                        <div className="unitDetails_section">
                          <ul>
                            <li>
                              <p>
                                <a>
                                  <small itemprop="name">
                                    1 BHK 495 Sq. Ft. Flat
                                  </small>
                                </a>
                              </p>
                              <span>
                                <small itemprop="priceCurrency">₹</small>
                                <small itemprop="price">54.80 Lac</small>
                              </span>
                            </li>
                          </ul>

                          <div className="UnitDetails_More_Information">
                            <picture>
                              <img
                                class="img-responsive lazy"
                                alt="paranjape trident towers apartment 1bhk 445sqft 1"
                                src="https://static.squareyards.com/resources/images/pune/unit-image/paranjape-trident-towers-apartment-1bhk-445sqft-1.jpg?d=88x64"
                              />
                            </picture>
                            <ul>
                              <li>1 Bedroom + 1 Bathrooms + 1 Kitchen</li>
                              <li>
                                Carpet Area : <strong>495 Sq. Ft.</strong>
                              </li>
                            </ul>
                            <Button variant="success See_Details_Buton ">
                              See Details
                            </Button>{" "}
                          </div>
                        </div>

                        <div className="unitDetails_section">
                          <ul>
                            <li>
                              <p>
                                <a>
                                  <small itemprop="name">
                                    1 BHK 495 Sq. Ft. Flat
                                  </small>
                                </a>
                              </p>
                              <span>
                                <small itemprop="priceCurrency">₹</small>
                                <small itemprop="price">54.80 Lac</small>
                              </span>
                            </li>
                          </ul>

                          <div className="UnitDetails_More_Information">
                            <picture>
                              <img
                                class="img-responsive lazy"
                                alt="paranjape trident towers apartment 1bhk 445sqft 1"
                                src="https://static.squareyards.com/resources/images/pune/unit-image/paranjape-trident-towers-apartment-1bhk-445sqft-1.jpg?d=88x64"
                              />
                            </picture>
                            <ul>
                              <li>1 Bedroom + 1 Bathrooms + 1 Kitchen</li>
                              <li>
                                Carpet Area : <strong>495 Sq. Ft.</strong>
                              </li>
                            </ul>
                            <Button variant="success See_Details_Buton ">
                              See Details
                            </Button>{" "}
                          </div>
                        </div>
                      </Tab>
                    </Tabs>

                    <h3>
                      <br />
                    </h3>
                  </div>
                </div>

                <div className="Whitebox">
                  <div className="First_heading">
                    <h2>Resale Properties (2)</h2>
                  </div>
                  <div className="body_details background_color_Resale_Properties">
                    <p></p>
                    <div className="d-flex">
                      <div className="Resale_Properties_Section">
                        <img
                          className="img-responsive"
                          src="https://s3-ap-southeast-1.amazonaws.com/sqy/secondaryPortal/637335462791985091.png"
                          alt="RealEstate"
                        />
                      </div>
                      <div className="Resale_Properties_Description">
                        <p>
                          Avaliable-sale <span>Residential</span>
                        </p>
                        <p>
                          2 BHK 695 Sq.Ft. Apartment in Paranjape Trident Towers
                        </p>
                        <small>Pune, India</small>
                        <p>INR 51 LAC</p>
                      </div>
                    </div>

                    <div className="Resale_Properties_Name_Container">
                      <div className="d-flex">
                        <h2>A</h2>
                        <ul>
                          <li>Rishabh Jain</li>
                          <li>Pune</li>
                        </ul>
                      </div>
                      <Button variant="success">Contact Agent</Button>{" "}
                    </div>
                  </div>
                  <br></br>

                  <div className="body_details background_color_Resale_Properties">
                    <p></p>
                    <div className="d-flex">
                      <div className="Resale_Properties_Section">
                        <img
                          className="img-responsive"
                          src="https://s3-ap-southeast-1.amazonaws.com/sqy/secondaryPortal/637335462791985091.png"
                          alt="RealEstate"
                        />
                      </div>
                      <div className="Resale_Properties_Description">
                        <p>
                          Avaliable-sale <span>Residential</span>
                        </p>
                        <p>
                          2 BHK 695 Sq.Ft. Apartment in Paranjape Trident Towers
                        </p>
                        <small>Pune, India</small>
                        <p>INR 51 LAC</p>
                      </div>
                    </div>

                    <div className="Resale_Properties_Name_Container">
                      <div className="d-flex">
                        <h2>A</h2>
                        <ul>
                          <li>Rishabh Jain</li>
                          <li>Pune</li>
                        </ul>
                      </div>
                      <Button variant="success">Contact Agent</Button>{" "}
                    </div>
                  </div>
                </div>

                <div className="Whitebox">
                  <div className="First_heading">
                    <h2>Paranjape Trident Towers - Amenities</h2>
                  </div>
                  <div className="body_details ">
                    <p></p>
                    {this.state.amenities_category.map((item, index) => (
                      <Row>
                        <Col md={4} xs={4}>
                          <h6>{item}</h6>
                        </Col>
                         
                        <Col md={8} xs={8} className="Sports_Amentites_Section">
                      <Row>
                      {this.state.amenities_list.map((x, index) => (
                          <Col md={6}>
                          <ul>
                              <div key={x.id}>
                                {item === x.item_category_name ? (
                                  <li>
                                    <figure>
                                      <img
                                        alt="Realestate"
                                        src={x.image_address}
                                        className="img-responsive"
                                      />
                                    </figure>
                                    <span>{x.item_sub_category_name}</span>
                                  </li>
                                ) : null}
                              </div>
                           
                          </ul>
                          </Col>
                           ))}
                      </Row>
                        </Col>
                      </Row>
                    ))}
                  
                 
                 
                 
                  </div>
                  <br></br>

                  <div className="body_details background_color_Resale_Properties">
                    <p></p>
                  </div>
                </div>

                <div className="Whitebox">
                  <div className="First_heading Map_Location_Card_Container">
                    <h2>Godrej Palm Grove - Location Map and Landmarks</h2>

                    <h6>View Locality Map</h6>
                  </div>
                  <div className="body_details "></div>
                  <div className="body_details background_color_Resale_Properties">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d124402.37349544824!2d80.2029568!3d12.999065600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1604731993149!5m2!1sen!2sin"
                      frameborder="0"
                      width="100%"
                      height="450"
                      allowfullscreen=""
                      aria-hidden="false"
                      // tabindex="0"
                    ></iframe>
                  </div>
                </div>

                <div className="Whitebox">
                  <div
                    className="First_heading Map_Location_Card_Container"
                    onClick={() => this.setModalShow()}
                  >
                    <h2>Your Comments</h2>

                    <h6>
                      <span>
                        <i
                          class="fa fa-plus-circle pr-1 fa-1x"
                          aria-hidden="true"
                        ></i>
                      </span>
                      Add Your Destination
                    </h6>
                  </div>
                  <div className="body_details ">
                    <div
                      className="Destination_Card_Main_Container"
                      onClick={() => this.setModalShow()}
                    >
                      <div className="Desination_Card_Inner_Container">
                        <h6>
                          <span>
                            <i
                              class="fa fa-plus-circle pr-1 fa-1x"
                              aria-hidden="true"
                              onClick={() => this.setModalShow()}
                            ></i>
                          </span>
                          Add Your Destination
                        </h6>
                      </div>
                      <h6 className="Location_Card_Details">
                        E.g.Workplace, kid's, School, Gym
                      </h6>
                    </div>
                  </div>
                  <div className="body_details background_color_Resale_Properties">
                    <div>
                      <MyVerticallyCenteredModal
                        show={this.state.modalShow}
                        onHide={() => this.setModalShow()}
                      />
                    </div>
                  </div>
                </div>

                <div className="Whitebox">
                  <div className="First_heading Map_Location_Card_Container">
                    <h2>Godrej Palm Grove - Connecting Roads</h2>
                  </div>
                  <div className="body_details "></div>
                  <div className="body_details background_color_Resale_Properties">
                    <ul>
                      <li>
                        <span>
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </span>
                        <a>Bangalore Chennai Road ~ 7.7 Kms</a>
                      </li>
                      <li>
                        <span>
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </span>
                        <a>Bangalore Chennai Road ~ 7.7 Kms</a>
                      </li>
                      <li>
                        <span>
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </span>
                        <a>Bangalore Chennai Road ~ 7.7 Kms</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="Whitebox">
                  <div className="First_heading Map_Location_Card_Container">
                    <h2>Godrej Palm Grove - Average Prices</h2>
                  </div>
                  <div className="body_details "></div>
                  <div className="body_details background_color_Resale_Properties">
                    <Tabs
                      defaultActiveKey="Price Trends"
                      id="uncontrolled-tab-example"
                    >
                      <Tab eventKey="Price Trends" title="Price Trends"></Tab>
                      <Tab
                        eventKey="Average Prices"
                        title="Average Prices"
                      ></Tab>
                      <Tab eventKey="Supply" title="Supply"></Tab>
                    </Tabs>
                  </div>
                </div>

                <div className="Whitebox">
                  <div className="First_heading Map_Location_Card_Container">
                    <h2>About Godrej</h2>

                    <h6>All Godrej Projects</h6>
                  </div>
                  <div className="body_details "></div>
                  <div className="body_details background_color_Resale_Properties">
                    <Row>
                      <Col md={3}>
                        <div className="About_Image_Main_Container">
                          <img
                            alt="About_Image_Project"
                            src="https://static.squareyards.com/resources/images/developerlogo/godrej-49.jpg?d=123x123"
                          />
                        </div>
                      </Col>
                      <Col md={9}>
                        <Row>
                          <ul className="Total_Project_Details">
                            <li>
                              <a>
                                Total Project <br />
                                136
                              </a>
                            </li>
                            <li>
                              <a>
                                Total Project <br />
                                136
                              </a>
                            </li>
                          </ul>
                          <div className="Total_Project_Details_Paragraph">
                            <p>
                              Godrej Properties is a name to reckon with in the
                              realty and construction industry in India. The
                              company is a part of the Godrej Group, one of
                              India’s biggest and most trusted business
                              conglomerates with interests in real estate,
                              consumer goods, agribusinesses, appliances, locks
                              and security solutions and many other verticals.
                              Godrej Developers harnesses this 119 year old
                              legacy of trust and excellence and emphasizes on
                              top class technology and design for its projects.
                            </p>
                            <p>
                              Godrej Realty is known for its focus on
                              sustainability and innovation. The list of Godrej
                              projects includes multiple residential, township
                              and commercial projects. The company is currently
                              developing 115 million sq. ft. of projects in 12
                              Indian cities. The company has received in excess
                              of 150 recognitions and awards and aims at being
                              one of the top three developers in the nation. The
                              company recently partnered with APG for setting up
                              a $275 million fund to expand its real estate
                              interests while the parent Group has also
                              earmarked INR 1, 900 crore as a realty fund.
                            </p>

                            {this.state.Read_More ? (
                              <div>
                                <h6>Why Godrej?</h6>
                                <p>
                                  All Godrej residential projects come with
                                  immense brand value and are symbolic of trust,
                                  reliability and integrity. The company
                                  successfully leverages resources of its parent
                                  Group and has properly structured systems for
                                  T&D, HR, Planning, Marketing and Finance. The
                                  company believes in transparency and adherence
                                  to all industry regulations. The company has
                                  top notch processes and works with the latest
                                  technologies including Concerto and SAP in
                                  addition to possessing a skilled professional
                                  team for working on projects.
                                </p>
                                <p>
                                  The company adheres to the highest quality
                                  standards in terms of project execution,
                                  services and materials. Customer requirements
                                  are neatly integrated into designs and layouts
                                  while the company also prides itself on its
                                  project management capabilities. The company
                                  makes use of CCPM and other innovations for
                                  delivering projects faster and works with
                                  leading architects and other industry experts
                                  for its projects.
                                </p>
                                <h6>Why Godrej?</h6>
                                <p>
                                  All Godrej residential projects come with
                                  immense brand value and are symbolic of trust,
                                  reliability and integrity. The company
                                  successfully leverages resources of its parent
                                  Group and has properly structured systems for
                                  T&D, HR, Planning, Marketing and Finance. The
                                  company believes in transparency and adherence
                                  to all industry regulations. The company has
                                  top notch processes and works with the latest
                                  technologies including Concerto and SAP in
                                  addition to possessing a skilled professional
                                  team for working on projects.
                                </p>
                                <p>
                                  The company adheres to the highest quality
                                  standards in terms of project execution,
                                  services and materials. Customer requirements
                                  are neatly integrated into designs and layouts
                                  while the company also prides itself on its
                                  project management capabilities. The company
                                  makes use of CCPM and other innovations for
                                  delivering projects faster and works with
                                  leading architects and other industry experts
                                  for its projects.
                                </p>
                              </div>
                            ) : null}
                            <div class="More_Details_Button">
                              <a onClick={() => this.ReadMoreShow()}>
                                {this.state.Read_More === false
                                  ? "Show More"
                                  : "Show Less"}
                                <span>
                                  <i
                                    class={
                                      this.state.Read_More === false
                                        ? "fa fa-chevron-down"
                                        : "fa fa-chevron-up"
                                    }
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </a>
                            </div>
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col md={4} className="">
                <div className="sticky-top">
                  <Form className="Form_Box">
                    <h5>Contact our Real Estate Experts</h5>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control type="email" placeholder="Email ID" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control type="number" placeholder="Mobile" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Control as="select">
                        <option>Chennai</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                    <Button variant="success call_button_size">
                      Get a Call To
                    </Button>{" "}
                  </Form>

                  <div className="Assured_Section">
                    <div className="picture_box">
                      <picture>
                        <img
                          class="img-responsive lazy"
                          data-src="https://static.squareyards.com/ui-assets/webp/stamp-v2.webp"
                          type="image/webp"
                          alt=""
                          src="https://static.squareyards.com/ui-assets/webp/stamp-v2.webp"
                        />
                      </picture>
                    </div>

                    <div>
                      <ul className="listBoxs">
                        <li>
                          <span>
                            <i
                              class="fa fa-check"
                              aria-hidden="true"
                              color="green"
                            ></i>{" "}
                            Zero Brokerage
                          </span>
                        </li>
                        <li>
                          {" "}
                          <i class="fa fa-check" aria-hidden="true"></i>Lowest
                          Price Guaranteed
                        </li>
                        <li>
                          {" "}
                          <i class="fa fa-check" aria-hidden="true"></i> Full
                          Service Support
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Footer />
      </section>
    );
  }
}
