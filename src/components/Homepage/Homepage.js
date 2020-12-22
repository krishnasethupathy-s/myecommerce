import React, { Component } from "react";
import "./HomePage.css";
import Footer from "../Footer/Footer";
import FooterCallButton from "../constants/FooterCallButton";
import SubmitButton from "../constants/SubmitButton/SubmitButton";
import HeaderInnerNavbar from "../HeaderInnerNavbar/HeaderInnerNavbar";
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  Tab,
  Tabs,
  NavDropdown,
  FormControl,
  Carousel,
  Form
} from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import images from "../constants/images";
import { Link } from "react-router-dom";
import Config from "../../Config";
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

import NewsBlogSection from "../constants/NewsBlogSection/NewsBlogSection";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property_list: [],
      property_data: Property_Data,
      property_commercial: Property_Data_Commercial,
      project_size: Size_Data,
      resale_id:'11',
      buget_values:'10L - 2L'
    };
  }
  componentDidMount() {
    // window.scrollTo(0, 0);
    this.Highlight_Color_Section();
    this.fetchPropertyList();
  }

  async fetchPropertyList() {
    try {
      let response = await fetch(Config.BaseUrl + "AllPropertyList/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      });
      let responseJsonData = await response.json();
      this.setState({ property_list: responseJsonData });
      console.log(JSON.stringify(responseJsonData));
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  }

  Highlight_Color_Section = () => {
    var header = document.getElementById("homeTabBox");
    var btns = header.getElementsByClassName("unorder_List");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  };

  property_navigate = (id) => {
    localStorage.setItem("property_id", id);
    this.props.history.push("/ProductDescription");
  };

  Resale_function = (id) => {
  this.setState({resale_id:id});
  
  };

  

  render() {
    const { property_data, property_commercial, project_size } = this.state;

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },

        {
          breakpoint: 1480,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
          },
        },

        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            dots: true,
          },
        },
        {
          breakpoint: 1627,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 3760,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const testimonial = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      // autoplay: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 2060,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },

        {
          breakpoint: 1480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
      ],
    };

    return (
      <div>
        <HeaderInnerNavbar />
        <section className="Banner_Section">
          <Container className="Search_bar_Main_Container">
            <Row>
              <Col md={12}>
                <div className="homeTabBox d-none d-sm-block" id="homeTabBox">
                  <ul>
                    <li href="" className="unorder_List active">
                      <a href="">
                        <strong>
                          <span>New</span>&nbsp;Projects
                        </strong>
                        <span> from Developers</span>
                      </a>
                    </li>
                    <li href="" className="unorder_List">
                      <a href="">
                        <strong>
                          <span>Properties</span>&nbsp;For
                        </strong>
                        <span>
                          {" "}
                          <br />
                          New Sale
                        </span>
                      </a>
                    </li>
                    <li href="" className="unorder_List">
                      <a href="">
                        <strong>
                          <span>Properties</span>&nbsp;On
                        </strong>
                        <span>
                          {" "}
                          <br />
                          Rent
                        </span>
                      </a>
                    </li>
                    <li className="unorder_List">
                      <a>
                        <strong>
                          <span>Find </span>&nbsp;Trusted
                        </strong>
                        <span>
                          {" "}
                          <br />
                          Agents
                        </span>
                      </a>
                    </li>{" "}
                    <li className="unorder_List">
                      <a>
                        <strong>
                          <span>Property </span>&nbsp;
                        </strong>
                        <span>
                          {" "}
                          <br />
                          Management
                        </span>
                      </a>
                    </li>
                    <Link to="/SignIn">
                      <li href="/SignIn" className="unorder_List">
                        <a>
                          <strong>
                            <span>Post</span>&nbsp;
                            <br /> Free
                          </strong>
                          <span>Listing</span>
                        </a>
                      </li>
                    </Link>
                    <li className="unorder_List">
                      <a>
                        <strong>
                          <span>Get </span>&nbsp;
                          <br /> Home
                        </strong>
                        <span>Loan</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Container>
                  <Row>
                    <div className="searchBox">
                      <div className="Dropdown_Width">
                      <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Control as="select" defaultValue="Mumbai...">
    <option>Mumbai</option>
    

    </Form.Control>
  </Form.Group>
                        {/* <NavDropdown
                          className="Dropdown_Color"
                          title="Mumbai"
                          id="basic-nav-dropdown"
                        >
                        
                        </NavDropdown> */}
                      </div>
                      <div className="Input_Width">
                        <FormControl
                          type="text"
                          placeholder="Search from 15278 New Projects using Project Name, Builder, Landmark or Road"
                          className=""
                        />
                      </div>

                      <div className="Dropdown_Width">
                      <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Control as="select" defaultValue="Budget...">
    <option>Budget</option>
      <option className="Budget_Option"> ₹ 0 L  - &nbsp;&nbsp;&nbsp; ₹ 10 L</option>
      <option className="Budget_Option"> ₹ 10 L  - &nbsp;&nbsp;&nbsp;₹ 20 L</option>
      <option className="Budget_Option"> ₹ 30 L  - &nbsp;&nbsp;&nbsp;₹ 40 L</option>
      <option className="Budget_Option"> ₹ 40 L  - &nbsp;&nbsp;&nbsp;₹ 50 L</option>



 
     
    </Form.Control>
  </Form.Group>
                        {/* <NavDropdown
                          className="Dropdown_Color"
                          title={this.state.buget_values}
                          id="basic-nav-dropdown"
                          value={this.state.buget_values}
                        >
                          <Row>
                            <Col md={12}>
                              <div>
                                
                              <NavDropdown.Item className="Budget_dropdown" href="">
                              ₹ 0 L <span> ₹ 10 L</span>
                              </NavDropdown.Item>
                              </div>
                            <div>
                              <NavDropdown.Item className="Budget_dropdown" href="">
                              ₹ 10 L<span> ₹ 20 L</span>
                              </NavDropdown.Item>
                              </div>
                              <div>
                              <NavDropdown.Item className="Budget_dropdown" href="">
                              ₹ 20 L<span> ₹ 30 L</span>
                              </NavDropdown.Item>
                              </div>
                              <div>
                              <NavDropdown.Item className="Budget_dropdown" href="">
                              ₹ 30 L <span> ₹ 40 L</span>
                              </NavDropdown.Item>
                              </div>
                           
                           
                            </Col>
                    
                          </Row>
                        </NavDropdown> */}
                      </div>

                      <div className="Dropdown_Width">

                      <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Control as="select" defaultValue="Prototype...">
    <option  className="Budget_Option">Prototype</option>
      <option  className="Budget_Option">Residental</option>
      <option  className="Budget_Option">Commercial</option>
      <option  className="Budget_Option">Shops</option>
      <option  className="Budget_Option">Villas</option>
    
    </Form.Control>
  </Form.Group>
                        {/* <NavDropdown
                          className="Dropdown_Color"
                          title="Prototype"
                          id="basic-nav-dropdown"
                        >
                          <NavDropdown.Item href="#action/3.1">
                            Residental
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">
                            Commercial
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.1">
                            Shops
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">
                            Villas
                          </NavDropdown.Item>
                        </NavDropdown> */}
                      </div>

                      <div className="Button_Width_HomePage">
                        <SubmitButton title="Search" />
                      </div>
                    </div>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </section>






        <section
          className="Online_Propery_banner mt-5 mb-5"
          id="Online_Property_banner"
        >
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block img-fluid"
                src={images.Homepage_Offer_banner}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={images.Homepage_Offer_banner}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={images.Homepage_Offer_banner}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </section>


        {/* Chennai Real Estate */}

        <section className="Chennai_Real_Estate" id="Chennai_Real_Estate">
          <Container>
            <Row>
              <div className="Real_estate_Icon_section">
                <Col md={3}>
                  <div className="tile">
                    <figure>
                      <img
                        itemprop="image"
                        className="img-responsive"
                        src={images.Homepage_Realestate_image1}
                        alt="New Projects"
                      />{" "}
                    </figure>
                    <h2><a href="#Property_section">
                  New Projects in Mumbai </a></h2>
                    <p>
                      Well-known Developers have their Real Estate projects
                      going on in full swing in Mumbai’s fast-developing areas
                    </p>
                  </div>
                </Col>
                <Col md={3} className="">
                  <div className="tile">
                    <figure>
                      <img
                        itemprop="image"
                        className="img-responsive"
                        src={images.Homepage_Realestate_image2}
                        alt="New Projects"
                      />{" "}
                    </figure>
                    <h2><a href="#Resale">
                    Resale in Mumbai </a></h2>
              
                    <p>
                      Well-known Developers have their Real Estate projects
                      going on in full swing in Mumbai’s fast-developing areas
                    </p>
                  </div>
                </Col>
                <Col md={3} className="">
                  <div className="tile">
                    <figure>
                      <img
                        itemprop="image"
                        className="img-responsive"
                        src={images.Homepage_Realestate_image3}
                        alt="New Projects"
                      />{" "}
                    </figure>
                    <h2><a href="#Rent">
                    Rental in Mumbai</a></h2>
                 
                    <p>
                      Well-known Developers have their Real Estate projects
                      going on in full swing in Mumbai’s fast-developing areas
                    </p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="tile">
                    <figure>
                      <img
                        itemprop="image"
                        className="img-responsive"
                        src={images.Homepage_Realestate_image4}
                        alt="New Projects"
                      />{" "}
                    </figure>
                    
                    <h2><a href="#testimonial-main-section">
                    Agents in Mumbai</a></h2>
                    
                    <p>
                      Well-known Developers have their Real Estate projects
                      going on in full swing in Mumbai’s fast-developing areas
                    </p>
                  </div>
                </Col>
              </div>
            </Row>
          </Container>
        </section>

        {/* End Chennai Real Estate */}

        {/* Online Banner */}

        {/* End Online Banner */}

        {/* Chennai Real Estate */}

        {/* Tabs Section */}

        <section className="Property_Section" id="Property_section">
          <Container>
            <Row>
              <Col md={12} className="text-center" id="New_InnerScroll">
                <span className="sub_headings_underling">Project</span>
                <h2>
                  New Projects in Mumbai</h2>
              </Col>
            </Row>
          </Container>
          <Col md={12}>
            <div className="Propery_Section_Tab_Section">
              <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Featured Properties ">
                  <Row>
                    <Col lg={3} md={3} sm={3} xl={3} xs={12}>
                      <div className="Property_Section_Card">
                        <Card style={{ width: "100%" }}>
                          <Card.Img
                            variant="top"
                            src={images.Homepage_Best_Seller}
                            className="img-fluid"
                          />
                          <Card.Body>
                            <Card.Title>Best Sellers in Mumbai</Card.Title>
                            <Card.Text className="pb-2">
                              The latest residential offerings from the best
                              builders in Mumbai, handpicked by our team of
                              experts
                            </Card.Text>
                            <SubmitButton title="View" />
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>
                    <Col lg={9} md={9} sm={9} xl={9} xs={12}>
                      {this.state.property_list.length === 0 ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <p>Please Wait</p>
                        </div>
                      ) : (
                        <Slider {...settings}>
                          {this.state.property_list.map((data) => {
                            return (
                              <div>
                                <Card className="Card_Slider_Section">
                                  <Card.Img
                                    variant="top"
                                    src={data.cover_image_address.length==="0" ? data.cover_image_address :images.Homepage_Project_Image}
                                    className="img-fluid"
                                  />
                                  <Card.Body>
                                    <Card.Title></Card.Title>
                                    {/* <div className="Card_Slider_Squared_Section">
                                      <h6>
                                        {data.property_for === "1"
                                          ? "Sale"
                                          : "Rent"}
                                      </h6>
                                    </div> */}
                                    <Card.Text>
                                      <h5>{data.project_name}</h5>
                                      <div className="d-flex justify-content-between">
                                        <small>{data.property_location}</small>
                                        <small>
                                          {data.building_type === "1"
                                            ? "Residential"
                                            : "Commercial"}
                                        </small>
                                      </div>

                                      <Row>
                                        <Col md={4}>
                                          <div class="price">
                                            <span
                                              itemprop="priceCurrency"
                                              title="INR"
                                            >
                                              ₹
                                            </span>
                                            <span
                                              itemprop="minPrice"
                                              title="23.28 Lac to 60.60 Lac"
                                            >
                                              {data.project_value}
                                            </span>
                                          </div>
                                        </Col>
                                        <Col md={8}>
                                          <span className="possession_staus_span">
                                            {data.possession_status === "1"
                                              ? "Ready To Move"
                                              : "Under Construction"}
                                          </span>
                                          {data.possession_status === "1" ? (
                                            <div class="progressBar">
                                              <span className="span_width_1"></span>
                                            </div>
                                          ) : (
                                            <div class="progressBar">
                                              <span className="span_width_2"></span>
                                            </div>
                                          )}
                                        </Col>
                                        <div class="propertyType">
                                          <ul>
                                            {data.building_type === "1" ? (
                                              <li>
                                                {Config.datamatch(
                                                  data.property_type,
                                                  property_data
                                                )}
                                              </li>
                                            ) : (
                                              <li>
                                                {Config.datamatch(
                                                  data.property_type,
                                                  property_commercial
                                                )}
                                              </li>
                                            )}

                                            <li>
                                              {data.price_value +
                                                " " +
                                                Config.datamatch(
                                                  data.project_size,
                                                  project_size
                                                )}{" "}
                                            </li>
                                          </ul>
                                        </div>
                                      </Row>
                                    </Card.Text>
                                    <div className="Card_Slider_Card_Button_Container">
                                      {/* <Button variant="primary Gray_button">Short List</Button> */}
                                      <Button
                                        variant="primary Green_button w-100"
                                        onClick={() => {
                                          this.property_navigate(data.id);
                                        }}
                                      >
                                        Details
                                      </Button>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </div>
                            );
                          })}
                        </Slider>
                      )}
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="profile" title="Top Developers">
                  <Row>
                    <Col lg={2} md={2} sm={2} xl={2} xs={12}>
                      <div className="Property_Section_Card">
                        <Card style={{ width: "100%" }}>
                          <Card.Img
                            variant="top"
                            src={images.Homepage_Best_Seller}
                            className="img-fluid"
                          />
                          <Card.Body>
                            <Card.Title>Top Developers in Mumbai</Card.Title>
                            <Card.Text>
                              Browse through our fresh, handpicked A-list of
                              homes from the most trusted builders in Mumbai.
                            </Card.Text>
                            <Button variant="primary View_All_Card_Button">
                              View All
                            </Button>
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>
                    <Col lg={10} md={10} sm={10} xl={10} xs={12}>
                      <Slider {...settings}>
                        <div>
                          <Card className="Card_Slider_Section_Developer">
                            <Card.Body>
                              <Row>
                                <Col md={5} xs={6}>
                                  <img
                                    src={images.Homepage_Tata}
                                    alt="amisuzi"
                                    className="w-100"
                                  />
                                </Col>
                                <Col
                                  md={7}
                                  xs={6}
                                  className="Card_Slider_Aligment"
                                >
                                  <ul>
                                    <li>Tata</li>
                                    <li>Experience: 35 Years</li>
                                  </ul>
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  md={5}
                                  xs={5}
                                  className="Card_Slider_Aligment"
                                >
                                  <h6>58 Projects</h6>
                                </Col>
                                <Col md={7} xs={7}>
                                  <Button variant="primary Hiring_Button">
                                    View All Projects
                                  </Button>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>

                          <Card className="Card_Slider_Section_Developer">
                            <Card.Body>
                              <Row>
                                <Col md={5} xs={6}>
                                  <img
                                    src={images.Homepage_Tata}
                                    alt="amisuzi"
                                    className="w-100"
                                  />
                                </Col>
                                <Col
                                  md={7}
                                  xs={6}
                                  className="Card_Slider_Aligment"
                                >
                                  <ul>
                                    <li>Tata</li>
                                    <li>Experience: 35 Years</li>
                                  </ul>
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  md={5}
                                  xs={5}
                                  className="Card_Slider_Aligment"
                                >
                                  <h6>58 Projects</h6>
                                </Col>
                                <Col md={7} xs={7}>
                                  <Button variant="primary Hiring_Button">
                                    View All Projects
                                  </Button>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        </div>
                        <div>
                          <div>
                            <Card className="Card_Slider_Section_Developer">
                              <Card.Body>
                                <Row>
                                  <Col md={5} xs={6}>
                                    <img
                                      src={images.Homepage_Tata}
                                      alt="amisuzi"
                                      className="w-100"
                                    />
                                  </Col>
                                  <Col
                                    md={7}
                                    xs={6}
                                    className="Card_Slider_Aligment"
                                  >
                                    <ul>
                                      <li>Tata</li>
                                      <li>Experience: 35 Years</li>
                                    </ul>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    md={5}
                                    xs={5}
                                    className="Card_Slider_Aligment"
                                  >
                                    <h6>58 Projects</h6>
                                  </Col>
                                  <Col md={7} xs={7}>
                                    <Button variant="primary Hiring_Button">
                                      View All Projects
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>

                            <Card className="Card_Slider_Section_Developer">
                              <Card.Body>
                                <Row>
                                  <Col md={5} xs={6}>
                                    <img
                                      src={images.Homepage_Tata}
                                      alt="amisuzi"
                                      className="w-100"
                                    />
                                  </Col>
                                  <Col
                                    md={7}
                                    xs={6}
                                    className="Card_Slider_Aligment"
                                  >
                                    <ul>
                                      <li>Tata</li>
                                      <li>Experience: 35 Years</li>
                                    </ul>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    md={5}
                                    xs={5}
                                    className="Card_Slider_Aligment"
                                  >
                                    <h6>58 Projects</h6>
                                  </Col>
                                  <Col md={7} xs={7}>
                                    <Button variant="primary Hiring_Button">
                                      View All Projects
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </div>
                        </div>

                        <div>
                          <div>
                            <Card className="Card_Slider_Section_Developer">
                              <Card.Body>
                                <Row>
                                  <Col md={5} xs={6}>
                                    <img
                                      src={images.Homepage_Tata}
                                      alt="amisuzi"
                                      className="w-100"
                                    />
                                  </Col>
                                  <Col
                                    md={7}
                                    xs={6}
                                    className="Card_Slider_Aligment"
                                  >
                                    <ul>
                                      <li>Tata</li>
                                      <li>Experience: 35 Years</li>
                                    </ul>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    md={5}
                                    xs={5}
                                    className="Card_Slider_Aligment"
                                  >
                                    <h6>58 Projects</h6>
                                  </Col>
                                  <Col md={7} xs={7}>
                                    <Button variant="primary Hiring_Button">
                                      View All Projects
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>

                            <Card className="Card_Slider_Section_Developer">
                              <Card.Body>
                                <Row>
                                  <Col md={5} xs={6}>
                                    <img
                                      src={images.Homepage_Tata}
                                      alt="amisuzi"
                                      className="w-100"
                                    />
                                  </Col>
                                  <Col
                                    md={7}
                                    xs={6}
                                    className="Card_Slider_Aligment"
                                  >
                                    <ul>
                                      <li>Tata</li>
                                      <li>Experience: 35 Years</li>
                                    </ul>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    md={5}
                                    xs={5}
                                    className="Card_Slider_Aligment"
                                  >
                                    <h6>58 Projects</h6>
                                  </Col>
                                  <Col md={7} xs={7}>
                                    <Button variant="primary Hiring_Button">
                                      View All Projects
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </div>
                        </div>
                        <div>
                          <div>
                            <Card className="Card_Slider_Section_Developer">
                              <Card.Body>
                                <Row>
                                  <Col md={5} xs={6}>
                                    <img
                                      src={images.Homepage_Tata}
                                      alt="amisuzi"
                                      className="w-100"
                                    />
                                  </Col>
                                  <Col
                                    md={7}
                                    xs={6}
                                    className="Card_Slider_Aligment"
                                  >
                                    <ul>
                                      <li>Tata</li>
                                      <li>Experience: 35 Years</li>
                                    </ul>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    md={5}
                                    xs={5}
                                    className="Card_Slider_Aligment"
                                  >
                                    <h6>58 Projects</h6>
                                  </Col>
                                  <Col md={7} xs={7}>
                                    <Button variant="primary Hiring_Button">
                                      View All Projects
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>

                            <Card className="Card_Slider_Section_Developer">
                              <Card.Body>
                                <Row>
                                  <Col md={5} xs={6}>
                                    <img
                                      src={images.Homepage_Tata}
                                      alt="amisuzi"
                                      className="w-100"
                                    />
                                  </Col>
                                  <Col
                                    md={7}
                                    xs={6}
                                    className="Card_Slider_Aligment"
                                  >
                                    <ul>
                                      <li>Tata</li>
                                      <li>Experience: 35 Years</li>
                                    </ul>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    md={5}
                                    xs={5}
                                    className="Card_Slider_Aligment"
                                  >
                                    <h6>58 Projects</h6>
                                  </Col>
                                  <Col md={7} xs={7}>
                                    <Button variant="primary Hiring_Button">
                                      View All Projects
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </div>
                        </div>
                        <div>
                          <div>
                            <Card className="Card_Slider_Section_Developer">
                              <Card.Body>
                                <Row>
                                  <Col md={5} xs={6}>
                                    <img
                                      src={images.Homepage_Tata}
                                      alt="amisuzi"
                                      className="w-100"
                                    />
                                  </Col>
                                  <Col
                                    md={7}
                                    xs={6}
                                    className="Card_Slider_Aligment"
                                  >
                                    <ul>
                                      <li>Tata</li>
                                      <li>Experience: 35 Years</li>
                                    </ul>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    md={5}
                                    xs={5}
                                    className="Card_Slider_Aligment"
                                  >
                                    <h6>58 Projects</h6>
                                  </Col>
                                  <Col md={7} xs={7}>
                                    <Button variant="primary Hiring_Button">
                                      View All Projects
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>

                            <Card className="Card_Slider_Section_Developer">
                              <Card.Body>
                                <Row>
                                  <Col md={5} xs={6}>
                                    <img
                                      src={images.Homepage_Tata}
                                      alt="amisuzi"
                                      className="w-100"
                                    />
                                  </Col>
                                  <Col
                                    md={7}
                                    xs={6}
                                    className="Card_Slider_Aligment"
                                  >
                                    <ul>
                                      <li>Tata</li>
                                      <li>Experience: 35 Years</li>
                                    </ul>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    md={5}
                                    xs={5}
                                    className="Card_Slider_Aligment"
                                  >
                                    <h6>58 Projects</h6>
                                  </Col>
                                  <Col md={7} xs={7}>
                                    <Button variant="primary Hiring_Button">
                                      View All Projects
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </div>
                        </div>
                        <div>
                          <div>
                            <Card className="Card_Slider_Section_Developer">
                              <Card.Body>
                                <Row>
                                  <Col md={5} xs={6}>
                                    <img
                                      src={images.Homepage_Tata}
                                      alt="amisuzi"
                                      className="w-100"
                                    />
                                  </Col>
                                  <Col
                                    md={7}
                                    xs={6}
                                    className="Card_Slider_Aligment"
                                  >
                                    <ul>
                                      <li>Tata</li>
                                      <li>Experience: 35 Years</li>
                                    </ul>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    md={5}
                                    xs={5}
                                    className="Card_Slider_Aligment"
                                  >
                                    <h6>58 Projects</h6>
                                  </Col>
                                  <Col md={7} xs={7}>
                                    <Button variant="primary Hiring_Button">
                                      View All Projects
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                            <Card className="Card_Slider_Section_Developer">
                              <Card.Body>
                                <Row>
                                  <Col md={5} xs={6}>
                                    <img
                                      src={images.Homepage_Tata}
                                      alt="amisuzi"
                                      className="w-100"
                                    />
                                  </Col>
                                  <Col
                                    md={7}
                                    xs={6}
                                    className="Card_Slider_Aligment"
                                  >
                                    <ul>
                                      <li>Tata</li>
                                      <li>Experience: 35 Years</li>
                                    </ul>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    md={5}
                                    xs={5}
                                    className="Card_Slider_Aligment"
                                  >
                                    <h6>58 Projects</h6>
                                  </Col>
                                  <Col md={7} xs={7}>
                                    <Button variant="primary Hiring_Button">
                                      View All Projects
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </div>
                        </div>
                        <div>
                          <div>
                            <Card className="Card_Slider_Section_Developer">
                              <Card.Body>
                                <Row>
                                  <Col md={5} xs={6}>
                                    <img
                                      src={images.Homepage_Tata}
                                      alt="amisuzi"
                                      className="w-100"
                                    />
                                  </Col>
                                  <Col
                                    md={7}
                                    xs={6}
                                    className="Card_Slider_Aligment"
                                  >
                                    <ul>
                                      <li>Tata</li>
                                      <li>Experience: 35 Years</li>
                                    </ul>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    md={5}
                                    xs={5}
                                    className="Card_Slider_Aligment"
                                  >
                                    <h6>58 Projects</h6>
                                  </Col>
                                  <Col md={7} xs={7}>
                                    <Button variant="primary Hiring_Button">
                                      View All Projects
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>

                            <Card className="Card_Slider_Section_Developer">
                              <Card.Body>
                                <Row>
                                  <Col md={5} xs={6}>
                                    <img
                                      src={images.Homepage_Tata}
                                      alt="amisuzi"
                                      className="w-100"
                                    />
                                  </Col>
                                  <Col
                                    md={7}
                                    xs={6}
                                    className="Card_Slider_Aligment"
                                  >
                                    <ul>
                                      <li>Tata</li>
                                      <li>Experience: 35 Years</li>
                                    </ul>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    md={5}
                                    xs={5}
                                    className="Card_Slider_Aligment"
                                  >
                                    <h6>58 Projects</h6>
                                  </Col>
                                  <Col md={7} xs={7}>
                                    <Button variant="primary Hiring_Button">
                                      View All Projects
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </div>
                        </div>
                      </Slider>
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </section>

        {/* Resale Properties in Mumbai */}

        <section className="Resale" id="Resale">
          <Container>
            <Row>
              <Col md={12} lg={12} className="text-center" id="Resale_InnerScroll">
                <span className="sub_headings_underling">Resale </span>

                <h2>Resale Properties in Mumbai</h2>

             
              </Col>
              <Col md={12}>
                <Tabs
                  defaultActiveKey="Residental"
                  id="uncontrolled-tab-example"
                >
                  <Tab eventKey="Residental" title="Residental">
                    <Row>
                      <Col md={12} className="Resale_Properties_Categories">
                        <Row>
                          {property_data.map((data) => {
                            return (
                              <Col md={2} xs={6}>
                                <h6 className={data.id===this.state.resale_id ? "Active_Class":"border_underline"} onClick={()=>this.Resale_function(data.id)}>{data.name}</h6>
                              </Col>
                            );
                          })}
                        </Row>
                      </Col>

                      <Col md={12} className="Resale_Properties_Categories">
                        <Row>

                      
              
                            
                              {this.state.property_list.map((x) => {
                             if ((x.building_type === "1"  && x.property_for === "1") && x.property_type === this.state.resale_id ) {      
                            return (
                            <>
                            <React.Fragment>
                            <Col md={4}>
                              <div className="Resale_Properties_Card_Section">
                                <Row>
                                  <Col md={12}>
                                    <div className="Resale_Properties_First_Description">
                                      <h6>Avaliable Sale</h6>



<h6>
<p>{x.project_name}</p>
                                      </h6>
                                    </div>
                                  </Col>
                                  <Col md={4} xs={4} className="pt-3">
                                    <div className="Resale_Property_Image_Main_Section">
                                      <img src={images.Homepage_Resale} />
                                    </div>
                                  </Col>
                                  <Col md={6} xs={8} className="pt-3">
                                   
                                    <p>
                                     {x.price_value +
                                                " " +
                                                Config.datamatch(
                                                  x.project_size,
                                                  project_size
                                                )}
                                     </p>
                                    <p>{x.property_location}</p>
                                    <p>{x.project_value} Lac</p>
                                   
                                  </Col>
                                </Row>
                              </div>
                            </Col>
                            </React.Fragment>
                            </>
                            );
                        }
                          })}
                               
                               





                       
                        
                      

                    



                        
                       
                       
                        </Row>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="Commercial" title="Commercial"></Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Properties Sale */}

        {/* Properties Rent */}

        {/* Properties Rent in Mumbai */}

        <section className="Resale Resale_Rent_Section" id="Rent">
          <Container>
            <Row>
              <Col md={12} lg={12} className="text-center" id="Rent_InnerScroll">
                <span className="sub_headings_underling">Rent</span>
                
                <h2>Rental in Mumbai</h2>
              </Col>
              <Col md={12}>
                <Tabs
                  defaultActiveKey="Residental"
                  id="uncontrolled-tab-example"
                >
                  <Tab eventKey="Residental" title="Residental">
                    <Row>
                      <Col md={12} className="Resale_Properties_Categories">
                        <Row>
                          <Col md={2} xs={6}>
                            <h6>Plot</h6>
                          </Col>
                          <Col md={2} xs={6}>
                            <h6>Apartment</h6>
                          </Col>
                          <Col md={2} xs={6}>
                            <h6>Indepent House</h6>
                          </Col>
                          <Col md={2} xs={6}>
                            <h6>Bulding House</h6>
                          </Col>
                          <Col md={2} xs={6}>
                            <h6>Villa</h6>
                          </Col>
                        </Row>
                      </Col>
                      <Col md={12} className="Resale_Properties_Categories">
                        <Row>
                          <Col md={4}>
                            <div className="Resale_Properties_Card_Section">
                              <Row>
                                <Col md={12}>
                                  <div className="Resale_Properties_First_Description">
                                    <h6>Avaliable Sale</h6>
                                    <h6 className="Reindetal_Text">
                                      Residental
                                    </h6>
                                  </div>
                                </Col>
                                <Col md={4} xs={4} className="pt-3">
                                  <div className="Resale_Property_Image_Main_Section">
                                    <img src={images.Homepage_Resale} />
                                  </div>
                                </Col>
                                <Col md={6} xs={8} className="pt-3">
                                  <p>1200 Sq.Ft. Plot in Besa</p>
                                  <p>Besa, Nagpur</p>

                                  <p>19.8 Lac</p>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="Resale_Properties_Card_Section">
                              <Row>
                                <Col md={12}>
                                  <div className="Resale_Properties_First_Description">
                                    <h6>Avaliable Sale</h6>
                                    <h6 className="Reindetal_Text">
                                      Residental
                                    </h6>
                                  </div>
                                </Col>
                                <Col md={4} xs={4} className="pt-3">
                                  <div className="Resale_Property_Image_Main_Section">
                                    <img src={images.Homepage_Resale} />
                                  </div>
                                </Col>
                                <Col md={6} xs={8} className="pt-3">
                                  <p>1200 Sq.Ft. Plot in Besa</p>
                                  <p>Besa, Nagpur</p>

                                  <p>19.8 Lac</p>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="Resale_Properties_Card_Section">
                              <Row>
                                <Col md={12}>
                                  <div className="Resale_Properties_First_Description">
                                    <h6>Avaliable Sale</h6>
                                    <h6 className="Reindetal_Text">
                                      Residental
                                    </h6>
                                  </div>
                                </Col>

                                <Col md={4} xs={4} className="pt-3">
                                  <div className="Resale_Property_Image_Main_Section">
                                    <img src={images.Homepage_Resale} />
                                  </div>
                                </Col>
                                <Col md={6} xs={8} className="pt-3">
                                  <p>1200 Sq.Ft. Plot in Besa</p>
                                  <p>Besa, Nagpur</p>

                                  <p>19.8 Lac</p>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="Commercial" title="Commercial"></Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </section>

        <NewsBlogSection history={this.props.history} />

        <section
          className="testimonial-main-section"
          id="testimonial-main-section"
        >
          <Container>
            <Row>
              <Col
                md={12}
                lg={12}
                className="text-center testimonial-heading-section"
              >
                <span className="sub_headings_underling">TESTIMONIAL</span>
                <h2>Happy Clients</h2>
              </Col>

              <Col md={12}>
                <Slider {...testimonial}>
                  <div>
                    <div className="testimonial-card">
                      <div className="testimonial-image">
                        <img
                          className="img-fluid"
                          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                        />
                      </div>
                      <div className="testimonial-text">
                        <p>
                          Far far away, behind the word mountains, far from the
                          countries Vokalia and Consonantia, there live the
                          blind texts.
                        </p>
                      </div>
                      <div className="testimonial-content">
                        <h4>Anna Deynah</h4>
                        <h6 className="my-1">Founder at ET Company</h6>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="testimonial-card">
                      <div className="testimonial-image">
                        <img
                          className="img-fluid"
                          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                        />
                      </div>
                      <div className="testimonial-text">
                        <p>
                          Far far away, behind the word mountains, far from the
                          countries Vokalia and Consonantia, there live the
                          blind texts.
                        </p>
                      </div>
                      <div className="testimonial-content">
                        <h4>Anna Deynah</h4>
                        <h6 className="my-1">Founder at ET Company</h6>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="testimonial-card">
                      <div className="testimonial-image">
                        <img
                          className="img-fluid"
                          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                        />
                      </div>
                      <div className="testimonial-text">
                        <p>
                          Far far away, behind the word mountains, far from the
                          countries Vokalia and Consonantia, there live the
                          blind texts.
                        </p>
                      </div>
                      <div className="testimonial-content">
                        <h4>Anna Deynah</h4>
                        <h6 className="my-1">Founder at ET Company</h6>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="testimonial-card">
                      <div className="testimonial-image">
                        <img
                          className="img-fluid"
                          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                        />
                      </div>
                      <div className="testimonial-text">
                        <p>
                          Far far away, behind the word mountains, far from the
                          countries Vokalia and Consonantia, there live the
                          blind texts.
                        </p>
                      </div>
                      <div className="testimonial-content">
                        <h4>Anna Deynah</h4>
                        <h6 className="my-1">Founder at ET Company</h6>
                      </div>
                    </div>
                  </div>
                </Slider>
              </Col>
            </Row>
          </Container>
        </section>

        {/* <section>
               <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftrustingroup%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="340" height="500" 
               scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
               </section> */}

        {/* <section>
    <Container>
        <Row>
            <Col md={4} >
                <div className="Twitter-container">
                <a class="twitter-timeline" href="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw">Tweets by TwitterDev</a>
             
                </div>

            </Col>
        </Row>
    </Container>
 

</section>


             */}

        <section>
          <Container>
            <Row>
              <Col md={4}>
                {/* <div className="Twitter-container">
                <blockquote class="instagram-media" data-instgrm-captioned 
                data-instgrm-permalink="https://www.instagram.com/p/B5ciwPxgIBU/?utm_source=ig_embed&amp;utm_campaign=loading" 
                data-instgrm-version="13" 
                target="_blank">A post shared by Trustin (@trustingroup19)</blockquote> 
               
             
                </div> */}
              </Col>
            </Row>
          </Container>
        </section>

        {/* End Propertites */}

        <Footer />
        <FooterCallButton />
      </div>
    );
  }
}
