import React, { Component } from "react";
import "./MyAccount.css";
import Footer from "../Footer/Footer";
import HeaderInnerNavbar from "../HeaderInnerNavbar/HeaderInnerNavbar";
import PersonalInformation from "../constants/PersonalInformation/PersonalInformation";
import ManageAddress from "../constants/ManageAddress/ManageAddress";
import AddProperty from "../constants/AddProperty/AddProperty";
import MyProperty from "../constants/MyProperty/MyProperty";
import {Container,Col,Row, Jumbotron,} from "react-bootstrap";
import { Link } from "react-router-dom";
import PageLoading from "../constants/PageLoader/PageLoading";



export default class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setOpen: false,
      profile_information: true,
      manage_infromation: false,
      AddnewProperty: false,
      MyProperty:false,
      client_ip: "",
      // isLoadingComplete: true,
      propery_list:[],

    };
  }

  Logout_Function = () => {
    localStorage.clear();
    this.props.history.push('/')
  };



  async componentDidMount() {
    window.scrollTo(0, 0);
  
  const MyAccountStatus= localStorage.getItem('MyAccountStatus');
  if(MyAccountStatus==="true")
  {
    this.setState({AddnewProperty:false,MyProperty:true,profile_information:false});
    localStorage.setItem('MyAccountStatus', "false");
  }

  const MyAccountEdit= localStorage.getItem('MyAccountEdit');
  if(MyAccountEdit==="true")
  {
    this.setState({AddnewProperty:true,MyProperty:false,profile_information:false});
    localStorage.setItem('MyAccountEdit', "false");
  }
   
  

  
    // setTimeout(() => {
    //   this.setState({ isLoadingComplete: false });
    // }, 2000);
  }


 

  handleViewBtnClick = () => {
    this.setState((prevState) => ({
      setOpen: !prevState.setOpen,
    }));

    this.setState({ state: "" });
  };
  handleViewBtnClickAccount = () => {
    this.setState({
      profile_information: true,
      manage_infromation: false,
      AddnewProperty: false,
      MyProperty: false,

    });
  };

  handleViewBtnClickMange = () => {
    this.setState({
      profile_information: false,
      manage_infromation: true,
      AddnewProperty: false,
      MyProperty: false,

    });
  };

  handlleNewProperty = () => {
    this.setState({
      AddnewProperty: true,
      manage_infromation: false,
      profile_information: false,
      MyProperty: false,
    });
  };
  handleMyProperty = () => {
    this.setState({
      MyProperty: true,
      manage_infromation: false,
      profile_information: false,
      AddnewProperty: false,
    });
  };




  render() {
  
  
    return (
      <section>
        <HeaderInnerNavbar />

        <div id="SignIn_Main_Section">
          <Jumbotron fluid className="text-center">
            <Container>
              <h4>My Account</h4>
              <div className="SignIn_Section">
                <ul className="Inner_nav">
                  <li>
                    <a href="#home">
                      <i className="fa fa-sign-in"></i> Home
                    </a>
                  </li>
                  <Link to="/SignIn">
                    <li>
                      <a href="#about">
                        <i className="fa fa-user-circle-o"></i> MyAccount
                      </a>
                    </li>
                  </Link>
                </ul>
              </div>
            </Container>
          </Jumbotron>
        </div>

        <section id="My_Profile_Account_Section">
          <div className="animation_View_parent">
            {this.state.isLoadingComplete ? <PageLoading /> : null}
          </div>

          <Container>
            <Row>
              <Col md={3}>
                <div className="mb-2 My_Account_Basic_Details">
                  <div className="My_Account_Profile_Image">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                    alt="Amisuzi RealEstate"
                  />
                  </div>
               
                  <div>
                    <h6 className="Padding_left">Hello</h6>
                    {localStorage.getItem("Authorization") === null ? (
                      <h6 className="Padding_left"> </h6>
                    ) : (
                      <h6 className="Padding_left">
                        {localStorage.getItem("first_name")}{" "}
                        {localStorage.getItem("last_name")}
                      </h6>
                    )}
                  </div>
                </div>
                <div className="mb-1 My_Account_Basic_Details">
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  <div className="My_Account_Heading_Section ">
                    <h6 className="My_Account_Heading_Text">Reward Points</h6>
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="My_Account_Basic_Details">
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  <div className="My_Account_Heading_Section ">
                    <h6 className="My_Account_Heading_Text">Account</h6>
                  </div>
                </div>
                <div className="My_Account_Basic_Details" >
                  <div className="My_Account_Heading_Section ">
                    <h6
                     className={this.state.profile_information ? 'MyAccount_SubHeading active_background': 'MyAccount_SubHeading'} 
                      onClick={() => this.handleViewBtnClickAccount()}
                    >
                      Profile Information
                    </h6>
                    <i
                      className="fa fa-arrow-right"
                      aria-hidden="true"
                      onClick={() => this.handleViewBtnClickAccount()}
                    ></i>
                  </div>
                </div>
                <div className="mb-1 My_Account_Basic_Details">
                  <div className="My_Account_Heading_Section ">
                    <h6
                     className={this.state.manage_infromation ? 'MyAccount_SubHeading active_background': 'MyAccount_SubHeading'} 
                      onClick={() => this.handleViewBtnClickMange()}
                    >
                      Manage Address
                    </h6>
                    <i
                      className="fa fa-arrow-right"
                      aria-hidden="true"
                      onClick={() => this.handleViewBtnClickMange()}
                    ></i>
                  </div>
                </div>
                <div className="mb-1 My_Account_Basic_Details">
                  <div className="My_Account_Heading_Section ">
                    <h6
                     className={this.state.AddnewProperty ? 'MyAccount_SubHeading active_background': 'MyAccount_SubHeading'} 
                      onClick={() => this.handlleNewProperty()}
                    >
                      Add Property
                    </h6>
                    <i
                      className="fa fa-arrow-right"
                      aria-hidden="true"
                      onClick={() => this.handleMyProperty()}
                    ></i>
                  </div>
                </div>
                <div className="mb-1 My_Account_Basic_Details">
                  <div className="My_Account_Heading_Section ">
                    <h6
                      className={this.state.MyProperty ? 'MyAccount_SubHeading active_background': 'MyAccount_SubHeading'} 
                      onClick={() => this.handleMyProperty()}
                    >
                      My Property
                    </h6>
                    <i
                      className="fa fa-arrow-right"
                      aria-hidden="true"
                      onClick={() => this.handleMyProperty()}
                    ></i>
                  </div>
                </div>

                <div className="My_Account_Basic_Details">
                
                    <i
                      onClick={() => {
                        this.Logout_Function();
                      }}
                      className="fa fa-sign-out"
                      aria-hidden="true"
                    ></i>
                 
                  <div className="My_Account_Heading_Section ">
                  
                      <h6
                        onClick={() => {
                          this.Logout_Function();
                        }}
                        className="My_Account_Heading_Text"
                      >
                        Log Out
                      </h6>
                   
                  </div>
                </div>
              </Col>

              {this.state.profile_information === true ? (
                <Col md={9} className="My_Account_Profile_Details">
                 <PersonalInformation />
                </Col>
              ) : null}

              {this.state.AddnewProperty === true ? (
                <Col md={9} className="My_Account_Profile_Details">
                     <AddProperty />
                </Col>
              ) : null}

              
            {this.state.MyProperty === true ? (
                <Col md={9} className="My_Account_Profile_Details">
                     <MyProperty  history={this.props.history} />
                </Col>
              ) : null}

              {this.state.manage_infromation === true ? (
                <Col md={9} className="MyAddress_Details_Section">

                  <ManageAddress />

                </Col>
              ) : null}
            </Row>
          </Container>
        </section>

        <Footer />
      </section>
    );
  }
}
