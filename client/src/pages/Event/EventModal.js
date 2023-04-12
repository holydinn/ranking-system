import React, {useState} from 'react';
import { Button, Form, Modal} from "react-bootstrap";
//import {useNavigate} from "react-router-dom";
// import {Context} from "../../index.js";
// import {fetchAlternatives, fetchExperts} from "../../http/eventAPI.js";
import {observer} from "mobx-react-lite";

const EventModal = observer(({show, onHide}) => {
  //const navigate = useNavigate()
  //const {event} = useContext(Context)
  const [name, setName] = useState('')


  return (
    <Modal
      className='mt-3'
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить мероприятие
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Control
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название устройства"
          />
          <hr/>
          <Button
            variant={"outline-dark"}

          >
            Добавить новое свойство
          </Button>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" >Добавить</Button>
      </Modal.Footer>
    </Modal>

  );
});

export default EventModal;