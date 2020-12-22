import React, { Component } from 'react';

import './SignUp.css';
import Footer from '../Footer/Footer';
import HeaderInnerNavbar from '../HeaderInnerNavbar/HeaderInnerNavbar';
import { Container, Col, Row, Button, Jumbotron, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Config from '../../Config';
import PageLoading from '../constants/PageLoader/PageLoading';

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            mobile_number1: '',
            email_id: '',
            password: '',
            client_ip: '',
            isLoadingComplete: true,


        };
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        localStorage.clear();
        this.getIP().then(data => {
            this.setState({ client_ip: data['ip'] });
        });
        setTimeout(() => {
            this.setState({   isLoadingComplete: false,})
            }, 2000);
    }


    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async getIP() {
        const response = await fetch('https://api.ipify.org/?format=json');
        const data = await response.json();
        return data;
    }

    handleSubmit = (e) => {
        this.setState({   isLoadingComplete: true})
        e.preventDefault();
        const request_token = Config.getRequestToken();
        const { first_name, last_name, mobile_number1, email_id, password, client_ip } = this.state;
        const mutation = `mutation SignUpAction($email_id:String, $mobile_number1:String, $first_name:String, $last_name:String,  
                                     $password:String, $request_token:String, $client_ip:String ) {
      SignUpAction(email_id:$email_id, mobile_number1:$mobile_number1, first_name:$first_name, last_name:$last_name, password:$password ,
        request_token:$request_token, client_ip:$client_ip){
          message
      }
  }`;

        fetch(Config.BaseUrl + 'graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: { email_id, mobile_number1, first_name, last_name, password, request_token, client_ip },
            })
        }).then(response => response.json())
       
            .then(responseText => {
                if (responseText.data.SignUpAction['message'] === "SUCCESS") {
                    // alert(responseText.data.SignUpAction['message']);
                    this.setState({   isLoadingComplete: false})
                    this.props.history.push('/SignIn');
                }
                else if (responseText.data.SignUpAction['message'] === "0") {
                    alert("UserName Password Already Entered")
                }
                else {
                    alert(responseText.data.SignUpAction['message'])
                }
            }).catch((error) => {
                alert(error);
              
            });
    };



    render() {
        return (

            <section>
                <HeaderInnerNavbar />
               
                <div id="SignUp_Main_Section">
                    <Jumbotron fluid className="text-center">
                        <Container >
                            <h4> Account</h4>
                            <div className="SignUp_Section" >
                                <ul className="Inner_nav">
                                    <Link to="/">
                                        <li><a><i className="fa fa-sign-in"></i> Home</a></li>
                                    </Link>
                                    <Link to="/SignIn">
                                        <li><a><i class="fa fa-user-circle-o" ></i> SignIn</a></li>

                                    </Link>

                                </ul>
                            </div>
                        </Container>
                    </Jumbotron>
                </div>
                <div className="SignUp_Form_Section">
                {
                        this.state.isLoadingComplete ? <PageLoading />
                          : null
                    }
                    <Container>
                        <Row>
                            <Col md={6} md={{ span: 4, offset: 4 }} >

                                <Form name="form" onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="FirstName">
                                        <Form.Control type="text" placeholder="Enter FirstName" name="first_name" onChange={this.handleChange} required />

                                    </Form.Group>
                                    <Form.Group controlId="LastName">
                                        <Form.Control type="text" placeholder="Enter LastName" name="last_name" onChange={this.handleChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="Mobile">
                                        <Form.Control maxLength="10" type="text" placeholder="Enter Mobile" name="mobile_number1" onChange={this.handleChange} required />
                                    </Form.Group>

                                    <Form.Group controlId="Email">
                                        <Form.Control type="text" placeholder="Enter Email" name="email_id" onChange={this.handleChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Control type="password" placeholder="Enter password" name="password" onChange={this.handleChange} required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="SignIn" >
                                        Create</Button>
                                    <Link to="/SignIn">
                                        <h6 className="Sign_up_Text">SignIn </h6>
                                    </Link>



                                </Form>

                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </section>
        );
    }
}
