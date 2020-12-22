import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Homepage from './components/Homepage/Homepage';
import SignIn from "./components/SignInPage/SignIn";
import SignUp from "./components/SignUpPage/SignUp";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import Contact from "./components/Contact/Contact";
import ProductDescription from "./components/ProductDescription/ProductDescription";
import MyAccount from "./components/MyAccount/MyAccount";
import NewsDetails from "./components/NewsDetails/NewsDetails";
import NewsList from "./components/NewsList/NewsList";
import PropertyList from "./components/PropertyList/PropertyList";






function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/" name="SiteHome Page" render={props => <Homepage {...props} />} />
        <Route exact path="/SignIn" name="SignIn Page" render={props => <SignIn {...props} />} />
        <Route exact path="/SignUp" name="SignUp Page" render={props => <SignUp {...props} />} />
        <Route exact path="/ForgetPassword" name="ForgetPassword Page" render={props => <ForgetPassword {...props} />} />
        <Route exact path="/Contact" name="ForgetPassword Page" render={props => <Contact {...props} />} />
        <Route exact path="/ProductDescription" name="ProductDescription Page" render={props => <ProductDescription {...props} />} />
      
      
  
        <Route exact path="/MyAccount" name="MyAccount Page" render={props => <MyAccount {...props} />} />
        <Route exact path="/NewsDetails" name="Blog Page" render={props => <NewsDetails {...props} />} />
        <Route exact path="/NewsList" name="Blog Page" render={props => <NewsList {...props} />} />
        <Route exact path="/PropertyList" name="Blog Page" render={props => <PropertyList {...props} />} />







        



      </Switch>
    </BrowserRouter>
  );
}

export default App;
