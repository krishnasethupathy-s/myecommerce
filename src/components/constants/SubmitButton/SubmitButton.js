import React from 'react';
import { Button } from 'react-bootstrap';
import './SubmitButton.css';


const SubmitButton=(props)=> {
    return (
  <div className="Submit_Button_Wrapper">
 <Button href={props.href} className={props.styles} variant="outline-primary Hiring_Button">{props.title}</Button>

  </div>
    );
  }

export default SubmitButton ;