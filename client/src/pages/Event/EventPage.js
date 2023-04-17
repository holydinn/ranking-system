import React, {useEffect, useState} from 'react';
import {Breadcrumb, Button, Col, Container, Navbar, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {
  deleteAlternatives, deleteExpert, deleteOneEvent,
  fetchAlternatives,
  fetchExperts,
  fetchOneEvent
} from "../../http/eventAPI.js";
import {useContext} from "react";
import {Context} from "../../index.js";
import QrCode from "qrcode.react";

const EventPage = observer(() => {
  const navigate = useNavigate()
  const {user} = useContext(Context)
  const {event} = useContext(Context)
  const {id} = useParams()
  const [eventName, setEventName] = useState('')
  useEffect(() => {
    fetchOneEvent(user.user.id, id).then(data => setEventName(data))
    fetchExperts(eventName.id).then(data => event.setExperts(data))
    fetchAlternatives(eventName.id).then(data => event.setAlternatives(data))
  }, [eventName.id])

  const deleteEvent = async () => {
    try {
      await deleteOneEvent(user.user.id, eventName.id)
      await deleteExpert(eventName.id)
      await deleteAlternatives(eventName.id)
      await alert('Мероприятие успешно удалено!')
      await navigate('/events')
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  const downloadImage = async (e) => {
      const canvas = document.querySelector("canvas");
      const imageDataURI = canvas.toDataURL("png", 1.0);
      const blob = await (await fetch(imageDataURI)).blob();
      const URL = window.URL.createObjectURL(blob);
      const el = document.createElement("a");
      el.href = URL;
      console.log(e)
      el.download = `qr_${eventName.name}_${e.target.id}.png`;
      el.click();
      window.URL.revokeObjectURL(URL);
    }
  ;

  return (
    <div>
      <Navbar className='mt-3'>
        <Container fluid>
          <Breadcrumb className="mt-lg-2 fs-2">
            <Breadcrumb.Item onClick={() => navigate('/events')}>Мероприятия</Breadcrumb.Item>
            <Breadcrumb.Item style={{color: '#495057'}} active>{eventName.name}</Breadcrumb.Item>
          </Breadcrumb>
          <Button size="lg" variant="outline-secondary" onClick={deleteEvent}>Удалить
            мероприятие</Button>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Col className="mt-3 fs-6">
          <Row className="mb-2"><h4 style={{color: '#495057'}}>Эксперты</h4></Row>
          <Row className="mb-3" style={{fontWeight: 'bold'}}>
            <Col sm="1">
              <h7>Номер</h7>
            </Col>
            <Col sm="3">
              <h7>ФИО</h7>
            </Col>
            <Col sm="3">
              <h7>Ссылка для голосования</h7>
            </Col>
            <Col sm="2">
              <h7>QR CODE</h7>
            </Col>
          </Row>
          {event.experts.map((item, index) =>
            <Row className="mb-3  align-items-center">
              <Col sm="1">{index + 1}.</Col>
              <Col sm="3">
                <h7>{item.name}</h7>
              </Col>
              <Col sm="3">
                <h7
                  onClick={() => navigate(`/votes/${item.id}`)}
                  style={{cursor: 'pointer'}}
                  className="link-secondary"
                >{item.link}</h7>
              </Col>
              <Col sm="2">
                <QrCode
                  value={item.link}
                  size={100}
                  level="M"
                  includeMargin
                />
              </Col>
              <Col sm="1">
                <Button id={item.name} variant="outline-secondary" onClick={downloadImage}>Скачать</Button>
              </Col>
            </Row>
          )}
        </Col>
        <hr/>
        <Col className="mt-3 fs-6">
          <Row className="mb-2"><h4 style={{color: '#495057'}}>Участники</h4></Row>
          <Row className="mb-3" style={{fontWeight: 'bold'}}>
            <Col sm="1">
              <h7>Номер</h7>
            </Col>
            <Col sm="3">
              <h7>ФИО</h7>
            </Col>
          </Row>
          {event.alternatives.map((item, index) =>
            <Row className="mb-3">
              <Col sm="1">{index + 1}.</Col>
              <Col sm="3">
                <h7>{item.name}</h7>
              </Col>
            </Row>
          )}
        </Col>


      </Container>

    </div>
  )
    ;
});

export default EventPage;