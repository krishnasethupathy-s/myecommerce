import React, { Component } from 'react';

import './SignIn.css';
import Footer from '../Footer/Footer';
import HeaderInnerNavbar from '../HeaderInnerNavbar/HeaderInnerNavbar';
import { Container, Col, Row, Button, Jumbotron, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

import PageLoading from '../constants/PageLoader/PageLoading';


import Config from '../../Config';

export default class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lastname: '',
            password: '',
            client_ip: '',
            redirect: false,
            isLoadingComplete: true,


        };
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        // localStorage.clear();
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
        const { username, password, client_ip } = this.state;

        const mutation = `mutation SignInAction($username:String, $password:String, $client_ip:String, $request_token:String) {
            SignInAction(username:$username, password:$password, client_ip:$client_ip, request_token:$request_token){
          message,first_name,last_name,token,image_address,mobile_number1,email_id
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
                variables: { username, password, client_ip, request_token },
            })
        }).then(response => response.json())
            .then(responseText => {


                if (responseText.data.SignInAction['message'] === "SUCCESS") {
                    // alert(responseText.data.SignUpAction['message']);
                    // this.props.history.push('/');
                    this.setState({   isLoadingComplete: false})

                    localStorage.setItem('first_name', responseText.data.SignInAction['first_name']);
                    localStorage.setItem('last_name', responseText.data.SignInAction['last_name']);
                    localStorage.setItem('mobile_number1', responseText.data.SignInAction['mobile_number1']);
                    localStorage.setItem('email_id', responseText.data.SignInAction['email_id']);
                    localStorage.setItem('Authorization', responseText.data.SignInAction['token']);
                    localStorage.setItem('image_address', responseText.data.SignInAction['image_address']);
                    this.setState({ redirect: true });
                }
                else if (responseText.data.SignInAction['message'] === "0") {
                    alert("UserName Password Already Entered")
                }
                else {
                    alert(responseText.data.SignInAction['message'])
                }
            }).catch((error) => {
                alert(error);

            });
    };


    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
     
        return (

            <section>
                <HeaderInnerNavbar />
             
                <div id="SignIn_Main_Section">
                    <Jumbotron fluid className="text-center">
                        <Container >
                            <h4>Create Account</h4>
                            <div className="SignIn_Section" >
                                <ul className="Inner_nav">
                                    <li><a href="#home"><i className="fa fa-sign-in"></i> Home</a></li>
                                    <Link to="/SignIn">
                                        <li><a href="#about"><i class="fa fa-user-circle-o" ></i> SignIn</a></li>

                                    </Link>

                                </ul>
                            </div>
                        </Container>
                    </Jumbotron>
                </div>
                <div className="SignIn_Form_Section">
                {
                        this.state.isLoadingComplete ? <PageLoading />
                          : null
                    }
                    <Container>
                        <Row>

                            <Col md={6} md={{ span: 4, offset: 4 }} >

                                <Form name="form" onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Enter email" name="username" onChange={this.handleChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} required />
                                    </Form.Group>
                                    <Link to="/Forgetpassword">
                                        <h6 className="Forget_Text_Password">Forgot your password?</h6>
                                    </Link>
                                    <Button variant="primary" type="submit" className="SignIn">
                                        Login</Button>
                                    <div className="Create_Account_Text">
                                        <Link to="/SignUp">
                                            <h6>Create account</h6></Link>
                                        <Link to="/">
                                            <h6>Return to Home</h6></Link>
                                    </div>
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
