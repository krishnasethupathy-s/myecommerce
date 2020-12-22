import React, { Component } from 'react';
import { Row, Container, Col, Form, Button } from 'react-bootstrap';
import './ManageAddress.css';
import images from "../images";
import Config from "../../../Config";
import { gql } from "@apollo/client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageLoading from '../PageLoader/PageLoading';


export default class ManageAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
          setOpen: false,
          address_id: "",
          contact_name: "",
          mobile_number: "",
          address_line1: "",
          address_line2: "",
          city: "",
          state: "",
          pincode: "",
          landmark: "",
          type: "0",
          address_data: [],
      isLoadingComplete: true,

    
        };
      }
      async componentDidMount() {
        window.scrollTo(0, 0);
        localStorage.setItem('property_id',"");
        this.getCustomerAddressList();

        setTimeout(() => {
          this.setState({ isLoadingComplete: false });
          }, 3000);
    }



      handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };


      handleViewBtnClick = () => {
        this.setState((prevState) => ({
          setOpen: !prevState.setOpen,
        }));
      
    
        this.setState({ state: "" ,contact_name:'', mobile_number:'',address_line1:'',address_line2:'',city:'',pincode:'',landmark:'',type:'0'});
      };

      
  Radio_Onchange = () => {
    if (this.state.type === "0") {
      this.setState({ type: "1" });
    } else {
      this.setState({ type: "0" });
    }
  };
      // Add Customer Add

      AddCustomerAddress = (e) => {
        e.preventDefault();
        this.setState({ isLoadingComplete: true });

        const Authorization = localStorage.getItem("Authorization");
        const {
          address_id,
          contact_name,
          mobile_number,
          address_line1,
          address_line2,
          city,
          state,
          pincode,
          landmark,
          type,
        } = this.state;
        const mutation = `mutation addCustomerAddress($Authorization:String, $address_id:String , $contact_name:String , $mobile_number:String , 
                                            $address_line1:String , $address_line2:String , $city:String , $state:String , $pincode:String, $landmark:String , $type:String) {
              addCustomerAddress(Authorization:$Authorization, address_id:$address_id , contact_name:$contact_name , mobile_number:$mobile_number , address_line1:$address_line1 ,
                address_line2:$address_line2, city:$city, state:$state, pincode:$pincode, landmark:$landmark, type:$type ){
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
              Authorization,
              address_id,
              contact_name,
              mobile_number,
              address_line1,
              address_line2,
              city,
              state,
              pincode,
              landmark,
              type,
            },
          }),
        })
          .then((response) => response.json())
          .then((responseText) => {
            if (responseText.data.addCustomerAddress["message"] === "SUCCESS") {
              this.getCustomerAddressList();


              this.setState({ isLoadingComplete: false });
              toast.success("Successfully Added");
              setTimeout(() => {
        
                this.setState((prevState) => ({
                  setOpen: !prevState.setOpen,
                }));
                }, 2000);
            
            } else {
              alert(responseText.data.addCustomerAddress["message"]);
            }
          })
          .catch((error) => {
            alert(error);
          });
      };

       // End  Add Customer Add

      // Address get method

      getCustomerAddressList() {
        const Authorization = localStorage.getItem("Authorization");
    
        const query = gql`
          query getCustomerAddressList($Authorization: String) {
            getCustomerAddressList(Authorization: $Authorization) {
              id
              contact_name
              mobile_number
              address_line1
              address_line2
              city
              state
              type
              pincode
              landmark
            }
          }
        `;
    
        Config.client
          .query({
            query: query,
            fetchPolicy: "no-cache",
            variables: { Authorization },
          })
          .then((result) => {
            this.setState({ address_data: result.data.getCustomerAddressList });
          })
          .catch((error) => {
            alert(error);
          });
      }

      // End Address get method


      // Get CustomerData
      
  getCustomerAddressData(id) {
    const Authorization = localStorage.getItem("Authorization");

    const query = gql`
      query getCustomerAddressData($Authorization: String, $id: ID) {
        getCustomerAddressData(Authorization: $Authorization, id: $id) {
          id
          contact_name
          mobile_number
          address_line1
          address_line2
          city
          state
          pincode
          landmark
          type
        }
      }
    `;

    Config.client
      .query({
        query: query,
        fetchPolicy: "no-cache",
        variables: { Authorization, id },
      })
      .then((result) => {
        this.setState({ address_id: result.data.getCustomerAddressData["id"] });
        this.setState({
          contact_name: result.data.getCustomerAddressData["contact_name"],
        });
        this.setState({
          mobile_number: result.data.getCustomerAddressData["mobile_number"],
        });
        this.setState({
          address_line1: result.data.getCustomerAddressData["address_line1"],
        });
        this.setState({
          address_line2: result.data.getCustomerAddressData["address_line2"],
        });
        this.setState({ city: result.data.getCustomerAddressData["city"] });
        this.setState({ state: result.data.getCustomerAddressData["state"] });
        this.setState({
          pincode: result.data.getCustomerAddressData["pincode"],
        });
        this.setState({
          landmark: result.data.getCustomerAddressData["landmark"],
        });
        this.setState({ type: result.data.getCustomerAddressData["type"] });
      })
      .catch((error) => {
        alert(error);
      });
  }


  // End Get Customer Data



  // Delete Action


  getDelete_Action = (id) => {
    this.setState({ isLoadingComplete: true });

    const Authorization = localStorage.getItem("Authorization");
    const mutation = `mutation deleteCustomerAddress($Authorization:String, $id:ID ) {
            deleteCustomerAddress(Authorization:$Authorization, id:$id){
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

        variables: { Authorization, id },
      }),
    })
      .then((response) => response.json())
      .then((responseText) => {

        if (responseText.data.deleteCustomerAddress["message"] === "SUCCESS") {
          this.getCustomerAddressList();

          this.setState({ isLoadingComplete: false });
              toast.success("Successfully Deleted");


        } else {
          alert(responseText.data.deleteCustomerAddress["message"]);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };


  // end Delete Action

  handletoAddressEdit = (id) => {
    this.getCustomerAddressData(id);

    this.setState((prevState) => ({
      setOpen: !prevState.setOpen,
    }));
  };
  handletoDelete = (id) => {
    this.getDelete_Action(id);
  };


    
      
    render() {

        return (
<div className="manage-address-wrapper">

<Container>
                    <Row>
                    {
                        this.state.isLoadingComplete ? <PageLoading />
                          : null
                    }
                     <div><ToastContainer  position="bottom-right" /></div>
                      <Col
                        md={12}
                        className="MyAddress_Details_Section_Heading"
                      >
                        <h6>Manage Address</h6>


                        <Row>
                          <Col md={12} className="MyAddress_Border_Section">
                            <div>
                            <div className="MyAddress_Add_Section">
                                <h6    onClick={() => this.handleViewBtnClick()}>ADD A NEW ADDRESS</h6>

                                <i
                                className="fa fa-plus"
                                aria-hidden="true"
                                onClick={() => this.handleViewBtnClick()}
                              ></i>
                              </div>

                            
                          

                            {this.state.setOpen ? (
                              <Form onSubmit={this.AddCustomerAddress}>
                                <Row>
                                  <Col md={6}>
                                    <Form.Group controlId="formGridEmail">
                                      <Form.Label>Contact Name</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter Contact Name"
                                        value={this.state.contact_name}
                                        name="contact_name"
                                        onChange={this.handleChange}
                                        required
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group controlId="formGridPassword">
                                      <Form.Label>Mobile Number</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter Mobile Number"
                                        value={this.state.mobile_number}
                                        name="mobile_number"
                                        onChange={this.handleChange}
                                        required
                                        minLength="10"
                                        maxLength="10"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group controlId="formGridAddress1">
                                      <Form.Label>Address Line-1</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter Address Line-1"
                                        value={this.state.address_line1}
                                        name="address_line1"
                                        onChange={this.handleChange}
                                        required
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group controlId="formGridAddress2">
                                      <Form.Label>Address Line-2</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter Address Line-2"
                                        value={this.state.address_line2}
                                        name="address_line2"
                                        onChange={this.handleChange}
                                        required
                                      />
                                    </Form.Group>
                                  </Col>

                                  <Col md={6}>
                                    <Form.Group controlId="formGridCity">
                                      <Form.Label>City</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter City"
                                        value={this.state.city}
                                        name="city"
                                        onChange={this.handleChange}
                                        required
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group controlId="formGridState">
                                      <Form.Label>State</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter State"
                                        value={this.state.state}
                                        name="state"
                                        onChange={this.handleChange}
                                        required
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group controlId="formGridZip">
                                      <Form.Label>Pincode</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter Pincode"
                                        value={this.state.pincode}
                                        name="pincode"
                                        onChange={this.handleChange}
                                        required
                                        minLength="6"
                                        maxLength="6"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group controlId="formGridZip">
                                      <Form.Label>Landmark</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter landmark"
                                        value={this.state.landmark}
                                        name="landmark"
                                        onChange={this.handleChange}
                                        required
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={12}>
                                    <fieldset>
                                      <Form.Group as={Row}>
                                        <Col
                                          sm={6}
                                          className="Radio_button_Container"
                                        >
                                          <Form.Check
                                            type="radio"
                                            label="Home"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios1"
                                            checked={this.state.type === "0"}
                                            onClick={this.Radio_Onchange}
                                          />
                                          <Form.Check
                                            type="radio"
                                            label="Office"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios2"
                                            checked={this.state.type === "1"}
                                            onClick={this.Radio_Onchange}
                                          />
                                        </Col>
                                      </Form.Group>
                                    </fieldset>
                                  </Col>

                                  <div className="Submit_Button_Section">
                                    <Button
                                      variant="outline-primary Hiring_Button"
                                      type="submit"
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                </Row>
                              </Form>
                            ) : null}
                            </div>
                          </Col>
                        </Row>
                        {}

                        {this.state.address_data.map((item, index) => (
                          <Row key={index}>
                            <Col
                              md={12}
                              className="Address_Details_Border_Section"
                            >
                              <div className="Address_Details_Main_Section">
                                <div className="Address_Details_Type">
                                  <h6>
                                    {item.type === "0" ? "Home" : "Office"}
                                  </h6>
                                </div>
                                <div>
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                    onClick={() =>
                                      this.handletoAddressEdit(item.id)
                                    }
                                  ></i>
                                  <i
                                    className="fa fa-trash ml-2"
                                    aria-hidden="true"
                                    color="red"
                                    onClick={() => this.handletoDelete(item.id)}
                                  ></i>
                                </div>
                              </div>
                              <Row>
                                <Col md={4}>
                                  <div className="Address_Name_Details_Section">
                                    <h6>{item.contact_name}</h6>
                                    <h6>{item.mobile_number}</h6>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={12}>
                                  <div className="Address_Full_Details_Section">
                                    <h6>
                                      {item.address_line1} {item.address_line2}{" "}
                                      {item.city} {item.state} &nbsp;
                                      {item.landmark} {item.pincode}{" "}
                                    </h6>
                                   
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}

                        <Row>
                          <div className="Manage_footer_container"> 
                          <img
                            src={images.Account_Bottom}
                            alt="Amisuzi"
                            className="img-fluid w-100"
                          />
                          </div>
                       
                        </Row>
                      </Col>
                    </Row>
                  </Container>
</div>

        );
    }
}
