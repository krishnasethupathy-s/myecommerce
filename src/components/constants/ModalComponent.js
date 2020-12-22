import React from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import './ModalComponent.css'

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Calculate Travel Time
                <br />
                    <p>
                        Work? Kid’s School? Gym? Tell us which places you commute to frequently and we’ll tell you how far they are from this property.

                </p>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>


                    <h6>Destination Name</h6>
                    <ul className="Destination_Unorder_List_Background">
                        <li>
                            <a> <Form.Check type="radio" aria-label="radio 1" label="My WorkPlace" /></a>
                        </li>
                        <li>
                            <a> <Form.Check type="radio" aria-label="radio 1" label="My WorkPlace" /></a>
                        </li>

                        <li>
                            <a> <Form.Check type="radio" aria-label="radio 1" label="My WorkPlace" /></a>
                        </li>
                        <li>
                            <a> <Form.Check type="radio" aria-label="radio 1" label="My WorkPlace" /></a>
                        </li>

                    </ul>
                </div>
                <div className="Modal_Address_Input">
                    <h6>Address</h6>
                    <Col sm={12} className="p-0">
                        <Form.Control className="Modal_Address_Input" type="text" placeholder="Search Address" />
                    </Col>
                </div>
                <div>
                    <h6>Mode of travel (Select one or more)</h6>
                    <Form.Group as={Row} controlId="formHorizontalCheck">
                        <Col sm={{ span: 10, }}>
                            <Form.Check label="Public Transport (Trains/Buses)" />
                        </Col>
                        <Col sm={{ span: 10, }}>
                            <Form.Check label="Driving" />
                        </Col>
                        <Col sm={{ span: 10 }}>
                            <Form.Check label="Walking" />
                        </Col>
                    </Form.Group>
                </div>
                <div className="Modal_Submit_Container">
                    <Form.Group as={Row}>
                        <Col sm={{ span: 12 }}>
                            <Button className="Red_Color_Button" >Save This Comment</Button>
                        </Col>
                    </Form.Group>

                </div>
            </Modal.Body>

        </Modal>
    );
}

export default MyVerticallyCenteredModal;