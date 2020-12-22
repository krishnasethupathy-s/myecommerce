import React, { Component } from "react";
import {
  Row,
  Container,
  Col,
  Form,
  Button,
  Accordion,
  Card,
} from "react-bootstrap";
import "./AddProperty.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
} from "../../constants/AccountData";
import http from "../../../http_common";
import Config from "../../../Config";
import SucessModal from "../SucessModal/SucessModal";
import { toast } from 'react-toastify';

import * as Moment from 'moment';
import PageLoading from '../PageLoader/PageLoading';




export default class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addional_rooms_data: Addional_Rooms_Data,
      property_for: "1",
      building_type: "1",
      property_type: "11",
      property_id: "",

      no_of_rooms: "1",
      property_location: "",
      project_name: "",
      project_size: "1",
      project_value: "",
      price_for: "1",
      price_value: "",
      description: "",

      additional_rooms: [],
      available_from: "1",
      furnishing_status: "1",
      office_space_type: "1",
      pantry: "1",
      personal_washroom: "1",
      property_age: "1",
      no_of_bathrooms: "1",
      no_of_parkings: "1",
      view_facing: "",
      floor_no: "",
      tower_block: "",
      security_deposit_for: "1",
      security_deposit_amount: "",
      amenities: [],
      amenities_list: [],
      possession_status: "1",
      possession_date: new Date(),
      btn_id: "add",
      property_country: "in",
      image_address: [],
      broucher_address: [],
      broucherPreviewurl: [],
      broucher_title: [],
      imagePreviewUrl: [],
      image_title: ["0"],

      image_ids: [],
      broucher_ids: [],

      image_id:0,
      broucher_id:0,

      modalShow: false,
      product_array: [],
      id:'',
      isLoadingComplete:true,
    
    };
  }

  setModalShow = () => {
    this.setState((prevState) => ({
      modalShow: !prevState.modalShow,
    }));
    window.location.reload();
  };
  async componentDidMount() {
    window.scrollTo(0, 0);

    this.GetAmenitiesList();




    const property_id = localStorage.getItem("property_id");
    if (property_id === "" || property_id === null) {

    } else {


      setTimeout(() => {

        this.GetPropertyData();
          this.GetPropertyImageList();

      }, 1000);

      

 
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

      var image_count=0;
      var broucher_count=0;
      for (var i = 0; i < responseJsonData.length; i++) {
        if (responseJsonData[i].file_type === 1) {
          this.setState({
            imagePreviewUrl: [
              ...this.state.imagePreviewUrl,
              responseJsonData[i].image_address,
            ],
          });
          this.setState({
            image_ids: [
              ...this.state.image_ids,i,
            ],
          });
         image_count=image_count+1;
        } else {
          this.setState({
            broucherPreviewurl: [
              ...this.state.broucherPreviewurl,
              responseJsonData[i].image_address,
            ],
          });
          this.setState({
            broucher_ids: [
              ...this.state.broucher_ids,i,
            ],
          });
          broucher_count=broucher_count+1;
        }
      }

      this.setState({
        image_id: image_count,broucher_id:broucher_count
      });

      this.setState({ isLoadingComplete: false });

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

      this.setState({ product_array: responseJsonData });
      this.setState({property_location: responseJsonData["property_location"],});
     
      this.setState({ property_for: responseJsonData["property_for"] });

      console.log('Property_for'+responseJsonData["property_for"])
      this.setState({ project_name: responseJsonData["project_name"] });

      this.setState({ project_value: responseJsonData["project_value"] });
      this.setState({ price_value: responseJsonData["price_value"] });
      this.setState({ description: responseJsonData["description"] });
      this.setState({ floor_no: responseJsonData["floor_no"] });
      this.setState({ tower_block: responseJsonData["tower_block"] });
      this.setState({ building_type: responseJsonData["building_type"] });
      this.setState({ property_type: responseJsonData["property_type"] });
      this.setState({ no_of_rooms: responseJsonData["no_of_rooms"] });
      this.setState({ available_from: responseJsonData["available_from"] });
      this.setState({ furnishing_status: responseJsonData["furnishing_status"]});
      this.setState({ view_facing: responseJsonData["view_facing"]});

      this.setState({ btn_id: "update"});
      this.setState({id:responseJsonData["id"]})

      // this.setState({ possession_date: responseJsonData["possession_date"]});
      let dateToFormat =responseJsonData["possession_date"];
      let dateformat = Moment(dateToFormat).format("DD-MM-YYYY");
      this.setState({ possession_date: Config.stringToDate(dateformat)});
     


      // this.setState({ possession_date: Config.stringToDate(responseJsonData["possession_date"])});
      // alert(Config.stringToDate(responseJsonData["possession_date"]));


     


      this.setState({ property_age: responseJsonData["property_age"] });
      this.setState({ no_of_bathrooms: responseJsonData["no_of_bathrooms"] });
      this.setState({ no_of_parkings: responseJsonData["no_of_parkings"] });
      this.setState({
        security_deposit_for: responseJsonData["security_deposit_for"],
      });
      this.setState({
        security_deposit_amount: responseJsonData["security_deposit_amount"],
      });

     

  

      let image_titles = responseJsonData["image_title"];
      this.setState({ image_title: [] });
      if (image_titles.includes(",")) {
        let image_title_arr = image_titles.split(",");
        for (var i = 0; i < image_title_arr.length; i++) {
          this.setState({
            image_title: [...this.state.image_title, image_title_arr[i]],
          });
        }
      } else {
        if(image_titles === ""){

        }else{
          this.setState({
            image_title: [...this.state.image_title, image_titles],
          });
        }
       
      }

      let broucher_titles = responseJsonData["broucher_title"];
      if (broucher_titles.includes(",")) {
        let broucher_titles_arr = broucher_titles.split(",");
        for (var i = 0; i < broucher_titles_arr.length; i++) {
          this.setState({
            broucher_title: [
              ...this.state.broucher_title,
              broucher_titles_arr[i],
            ],
          });
        }
      } else {
        if(broucher_titles === ""){

        }else{
          this.setState({
            broucher_title: [...this.state.broucher_title, broucher_titles],
          });
        }
        
      }

      let ar_data = this.state.addional_rooms_data;
      let Additional_Rooms = responseJsonData["additional_rooms"];
      if (Additional_Rooms.includes(",")) {
        let Additional_Rooms_arr = Additional_Rooms.split(",");
        for (let j = 0; j < Additional_Rooms_arr.length; j++) {
          for (let i = 0; i < ar_data.length; i++) {
            if (Additional_Rooms_arr[j].toString() === ar_data[i]["id"]) {
              ar_data[i]["status"] = "1";
              this.setState({
                additional_rooms: [...this.state.additional_rooms, ar_data[i]["id"]],
              });
            }
          }
        }
      } else {
        for (let i = 0; i < ar_data.length; i++) {
          if (Additional_Rooms.toString() === ar_data[i]["id"]) {
            ar_data[i]["status"] = "1";
            this.setState({
              additional_rooms: [...this.state.additional_rooms, ar_data[i]["id"]],
            });
          }
        }
      }
      this.setState({
        addional_rooms_data: ar_data,
      });


// Amenties

      let amenities_list_data = this.state.amenities_list;
      let amenities =responseJsonData["amenities"];
     

      if(amenities_list_data.length === 0)
      {
        amenities_list_data = this.GetAmenitiesList();
      }
    
      console.log(JSON.stringify(amenities_list_data));
      
      if (amenities.includes(",")) {
    
        let amenities_Rooms_arr = amenities.split(",");
        for (let j = 0; j < amenities_Rooms_arr.length; j++) {
         
          for (let i = 0; i < amenities_list_data.length; i++) {
          
            if (amenities_Rooms_arr[j].toString() === amenities_list_data[i]["id"]) {
              amenities_list_data[i]["status"] = "0";
              this.setState({
                amenities: [...this.state.amenities, amenities_list_data[i]["id"]],
              });
             
            }
          }
        }
      } else {
        for (let i = 0; i < amenities_list_data.length; i++) {
          if (amenities.toString() === amenities_list_data[i]["id"]) {
            amenities_list_data[i]["status"] = "0";
            this.setState({
              amenities: [...this.state.amenities, amenities_list_data[i]["id"]],
            });
          }
        }
      }
      this.setState({
        amenities_list: amenities_list_data,
      });

// End Amentites



      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  }

  additional_rooms_function = (d) => {
    let ar_data = this.state.addional_rooms_data;

    let arr1 = this.state.additional_rooms;
    for (let i = 0; i < ar_data.length; i++) {
      if (ar_data[i]["id"] === d.id) {
        if (ar_data[i]["status"] === "1") {
          ar_data[i]["status"] = "0";
          for (let j = 0; j < arr1.length; j++) {
            if (arr1[j] === d.id) {
              if (j > -1) {
                arr1.splice(j, 1);
                this.setState({
                  additional_rooms: arr1,
                });
              }
            }
          }
        } else {
          ar_data[i]["status"] = "1";
          this.setState({
            additional_rooms: [...this.state.additional_rooms, d.id],
          });
        }
      }
    }

    // console.log(arr1);
    this.setState({
      addional_rooms_data: ar_data,
    });

    console.log(this.state.additional_rooms);
  };

  handleChange1 = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onchange_Checkbox_Handler = (d) => {

    
    let ar_data = this.state.amenities_list;
    let arr1 = this.state.amenities;

    for (let i = 0; i < ar_data.length; i++) {
      if (ar_data[i]["id"] === d.id) {
        if (ar_data[i]["status"] === "0") {
          ar_data[i]["status"] = "1";

          for (let j = 0; j < arr1.length; j++) {
            if (arr1[j] === d.id) {
              if (j > -1) {
                arr1.splice(j, 1);
                this.setState({
                  amenities: arr1,
                });
              }
            }
          }
        } else {
          ar_data[i]["status"] = "0";
          this.setState({
            amenities: [...this.state.amenities, d.id],
          });
        }
      }
    }

    this.setState({
      amenities_list: ar_data,
    });
  };

  image_title_function = (index, e) => {
    console.log(index);
    console.log(e.target.value);
    let event_value = e.target.value;
    let arr = this.state.image_title;
    arr[index] = event_value;
    this.setState({ image_title: arr });
  };

  delete_handler_function = (index) => {
    let Image_heading = this.state.image_title;
    let Image_location = this.state.imagePreviewUrl;
    let Image_Address = this.state.image_address;
    let image_ids = this.state.image_ids;

    // var index1 = Image_heading.indexOf(index);
    // var index2 = Image_location.indexOf(index);
    for (let i = Image_heading.length; i--; ) {
      if (Image_heading[i] === Image_heading[index]) {
        Image_heading.splice(i, 1);
        
      }
    }

    for (let i = Image_location.length; i--; ) {
      if (Image_location[i] === Image_location[index]) {
        Image_location.splice(i, 1);
      }
    }
    for (let i = Image_Address.length; i--; ) {
      if (Image_Address[i] === Image_Address[index]) {
        Image_Address.splice(i, 1);
      }
    }

    for (let i = image_ids.length; i--; ) {
      if (image_ids[i] === image_ids[index]) {
        image_ids.splice(i, 1);
      }
    }
    this.setState({
      image_title: Image_heading,
      imagePreviewUrl: Image_location,
      image_address: Image_Address,
      image_ids:image_ids
    });
  };
  delete_handler_function1 = (index) => {
    let Image_heading = this.state.broucher_title;
    let Image_location = this.state.broucherPreviewurl;
    let Image_Address = this.state.broucher_address;
    let broucher_ids = this.state.broucher_ids;


    // var index1 = Image_heading.indexOf(index);
    // var index2 = Image_location.indexOf(index);

    for (let i = Image_heading.length; i--; ) {
      alert(Image_heading[i]+"         "+Image_heading[index]);
      if (Image_heading[i] === Image_heading[index]) {
        Image_heading.splice(i, 1);
      }
    }

    for (let i = Image_location.length; i--; ) {
      if (Image_location[i] === Image_location[index]) {
        Image_location.splice(i, 1);
      }
    }
    for (let i = Image_Address.length; i--; ) {
      if (Image_Address[i] === Image_Address[index]) {
        Image_Address.splice(i, 1);
      }
    }
    for (let i = broucher_ids.length; i--; ) {
      if (broucher_ids[i] === broucher_ids[index]) {
        broucher_ids.splice(i, 1);
      }
    }
    this.setState({
      broucher_title: Image_heading,
      broucherPreviewurl: Image_location,
      broucher_address: Image_Address,
      broucher_ids:broucher_ids,
    });
  };

  fileSelectedHandler = (e) => {
    e.preventDefault();
    this.setState({
      image_address: [...this.state.image_address, ...e.target.files],
    });
  
    var image_count = this.state.image_id;
  

  
    for (var i = 0; i < e.target.files.length; i++) {
      let selectorFiles = e.target.files[i];
      let reader = new FileReader();
      reader.readAsDataURL(selectorFiles);
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: [...this.state.imagePreviewUrl, reader.result],
        });
        this.setState({
          image_ids: [...this.state.image_ids, image_count],
        });
        image_count=image_count+1;
      };
    
 
    }
    
    setTimeout(() => {
      this.setState({image_id:image_count});
  
    }, 1000);
  
   
  };

  fileSelectedHandler1 = (e) => {
    e.preventDefault();
    this.setState({
      broucher_address: [...this.state.broucher_address, ...e.target.files],
    });
    var broucher_count = this.state.broucher_id;

    //    alert(e.target.files[0].name)
    for (var i = 0; i < e.target.files.length; i++) {
      let selectorFiles = e.target.files[i];
      let reader = new FileReader();
      reader.readAsDataURL(selectorFiles);
      reader.onloadend = () => {
        this.setState({
          broucherPreviewurl: [...this.state.broucherPreviewurl, reader.result],
        });
     
        this.setState({
          broucher_ids: [...this.state.broucher_ids, broucher_count],
        });

        broucher_count=broucher_count+1;
      };
      this.setState({
        broucher_title: [...this.state.broucher_title, e.target.files[i].name],
      });
    
    }
 this.setState({broucher_id:broucher_count});
    
  };

  handleSubmit_AddProperty = (event) => {
    event.preventDefault();
    this.setState({ isLoadingComplete: true });

    
    const { property_for } = this.state;
    const { building_type } = this.state;
    const { property_type } = this.state;
    const { no_of_rooms } = this.state;
    const { property_location } = this.state;
    const { project_name } = this.state;
    const { project_size } = this.state;
    const { price_value } = this.state;

    const { project_value } = this.state;
    const { price_for } = this.state;
    const { description } = this.state;

    const { available_from } = this.state;
    const { furnishing_status } = this.state;
    const { office_space_type } = this.state;
    const { pantry } = this.state;
    const { personal_washroom } = this.state;
    const { property_age } = this.state;
    const { no_of_bathrooms } = this.state;
    const { no_of_parkings } = this.state;
    const { view_facing } = this.state;
    const { tower_block } = this.state;
    const { security_deposit_for } = this.state;
    const { security_deposit_amount } = this.state;
    const { possession_status } = this.state;
    const { btn_id } = this.state;
    const { id } = this.state;
    const { property_id } = this.state;
    const { property_country } = this.state;
    const { floor_no } = this.state;

    const { image_address } = this.state;

    let { image_title } = this.state;
    image_title = image_title.toString();
    const { broucher_address } = this.state;

    let { broucher_title } = this.state;
    broucher_title = broucher_title.toString();

    let { amenities } = this.state;
    amenities = amenities.toString();

    let { additional_rooms } = this.state;
    additional_rooms = additional_rooms.toString();

    let { possession_date } = this.state;
    possession_date = Moment(possession_date).format("YYYY-MM-DD");





    let { image_ids } = this.state;
    image_ids = image_ids.toString();
    let { broucher_ids } = this.state;
    broucher_ids = broucher_ids.toString();

    const Authorization = localStorage.getItem("Authorization");

    const form_Data1 = JSON.stringify({
      Authorization,
      property_for,
      building_type,
      property_type,
      no_of_rooms,
      property_location,
      project_name,
      project_size,
      project_value,
      price_for,
      price_value,
      description,
      additional_rooms,
      available_from,
      furnishing_status,
      office_space_type,
      pantry,
      personal_washroom,
      property_age,
      no_of_bathrooms,
      no_of_parkings,
      view_facing,
      tower_block,
      security_deposit_for,
      security_deposit_amount,
      amenities,
      possession_status,
      possession_date,
      btn_id,
      property_id,
      property_country,
      floor_no,
      image_title,
      broucher_title,
      id,
      image_ids,
      broucher_ids
    });
   
    const formData = new FormData();
    formData.append("json", form_Data1);

    let files = this.state.image_address;
    for (let i = 0; i < files.length; i++) {
      formData.append("image_address", files[i]);
    }

    let files1 = this.state.broucher_address;
    for (let i = 0; i < files1.length; i++) {
      formData.append("broucher_address", files1[i]);
    }

    formData.append("image_address", image_address);
    formData.append("broucher_address", broucher_address);

    http
      .post("/AddProperty", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
     
        if (response.data["message"] === "SUCCESS") {
        
          toast.success("Successfully Added");
          localStorage.setItem("MyAccountStatus", "true");
          localStorage.setItem("property_id", "");


          setTimeout(() => {
            window.location.reload();
          }, 2000);
         
        } else {
          toast.error("Properly filled");

        }
      })
      .catch((error1) => {
        alert(error1);

        console.error(error1);
      });
  };

  // Get Amenties

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

      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  }

  // Get Amenties

  Property_for_function = (d) => {
    this.setState({ property_for: d.id });
    this.setState({ price_for: d.id });
    console.log(this.state.price_for);
  };
  building_type_function = (d) => {
    this.setState({ building_type: d.id });
  };
  property_type_function = (d) => {
    this.setState({ property_type: d.id });
  };
  property_type_function1 = (d) => {
    this.setState({ property_type: d.id });
  };

  no_of_rooms_function = (d) => {
    this.setState({ no_of_rooms: d.id });
  };
  project_size_function = (event) => {
    this.setState({ project_size: event.target.value });
  };
  // additional_rooms_function = (d) => {
  //   this.setState({ additional_rooms: [...this.state.additional_rooms,d.id] });
  //   console.log(this.state.additional_rooms);

  // };

  additional_rooms_function = (d) => {
    let ar_data = this.state.addional_rooms_data;
    let arr1 = this.state.additional_rooms;
    console.log("Click Id" + d.id);
    for (let i = 0; i < ar_data.length; i++) {
      if (ar_data[i]["id"] === d.id) {


        if (ar_data[i]["status"] === "1") {

          ar_data[i]["status"] = "0";
          for (let j = 0; j < arr1.length; j++) {
            if (arr1[j] === d.id) {
              if (j > -1) {
                arr1.splice(j, 1);
                this.setState({
                  additional_rooms: arr1,
                });
              }
            }
          }
        } else {
          ar_data[i]["status"] = "1";
          this.setState({
            additional_rooms: [...this.state.additional_rooms, d.id],
          });
        }
      }
    }

    // console.log(arr1);
    this.setState({
      addional_rooms_data: ar_data,
    });

    console.log(this.state.additional_rooms);
  };

  available_from_function = (d) => {
    this.setState({ available_from: d.id });
  };

  possession_status_function = (d) => {
    this.setState({ possession_status: d.id });
  };
  furnishing_status_function = (d) => {
    this.setState({ furnishing_status: d.id });
  };
  no_of_bathrooms_function = (d) => {
    this.setState({ no_of_bathrooms: d.id });
  };
  no_of_parkings_function = (d) => {
    this.setState({ no_of_parkings: d.id });
  };

  view_facing_function = (event) => {
    this.setState({ view_facing: event.target.value });
  
  };

  property_age_function = (d) => {
    this.setState({ property_age: d.id });
  };

  security_deposit_for_function = (d) => {
    this.setState({ security_deposit_for: d.id });
  };

  Office_space_function = (d) => {
    this.setState({ office_space_type: d.id });
  };
  pantry_function = (d) => {
    this.setState({ pantry: d.id });
  };
  personal_function = (d) => {
    this.setState({ personal_washroom: d.id });
  };

  Onchange_Date_Function = (date) => {
    this.setState({ possession_date: date });
   
  };

  render() {
    const { view_facing, project_size, image_title } = this.state;
    return (
      <div className="Add-Property-wrapper">
        <Container>
        {
                        this.state.isLoadingComplete ? <PageLoading />
                          : null
                    }
          <Form onSubmit={this.handleSubmit_AddProperty}>
            <Row>
              <Col md={12} className="Personal_Information_Heading">
                <h6>Add Listing</h6>

                <div className="Add_Listing_Card_Section">
                  <div className="Main_Card_Box">
                    <strong>Your Listing Score</strong>
                    <p>
                      Score Too Low! Add more details and pictures to improve
                      this.
                    </p>
                  </div>
                  <div className="Circle_Main_Section">
                    <strong>10%</strong>
                  </div>
                </div>
              </Col>
            </Row>
            <Row></Row>
            <Row>
              <Col md={12} lg={12} xs={12} className="Tab_Panel_Section">
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Accordion.Toggle
                      as={Card.Header}
                      className="Card_Details_Icon_Header"
                      eventKey="0"
                    >
                      <p>Proerty Information</p>
                      <p>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <div className="Building_Type_Section">
                          <p>For</p>
                          <div id="BuildingType">
                            <ul className="Proerty_Information_List_Section">
                              {Rent_Data.map((item, index) => (
                                <li
                                  onClick={() => {
                                    this.Property_for_function(item);
                                  }}
                                  key={item.id}
                                  className={
                                    this.state.property_for === item.id
                                      ? "unorder_List active"
                                      : "unorder_List"
                                  }
                                >
                                   <img src={item.image} style={{width:20}}/>
                                  <span>{item.name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="Building_Type_Section">
                          <p>Building Type</p>
                          <div id="BuildingType">
                            <ul className="Proerty_Information_List_Section">
                              {Buliding_Data.map((item, index) => (
                                <li
                                  onClick={() => {
                                    this.building_type_function(item);
                                  }}
                                  key={item.id}
                                  className={
                                    this.state.building_type === item.id
                                      ? "unorder_List active"
                                      : "unorder_List"
                                  }
                                >
                                  <img src={item.image} style={{width:20}}/>
                                  <span>{item.name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="Building_Type_Section">
                          <p>Property Type</p>
                          <div id="Property_list">
                            {this.state.building_type === "1" ? (
                              <ul className="Proerty_Information_List_Section Overflow_Scroll_Section">
                                {Property_Data.map((item, index) => (
                                  <li
                                    onClick={() => {
                                      this.property_type_function(item);
                                    }}
                                    key={item.id}
                                    className={
                                      this.state.property_type === item.id
                                        ? "unorder_List active"
                                        : "unorder_List"
                                    }
                                  >
                                    {/* <i
                                      className="fa fa-home"
                                      aria-hidden="true"
                                    ></i> */}
                                    <img src={item.image} style={{width:20}}/>
                                    <span>{item.name}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <ul className="Proerty_Information_List_Section Overflow_Scroll_Section">
                                {Property_Data_Commercial.map((item, index) => (
                                  <li
                                    onClick={() => {
                                      this.property_type_function1(item);
                                    }}
                                    key={item.id}
                                    className={
                                      this.state.property_type === item.id
                                        ? "unorder_List active"
                                        : "unorder_List"
                                    }
                                  >
                                    <i
                                      className="fa fa-home"
                                      aria-hidden="true"
                                    ></i>
                                    <span>{item.name}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                        {(this.state.building_type === "1" &&
                          this.state.property_type === "13") ||
                        (this.state.building_type === "2" &&
                          this.state.property_type !== "28") ? null : (
                          <div className="Building_Type_Section">
                            <p>No Of Rooms *</p>
                            <div id="BuildingType">
                              <ul className="Proerty_Information_List_Section Round_Section_list_item_Rooms">
                                {Rooms_Data.map((item, index) => (
                                  <li
                                    onClick={() => {
                                      this.no_of_rooms_function(item);
                                    }}
                                    key={item.id}
                                    className={
                                      this.state.no_of_rooms === item.id
                                        ? "unorder_List active"
                                        : "unorder_List"
                                    }
                                  >
                                    <i
                                      className="fa fa-home"
                                      aria-hidden="true"
                                    ></i>
                                    <span>{item.name}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        <div className="Form_Input_Section">
                          <Form>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>City</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Your City"
                                name="property_location"
                                onChange={this.handleChange1}
                                value={this.state.property_location}
                              />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Project/Society Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Your Project name"
                                name="project_name"
                                onChange={this.handleChange1}
                                value={this.state.project_name}
                              />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label className="Size_Drop_Select_Section">
                                Size{" "}
                                <span>
                                  <Form.Control
                                    as="select"
                                    value={project_size}
                                    onChange={this.project_size_function}
                                  >
                                    {Size_Data.map((item) => (
                                      <option key={item.id} value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Your Size"
                                name="project_value"
                                onChange={this.handleChange1}
                                value={this.state.project_value}
                              />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label className="Size_Drop_Select_Section">
                                Price
                                <span>
                                  {" "}
                                  <Form.Control
                                    as="select"
                                    value={this.state.price_for}
                                  >
                                    <option
                                      value={
                                        this.state.property_for === "1"
                                          ? "1"
                                          : "2"
                                      }
                                    >
                                      {this.state.property_for === "1"
                                        ? "Permonth"
                                        : "Absolute Price"}
                                    </option>
                                  </Form.Control>
                                </span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Your Price"
                                name="price_value"
                                onChange={this.handleChange1}
                                value={this.state.price_value}
                              />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                              <Form.Label>Enter Your Description</Form.Label>
                              <Form.Control
                                placeholder="Description"
                                as="textarea"
                                rows={3}
                                name="description"
                                onChange={this.handleChange1}
                                value={this.state.description}
                              />
                            </Form.Group>

                            <Form.Group>
                              <Row>
                                <Col md={4} className="d-flex">
                                  <div className="site-upload-button">
                                    <Form.Label>Property Photos</Form.Label>
                                    <br></br>
                                  </div>
                                </Col>
                                <Col md={4}>
                                  <Button
                                    type="button"
                                    className="Hiring_Button"
                                    size="md"
                                    color="success"
                                    style={{
                                      width: "120px",
                                      height: "40px",
                                    }}
                                  >
                                    <label htmlFor="image_address">
                                      <i className="fa fa-building-o"></i>{" "}
                                      Browse
                                    </label>
                                    <input
                                      hidden
                                      id="image_address"
                                      name="image_address"
                                      type="file"
                                      accept="image/*"
                                      onChange={this.fileSelectedHandler}
                                    />
                                  </Button>
                                </Col>
                              </Row>
                            </Form.Group>

                            {this.state.imagePreviewUrl.map((item, index) => (
                              <div key={index} className="icon_wrapper_section">
                                <Row>
                                  <Col
                                    md={2}
                                    xs={2}
                                    className="Preview_Main_Container"
                                  >
                                    <div className="Preview_Image_Container">
                                      <img src={item} />
                                    </div>
                                  </Col>

                                  <Col
                                    md={1}
                                    xs={1}
                                    className="Preview_Icon_Main"
                                  >
                                    <div className="Preview_Icon_Container">
                                      <i
                                        onClick={() => {
                                          this.delete_handler_function(index);
                                        }}
                                        className="fa fa-trash-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </Col>

                                  <Col
                                    md={9}
                                    xs={8}
                                    className="Preview_DropDown"
                                  >
                                    <div>
                                      <Form.Control
                                        as="select"
                                        value={image_title[index]}
                                        onChange={(e) =>
                                          this.image_title_function(index, e)
                                        }
                                      >
                                        {Image_Title_Data.map((item) => (
                                          <option key={item.id} value={item.id}>
                                            {item.name}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            ))}
                          </Form>
                        </div>

                        <Accordion.Toggle
                          className="Card-header-next"
                          as={Card.Header}
                          eventKey="0"
                        >
                          <p>Next</p>
                        </Accordion.Toggle>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle
                      as={Card.Header}
                      className="Card_Details_Icon_Header"
                      eventKey="1"
                    >
                      <p>Addition Details</p>
                      <p>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        {(this.state.building_type === "1" &&
                          this.state.property_type !== "13") ||
                        (this.state.building_type === "2" &&
                          this.state.property_type !== "13") ? (
                          <div className="wrapper">
                            {this.state.building_type === "1" &&
                            this.state.property_type === "16" ? null : (
                              <div className="Building_Type_Section">
                                <p>Addional Rooms</p>
                                <div>
                                  <ul className="Proerty_Information_List_Section">
                                    {this.state.addional_rooms_data.map(
                                      (item, index) => (
                                        <li
                                          onClick={() => {
                                            this.additional_rooms_function(
                                              item
                                            );
                                          }}
                                          key={item.id}
                                          className={
                                            item.status === "1"
                                              ? "unorder_List active"
                                              : "unorder_List"
                                          }
                                        >
                                          <i
                                            className="fa fa-home"
                                            aria-hidden="true"
                                          ></i>
                                          <span>{item.name}</span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            )}

                            {this.state.property_for === "1" ? (
                              <div className="Building_Type_Section">
                                <p>Available From</p>
                                <div>
                                  <ul className="Proerty_Information_List_Section">
                                    {Avaliable_Rooms_Data.map((item, index) => (
                                      <li
                                        onClick={() => {
                                          this.available_from_function(item);
                                        }}
                                        key={item.id}
                                        className={
                                          this.state.available_from === item.id
                                            ? "unorder_List active"
                                            : "unorder_List"
                                        }
                                      >
                                        <i
                                          className="fa fa-home"
                                          aria-hidden="true"
                                        ></i>
                                        <span>{item.name}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ) : null}

                            {this.state.property_for === "2" ? (
                              <div className="Building_Type_Section">
                                <p>Possession Status</p>
                                <div>
                                  <ul className="Proerty_Information_List_Section">
                                    {Possession_Data.map((item, index) => (
                                      <li
                                        onClick={() => {
                                          this.possession_status_function(item);
                                        }}
                                        key={item.id}
                                        className={
                                          this.state.possession_status ===
                                          item.id
                                            ? "unorder_List active"
                                            : "unorder_List"
                                        }
                                      >
                                        <i
                                          className="fa fa-home"
                                          aria-hidden="true"
                                        ></i>
                                        <span>{item.name}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ) : null}
                            {this.state.available_from === "2" ||
                            this.state.possession_status === "2" ? (
                              <div>
                                <p>Possession Date</p>
                                <DatePicker
                                  selected={this.state.possession_date}
                                  onChange={(date) => {
                                    this.Onchange_Date_Function(date);
                                  }}
                                />
                              </div>
                            ) : null}

                            <div className="Building_Type_Section">
                              <p>Furnishing Status</p>
                              <div>
                                <ul className="Proerty_Information_List_Section">
                                  {Furnishing_Data.map((item, index) => (
                                    <li
                                      onClick={() => {
                                        this.furnishing_status_function(item);
                                      }}
                                      key={item.id}
                                      className={
                                        this.state.furnishing_status === item.id
                                          ? "unorder_List active"
                                          : "unorder_List"
                                      }
                                    >
                                      <i
                                        className="fa fa-home"
                                        aria-hidden="true"
                                      ></i>
                                      <span>{item.name}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="Building_Type_Section">
                              <p>Age of Property (Years)</p>
                              <div>
                                <ul className="Proerty_Information_List_Section">
                                  {Age_Of_Propert_Data.map((item, index) => (
                                    <li
                                      onClick={() => {
                                        this.property_age_function(item);
                                      }}
                                      key={item.id}
                                      className={
                                        this.state.property_age === item.id
                                          ? "unorder_List active"
                                          : "unorder_List"
                                      }
                                    >
                                      <span>{item.name}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="Building_Type_Section">
                              <p>Number Of Bathroom *</p>
                              <div>
                                <ul className="Proerty_Information_List_Section Round_Section_list_item_Rooms">
                                  {Bathroom_Data.map((item, index) => (
                                    <li
                                      onClick={() => {
                                        this.no_of_bathrooms_function(item);
                                      }}
                                      key={item.id}
                                      className={
                                        this.state.no_of_bathrooms === item.id
                                          ? "unorder_List active"
                                          : "unorder_List"
                                      }
                                    >
                                      <span>{item.name}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="Building_Type_Section">
                              <p>Number Of Parking *</p>
                              <div>
                                <ul className="Proerty_Information_List_Section Round_Section_list_item_Rooms">
                                  {Parking_Data.map((item, index) => (
                                    <li
                                      onClick={() => {
                                        this.no_of_parkings_function(item);
                                      }}
                                      key={item.id}
                                      className={
                                        this.state.no_of_parkings === item.id
                                          ? "unorder_List active"
                                          : "unorder_List"
                                      }
                                    >
                                      <span>{item.name}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            {
                            this.state.building_type === "2" ? null:
                            <div>
                             

                            <div className="Form_Input_Section">
                              <Form>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                  <Form.Label>View /Facing</Form.Label>
                                  <Form.Control
                                    as="select"
                                    value={view_facing}
                                    onChange={this.view_facing_function}
                                  >
                                    {View_Facing_Data.map((item, index) => (
                                      <option key={item.id} value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                  <Form.Label>Floor No</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Your Floor"
                                    name="floor_no"
                                    onChange={this.handleChange1}
                                    value={this.state.floor_no}
                                  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                  <Form.Label>Tower/Block</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Your Tower"
                                    name="tower_block"
                                    onChange={this.handleChange1}
                                    value={this.state.tower_block}
                                  />
                                </Form.Group>
                              </Form>
                            </div>

                            <div className="Building_Type_Section">
                              <p>Security Deposit</p>
                              <div>
                                <ul className="Proerty_Information_List_Section Round_Section_list_item_Rooms">
                                  {Security_Deposit_Data.map((item, index) => (
                                    <li
                                      onClick={() => {
                                        this.security_deposit_for_function(
                                          item
                                        );
                                      }}
                                      key={item.id}
                                      className={
                                        this.state.security_deposit_for ===
                                        item.id
                                          ? "unorder_List active"
                                          : "unorder_List"
                                      }
                                    >
                                      <span>{item.name}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div>
                              <Form.Group>
                                <Row>
                                  <Col md={4} className="d-flex">
                                    <div className="site-upload-button">
                                      <Form.Label>Broucher</Form.Label>
                                      <br></br>
                                    </div>
                                  </Col>
                                  <Col md={4}>
                                    <Button
                                      type="button"
                                      className="Hiring_Button"
                                      size="md"
                                      color="success"
                                      style={{ height: "40px" }}
                                    >
                                      <label htmlFor="image_address1">
                                        <i className="fa fa-building-o"></i>{" "}
                                        Upload PDF
                                      </label>
                                      <input
                                        hidden
                                        id="image_address1"
                                        name="image_address1"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={this.fileSelectedHandler1}
                                      />
                                    </Button>
                                  </Col>
                                </Row>
                              </Form.Group>

                              {this.state.broucherPreviewurl.map(
                                (item, index) => (
                                  <div
                                    key={index}
                                    className="icon_wrapper_section"
                                  >
                                    <Row>
                                      <Col
                                        md={2}
                                        xs={2}
                                        className="Preview_Main_Container"
                                      >
                                        <div className="Preview_Image_Container1">
                                          <img src="data:image/png;base64,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" />
                                        </div>
                                      </Col>

                                      <Col
                                        md={1}
                                        xs={1}
                                        className="Preview_Icon_Main"
                                      >
                                        <div className="Preview_Icon_Container">
                                          <i
                                            onClick={() => {
                                              this.delete_handler_function1(
                                                index
                                              );
                                            }}
                                            className="fa fa-trash-o"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                      </Col>

                                      <Col
                                        md={9}
                                        xs={8}
                                        className="Preview_DropDown"
                                      >
                                        <div>
                                          {this.state.broucher_title[index]}
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                )
                              )}
                            </div>
                          
                          
                            </div>
                            }
                          
                          
                            {this.state.security_deposit_for === "3" ? (
                              <div className="Form_Input_Section">
                                <Form.Group controlId="formBasicEmail">
                                  <Form.Label>Deposite Amount</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Your Deposite"
                                    name="security_deposit_amount"
                                    onChange={this.handleChange1}
                                    value={this.state.security_deposit_amount}
                                  />
                                </Form.Group>
                              </div>
                            ) : null}

                            <Accordion.Toggle
                              className="Card-header-next"
                              as={Card.Header}
                              eventKey="1"
                            >
                              <p>Next</p>
                            </Accordion.Toggle>
                          </div>
                        ) : (
                          <div>
                            {this.state.building_type === "2" ? null : (
                              <div className="Form_Input_Section">
                                <Form>
                                  <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>View /Facing</Form.Label>
                                    <Form.Control
                                      as="select"
                                      value={view_facing}
                                      onChange={this.view_facing_function}
                                    >
                                      {View_Facing_Data.map((item, index) => (
                                        <option key={item.id} value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </Form.Group>
                                </Form>
                              </div>
                            )}
                          </div>
                        )}
                        {this.state.building_type === "2" &&
                        this.state.property_type !== "27" &&
                        this.state.building_type === "2" &&
                        this.state.property_type !== "23" ? (
                          <div className="Commerical_wrapper">
                            {this.state.building_type === "2" &&
                            this.state.property_type === "26" ? null : (
                              <div className="Building_Type_Section">
                                <p>Furnishing Status</p>
                                <div>
                                  <ul className="Proerty_Information_List_Section">
                                    {Furnishing_Data.map((item, index) => (
                                      <li
                                        onClick={() => {
                                          this.furnishing_status_function(item);
                                        }}
                                        key={item.id}
                                        className={
                                          this.state.furnishing_status ===
                                          item.id
                                            ? "unorder_List active"
                                            : "unorder_List"
                                        }
                                      >
                                        <span>{item.name}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}

                            {(this.state.building_type === "2" &&
                              this.state.property_type === "22") ||
                            (this.state.building_type === "2" &&
                              this.state.property_type === "25") ||
                            (this.state.building_type === "2" &&
                              this.state.property_type === "26") ||
                            (this.state.building_type === "2" &&
                              this.state.property_type === "28") ? null : (
                              <div>
                                <div className="Building_Type_Section">
                                  <p>Office Space Type</p>
                                  <div>
                                    <ul className="Proerty_Information_List_Section">
                                      {Office_Space_Data.map((item, index) => (
                                        <li
                                          onClick={() => {
                                            this.Office_space_function(item);
                                          }}
                                          key={item.id}
                                          className={
                                            this.state.office_space_type ===
                                            item.id
                                              ? "unorder_List active"
                                              : "unorder_List"
                                          }
                                        >
                                          <span>{item.name}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                <div className="Building_Type_Section">
                                  <p>Pantry</p>
                                  <div>
                                    <ul className="Proerty_Information_List_Section">
                                      {Pantry_Data.map((item, index) => (
                                        <li
                                          onClick={() => {
                                            this.pantry_function(item);
                                          }}
                                          key={item.id}
                                          className={
                                            this.state.pantry === item.id
                                              ? "unorder_List active"
                                              : "unorder_List"
                                          }
                                        >
                                          <span>{item.name}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}
                            {this.state.building_type === "2" &&
                            this.state.property_type === "28" ? null : (
                              <div className="Building_Type_Section">
                                <p>Personal WashRoom</p>
                                <div>
                                  <ul className="Proerty_Information_List_Section">
                                    {Persoanal_Data.map((item, index) => (
                                      <li
                                        onClick={() => {
                                          this.personal_function(item);
                                        }}
                                        key={item.id}
                                        className={
                                          this.state.personal_washroom ===
                                          item.id
                                            ? "unorder_List active"
                                            : "unorder_List"
                                        }
                                      >
                                        <span>{item.name}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}

                            <div className="Building_Type_Section">
                              <p>Number Of Parking *</p>
                              <div>
                                <ul className="Proerty_Information_List_Section Round_Section_list_item_Rooms">
                                  {Parking_Data.map((item, index) => (
                                    <li
                                      onClick={() => {
                                        this.no_of_parkings_function(item);
                                      }}
                                      key={item.id}
                                      className={
                                        this.state.no_of_parkings === item.id
                                          ? "unorder_List active"
                                          : "unorder_List"
                                      }
                                    >
                                      <span>{item.name}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="Building_Type_Section">
                              <p>Number Of Bathroom *</p>
                              <div>
                                <ul className="Proerty_Information_List_Section Round_Section_list_item_Rooms">
                                  {Bathroom_Data.map((item, index) => (
                                    <li
                                      onClick={() => {
                                        this.no_of_bathrooms_function(item);
                                      }}
                                      key={item.id}
                                      className={
                                        this.state.no_of_bathrooms === item.id
                                          ? "unorder_List active"
                                          : "unorder_List"
                                      }
                                    >
                                      <span>{item.name}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="Form_Input_Section">
                              <Form>
                                {(this.state.building_type === "2" &&
                                  this.state.property_type === "25") ||
                                (this.state.building_type === "2" &&
                                  this.state.property_type === "26") ? null : (
                                  <div>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                      <Form.Label>View /Facing</Form.Label>
                                      <Form.Control
                                        as="select"
                                        value={view_facing}
                                        onChange={this.view_facing_function}
                                      >
                                        {View_Facing_Data.map((item, index) => (
                                          <option key={item.id} value={item.id}>
                                            {item.name}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    </Form.Group>
                                  </div>
                                )}
                                {this.state.building_type === "2" &&
                                this.state.property_type === "26" ? null : (
                                  <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Floor No</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Your Floor"
                                      name="floor_no"
                                      onChange={this.handleChange1}
                                      value={this.state.floor_no}
                                    />
                                  </Form.Group>
                                )}

                                {this.state.building_type === "2" &&
                                this.state.property_type === "28" ? (
                                  <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Tower/Block</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Your Tower"
                                      name="tower_block"
                                      onChange={this.handleChange1}
                                      value={this.state.tower_block}
                                    />
                                  </Form.Group>
                                ) : null}
                              </Form>
                            </div>
                          </div>
                        ) : null}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Accordion.Toggle
                      as={Card.Header}
                      className="Card_Details_Icon_Header"
                      eventKey="2"
                    >
                      <p>Amenities</p>
                      <p>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                   
                        {(this.state.amenities_list || []).map((item, index) => (
                          <Form.Check
                            key={item.id}
                            value={item.id}
                            name={item.item_sub_category_name}
                            onChange={() => {
                              this.onchange_Checkbox_Handler(item);
                            }}
                            inline
                            checked={item.status === "0"}
                            label={item.item_sub_category_name}
                            type="checkbox"
                            id={item.id}
                          />
                        ))}
                        <Row className="Submit_Button_Form_Action">
                          <div>
                            <Button
                              variant="outline-primary Hiring_Button"
                              type="submit"
                            >
                              Submit
                            </Button>
                          </div>

                          <div>
                            <SucessModal
                              show={this.state.modalShow}
                              handleClose={() => this.setModalShow()}
                            />
                          </div>


                          <div>
     
     {/* <ToastContainer autoClose={2000}  position="bottom-right" /> */}
        </div>
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
