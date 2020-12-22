import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MySucessModal(props) {
    return (
        <Modal  {...props} centered
         show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank You Property Added</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>
    );
}

export default MySucessModal;