import React from 'react';
import {Breadcrumb, Button, Col, Container, Navbar, Row, Spinner} from "react-bootstrap";
import {useEffect} from "react";
import {fetchAlternatives, fetchExperts, fetchOneEvent} from "../../http/eventAPI.js";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useState} from "react";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";
import {doAlgoritms} from "../../algoritmLogic/app.js";
import {createExpert} from "../../algoritmLogic/helpFunctions.js";
import {check} from "../../http/userAPI.js";

const ResultPage = observer(() => {
  const navigate = useNavigate()
  const {user} = useContext(Context)
  const {event} = useContext(Context)
  const {id} = useParams()
  const [eventName, setEventName] = useState('')
  const [loading, setLoading] = useState(true)
  const [experts, setExperts] = useState([])
  const [alternatives, setAlternatives] = useState([])
  const [result, setResult] = useState([])
  //let temp = []

  useEffect(() => {
    setTimeout(()=>{
      fetchOneEvent(user.user.id, id).then(data => {
        setEventName(data)
        fetchExperts(data.id).then(data => {
          console.log(data)
          setExperts(data)
          //temp = makeExperts(experts, temp)
          //console.log(data)
        })
        fetchAlternatives(data.id).then(data => {
          console.log(data)
          setAlternatives(data.map(item => item.name))
        })
      })

        .finally(() => setLoading(false))
    },5000)

  }, [])

  const makeExperts = (experts, newExperts) => {
    //let newExperts = []
    const items = Array.from(experts).map(item => (item.ranking));

    for (let i = 0; i < items.length; i++) {
      let ranking = []
      let temp = items[i].slice(2, -2).split('","').map(Number)
      temp.forEach((value, index) => {
        ranking[value - 1] = index + 1
      })
      console.log(ranking)
      createExpert(event.experts[i].name, ranking, newExperts)
    }
    console.log(newExperts)
    return newExperts
  }
  const app = () => {
    setResult(doAlgoritms(experts, alternatives))
    console.log(result)
  }
  app()

  if (loading) {
    return <Spinner animation={"grow"}/>
  }
  console.log(eventName)
  console.log(alternatives)
  console.log(experts)
  //console.log(temp)

  //console.log(experts)
  //alternatives = event.alternatives.map(item => item.name)

   console.log(result)


  return (<Container>
    <Navbar className='mt-3'>
      <Breadcrumb className="mt-lg-2 fs-2">
        <Breadcrumb.Item onClick={() => navigate('/results')}>Результаты</Breadcrumb.Item>
        <Breadcrumb.Item style={{color: '#495057'}} active>{eventName.name}</Breadcrumb.Item>
      </Breadcrumb>
    </Navbar>
    <Col className="mt-3 fs-6">
      {!loading && experts.map((item, index) =>
        <Row className="mb-3  align-items-center">
          <Col sm="1">{index + 1}.</Col>
          <Col sm="3">
            <h7>{item.name}</h7>
          </Col>
          <Col sm="3">
            <h7>{item.ranking}</h7>
          </Col>
        </Row>)}
    </Col>
    {/*{!loading && result.map((item, index) => <Row className="mb-3  align-items-center">*/}
    {/*  <Col sm="1">{index + 1}.</Col>*/}
    {/*  <Col sm="3">*/}
    {/*    <h7>{item.name}</h7>*/}
    {/*  </Col>*/}
    {/*  <Col sm="3">*/}
    {/*    <h7>{item.resRank}</h7>*/}
    {/*  </Col>*/}
    {/*</Row>)}*/}

  </Container>);
});

export default ResultPage;