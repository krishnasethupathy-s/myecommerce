import React, { Component } from 'react';
import './HeaderInnerNavbar.css';
import { Nav, NavDropdown, Form, Navbar,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import images from '../constants/images';
export default class HeaderInnerNavbar extends Component {


  componentDidMount() {

    $(document).ready(function () {
      $(".dropdown").hover(
        function () {
          $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).slideDown("400");
          $(this).toggleClass('open');
        },
        function () {
          $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).slideUp("400");
          $(this).toggleClass('open');
        }
      );
    },
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 10) {
          $(".Header_Inner_Background").addClass("darkHeader");
        }
        else {
          $(".Header_Inner_Background").removeClass("darkHeader");
        }
      }
      ))
  }

  Logout_Function = () => {
    localStorage.clear();
  }

  render() {
    return (
      <section className="Header_Inner_Background" >
        <Navbar className="p-0 container" bg="light" expand="lg">
          <Navbar.Brand href="/"><Link to="/">
            {/* <h6> Amisuzi</h6> */}
            <img src={images.Logo_Image} alt="Logo" />
          </Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto mr-auto">


              <NavDropdown title="City" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Mumbai</NavDropdown.Item>


              </NavDropdown>
              <Nav.Link href="/">About Us</Nav.Link>
          
              <NavDropdown title="Solution" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">For Independent Brokers</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">For Real Estate Developers</NavDropdown.Item>

              </NavDropdown>
          
              <Nav.Link href="#link">Ask</Nav.Link>
              <Nav.Link href="#link">Home Loan</Nav.Link>
              <Nav.Link href="#link">Tools</Nav.Link>

              <Nav.Link href="/NewsList">Blog</Nav.Link>
            </Nav>
            <Form inline>
              {
                 localStorage.getItem('Authorization') === null ? 
           <React.Fragment>
    
              <Nav.Link href="/SignUp"><span><i class="fa fa-user-circle-o" aria-hidden="true"></i></span> Sign Up</Nav.Link>
              <Nav.Link href="/SignIn"><span><i class="fa fa-sign-in" aria-hidden="true"></i></span> Sign In</Nav.Link>
              </React.Fragment>
              
              :
              <React.Fragment>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkUYrITWyI8OhPNDHoCDUjGjhg8w10_HRqg&usqp=CAU"  className="Navbar_ProfileImage"/>
            <NavDropdown className="Profile_Nav_DropDown" title={localStorage.getItem('Authorization') === null ? 'Profile' : localStorage.getItem('first_name')} id="basic-nav-dropdown">
            <NavDropdown.Item href=""><Link to="/MyAccount">MyAccount</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => { this.Logout_Function(); }} href="/">Logout</NavDropdown.Item>
            </NavDropdown>
              </React.Fragment>
                 
              }

           
{/* 
              <NavDropdown className="Profile_Nav_DropDown" title={localStorage.getItem('Authorization') === null ? 'Profile' : localStorage.getItem('first_name')} id="basic-nav-dropdown">
              
              {
                localStorage.getItem('Authorization') === null ? 
                <>
                <NavDropdown.Item ><Link to="/SignUp">Register</Link></NavDropdown.Item>
                <NavDropdown.Item ><Link to="/SignIn">Login</Link></NavDropdown.Item></>
                 :
                 <>
                <NavDropdown.Item href=""><Link to="/MyAccount">MyAccount</Link></NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => { this.Logout_Function(); }} href="/">Logout</NavDropdown.Item></>
              }
                 */}
                
                


              {/* </NavDropdown> */}
              

            </Form>
          </Navbar.Collapse>
        </Navbar>
      
      </section>
      
    );
  }
}






