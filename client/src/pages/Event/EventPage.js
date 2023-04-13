import React, {useEffect, useState} from 'react';
import {Breadcrumb,  Col, Container, Navbar, Row} from "react-bootstrap";
//import {useNavigate} from "react-router-dom";
// import {Context} from "../../index.js";
// import {fetchAlternatives, fetchExperts} from "../../http/eventAPI.js";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {fetchAlternatives, fetchExperts, fetchOneEvent} from "../../http/eventAPI.js";
import {useContext} from "react";
import {Context} from "../../index.js";

const EventPage = observer(() => {
  const navigate = useNavigate()
  const {user} = useContext(Context)
  const {event} = useContext(Context)
  const {id} = useParams()
  const [eventName, setEventName] = useState('')
  // const [experts, setExperts] = useState('')
  // const [alts, setAlts] = useState('')
  useEffect(() => {
    fetchOneEvent(user.user.id, id).then(data => setEventName(data))
    fetchExperts(eventName.id).then(data => event.setExperts(data))
    fetchAlternatives(eventName.id).then(data => event.setAlternatives(data))
  }, [eventName.id])
  console.log(eventName)
  console.log(event.experts)
  console.log(event.alternatives)
  //console.log(fetchExperts(eventName.id))
  return (
    <div>
      <Navbar className='mt-3'>
        <Container fluid>
          <Breadcrumb className="mt-lg-2 fs-2">
            <Breadcrumb.Item onClick={() => navigate('/events')}>Мероприятия</Breadcrumb.Item>
            <Breadcrumb.Item style={{color: '#495057'}} active>{eventName.name}</Breadcrumb.Item>
          </Breadcrumb>

        </Container>
      </Navbar>
      <Container className="mt-3">
        <Col className="mt-3 fs-6">
          <Row className="mb-2"><h4 style={{color:'#495057'}}>Эксперты</h4></Row>
          <Row className="mb-3" style={{fontWeight:'bold'}}>
            <Col sm="1"><h7  >Номер</h7></Col>
            <Col sm="3"><h7>ФИО</h7></Col>
            <Col sm="4"><h7>Ссылка для голосования</h7></Col>
          </Row>
          {event.experts.map((item,index) =>
            <Row className="mb-3">
              <Col sm="1">{index+1}.</Col>
              <Col sm="3"><h7>{item.name}</h7></Col>
              <Col sm="4"><h7>{item.link}</h7></Col>
            </Row>
          )}
        </Col>
        <hr/>
        <Col className="mt-3 fs-6">
          <Row className="mb-2"><h4 style={{color:'#495057'}}>Участники</h4></Row>
          <Row className="mb-3" style={{fontWeight:'bold'}}>
            <Col sm="1"><h7  >Номер</h7></Col>
            <Col sm="3"><h7>ФИО</h7></Col>
          </Row>
          {event.alternatives.map((item,index) =>
            <Row className="mb-3">
              <Col sm="1">{index+1}.</Col>
              <Col sm="3"><h7>{item.name}</h7></Col>
            </Row>
          )}
        </Col>




      </Container>

    </div>
  )
    ;
});

export default EventPage;