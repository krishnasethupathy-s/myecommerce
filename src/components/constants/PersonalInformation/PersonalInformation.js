import React, { Component } from "react";
import { Row, Container, Col, Form, Button } from "react-bootstrap";
import "./PersonalInformation.css";
import images from "../images";
import Config from "../../../Config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageLoading from '../PageLoader/PageLoading';


export default class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      mobile_number1: localStorage.getItem("mobile_number1"),
      email_id: localStorage.getItem("email_id"),
    
      isLoadingComplete: true,
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.setState({ isLoadingComplete: false });
      }, 2000);
  }



  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    this.setState({ isLoadingComplete: true });
    e.preventDefault();
    const Authorization = localStorage.getItem("Authorization");
    const { first_name, last_name, mobile_number1, email_id } = this.state;
    const mutation = `mutation CustomerUpdation($email_id:String, $mobile_number1:String, $first_name:String, $last_name:String,  
                                          $Authorization:String ) {
                                            CustomerUpdation(email_id:$email_id, mobile_number1:$mobile_number1, first_name:$first_name, last_name:$last_name,
            Authorization:$Authorization){
              message
          }
      }`;

    fetch(Config.BaseUrl + "graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          email_id,
          mobile_number1,
          first_name,
          last_name,
          Authorization,
        },
      }),
    })
      .then((response) => response.json())

      .then((responseText) => {
        if (responseText.data.CustomerUpdation["message"] === "SUCCESS") {
          this.setState({ isLoadingComplete: false });
          toast.success("Successfully Added");
          localStorage.setItem('first_name',this.state.first_name);
          localStorage.setItem('last_name',this.state.last_name);
          localStorage.setItem('mobile_number1',this.state.mobile_number1);
          localStorage.setItem('email_id',this.state.email_id);
          setTimeout(() => {
        
          window.location.reload();
          }, 2000);
         
          
         
        } else {
          // alert(responseText.data.CustomerUpdation["message"]);
          toast.success(responseText.data.CustomerUpdation["message"]);
          setTimeout(() => {
        
            window.location.reload();
            }, 2000);
        }
      })
      .catch((error) => {
        toast.success(error);
     
      });
  };

  render() {
    return (
      <div className="personal-information-wrapper">
        <Container>
        {
                        this.state.isLoadingComplete ? <PageLoading />
                          : null
                    }
          <Row>
            <Col md={12} className="Personal_Information_Heading">
              <h6>Personal Information</h6>
              <Form name="form" onSubmit={this.handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>First</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.first_name}
                        placeholder="Enter First Name"
                        name="first_name"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        value={this.state.last_name}
                        placeholder="Enter Last Name"
                        name="last_name"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Label>Email</Form.Label>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        value={this.state.email_id}
                        placeholder="Enter email"
                        name="email_id"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Label>Mobile</Form.Label>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        maxLength="10"
                        value={this.state.mobile_number1}
                        placeholder="Enter Mobile Number"
                        name="mobile_number1"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} className="Mobile_Button_container">
                    <div className="Submit_Button_Section">
                      <Button
                        type="submit"
                        variant="outline-primary"
                        className="MyAccount_Update_Button"
                      >
                        Update
                      </Button>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={12} className="py-4 faq_Main_Section">
                  <div><ToastContainer  position="bottom-right" /></div>
                    <div>
                      <h5>FAQs</h5>
                      <h6>
                        What happens when I update my email address (or mobile
                        number)?
                      </h6>
                      <p>
                        Your login email id (or mobile number) changes,
                        likewise. You'll receive all your account related
                        communication on your updated email address (or mobile
                        number).
                      </p>
                    </div>

                    <div>
                      <h6>
                        What happens when I update my email address (or mobile
                        number)?
                      </h6>
                      <p>
                        Your login email id (or mobile number) changes,
                        likewise. You'll receive all your account related
                        communication on your updated email address (or mobile
                        number).
                      </p>
                    </div>

                    <div>
                      <h6>
                        What happens when I update my email address (or mobile
                        number)?
                      </h6>
                      <p>
                        Your login email id (or mobile number) changes,
                        likewise. You'll receive all your account related
                        communication on your updated email address (or mobile
                        number).
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <img
                  
                    src={images.Account_Bottom}
                    alt="RealEsate"
                    className="img-fluid w-100"
                  />
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
