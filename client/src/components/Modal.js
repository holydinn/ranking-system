import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const ModalComponent = (props) => {
  const handleModalClose = () => {

    if (props.isSuccess) {
      props.onSuccessClose();
    }else {
      props.onHide();
    }
  };

  return (<Modal show={props.show} onHide={handleModalClose} backdrop="static"
                 keyboard={false}>
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    {!props.error && (
      <>
        <Modal.Body>{props.body} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </>
    )}
    {props.error && (
      <>
        <Modal.Body>{props.error} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </>
    )}

  </Modal>);
};

export default ModalComponent;