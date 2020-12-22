import React, { Component } from 'react';
import { Row, Container, Col, Button, Card, } from 'react-bootstrap';
import './MyProperty.css';
import Config from '../../../Config';
import {  withRouter} from "react-router-dom";
import PageLoading from '../PageLoader/PageLoading';

class MyProperty extends Component {

  constructor(props) {
    super(props)
    this.state = {
      propery_list:[],
      isLoadingComplete: true,
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
  
    localStorage.setItem('property_id',"");
    this.fetchPropertyList();
  }



  async fetchPropertyList() {
    try {

      const Authorization = localStorage.getItem('Authorization');
      const form_Data1 = JSON.stringify({ Authorization});
      let response = await fetch(Config.BaseUrl + 'PropertyList/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: form_Data1,
      });
      let responseJsonData = await response.json();

      this.setState({propery_list:responseJsonData});
      this.setState({ isLoadingComplete: false});
      return responseJsonData;
    }
    catch (e) {
      console.log(e)
    }
  }


  EditAction =(id)=>
  {
    localStorage.setItem('MyAccountEdit', "true");
    localStorage.setItem('property_id',id);
    window.location.reload();
  }

  property_navigate =(id)=>
  {

    localStorage.setItem('property_id',id);
    this.props.history.push('/ProductDescription');
  }
  render() {

    return (
      <div>
       
   
      <div className="Myproperty-wrapper">
       
        <section>
          <Container>
            <Row>
         
              <Col md={12}>
              {
        this.state.isLoadingComplete ? <PageLoading />
          : null
    }
      
                <div className="myproperty-heading">
                <h6>MyProperty List</h6>

                
                </div>
              </Col>
            </Row>
       
            <Row className="my-property-list">
            {
        this.state.propery_list.map((data) => {
    return (

      <Col md={4} lg={4}  xl={4} xs={12}>
                <Card>
                  <Card.Img variant="top" src={data.cover_image_address} />
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                      <h5>{data.project_name}</h5>
                      <small>{data.property_location}</small>
                      <Row className="py-2">
                        <Col md={6}>
                 <span>{data.project_value}</span>
                        </Col>
                        <Col md={6} className="text-center">
                          <span>{data.possession_status === "1" ? 'Ready To Move' :'Under Construction'}</span>
                          {data.possession_status === "1" ? 
                          
                          <div class="progressBar"><span className="span_width_1"></span></div> :<div class="progressBar"><span className="span_width_2"></span></div>}
                        
                        
                        </Col>
                        <Col md={12}>
                          <p>1,2,3 BHK Apartment</p>
                          <p>572-1489 SF (Saleable)</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                   

                          <Button
                            type="button"
                            variant="outline-primary"
                            className="MyAccount_Update_Button w-100" 
                      
                            onClick={()=>{this.property_navigate(data.id)}}
                          >
                            View
                                </Button>
                         

                        </Col>
                        <Col md={6}>
                          <Button
                            type="submit"
                            variant="outline-primary"
                            className="MyAccount_Update_Button w-100"
                            onClick={()=>{this.EditAction(data.id)}}
                         
                          >
                            Edit
                                </Button>

                        </Col>
                      </Row>


                    </Card.Text>

                  </Card.Body>
                </Card>
              </Col>
  
    )
  })

}
     
      
           
           
            </Row>
          </Container>

        </section>


      </div></div>

    );
  }
}
export default withRouter(MyProperty);