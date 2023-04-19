import React from 'react';
import {Alert, Breadcrumb, Col, Container, Navbar, Row, Spinner} from "react-bootstrap";
import {useEffect} from "react";
import {fetchAlternatives, fetchExperts, fetchOneEvent} from "../../http/eventAPI.js";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useState} from "react";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";
import {concordanceCoef, doAlgoritms} from "../../algoritmLogic/app.js";

const ResultPage = observer(() => {
  const navigate = useNavigate()
  const {user} = useContext(Context)
  const {id} = useParams()
  const [eventName, setEventName] = useState('')
  const [loading, setLoading] = useState(true)
  const [experts, setExperts] = useState([])
  const [alternatives, setAlternatives] = useState([])
  const [result, setResult] = useState([])
  const [cof, setCof] = useState('')

  useEffect(() => {

    fetchOneEvent(user.user.id, id)
      .then(data => {
        setEventName(data)
        fetchExperts(data.id).then(data => {
          setExperts(data)
          let newExperts = []
          for (let i = 0; i < data.length; i++) {
            let ranking = (data[i].ranking.slice(2, -2) + '').split('","').map(Number)
            //newExperts.push({name: data[i].name, points: ranking})
            newExperts.push({name: data[i].name, points: data[i].ranking})
          }
          setExperts(newExperts)
        })
        fetchAlternatives(data.id).then(data => {
          setAlternatives(data.map(item => item.name))
        })
      })
  }, [])

  useEffect(() => {
    doAlgoritms(experts, alternatives)
      .then(data => {
        setResult(data)
        setCof(concordanceCoef(experts, alternatives))
      })
      .finally(() => {
        setLoading(false)
      })
  }, [experts, alternatives])

  if (loading) {
    return <Spinner animation={"grow"}/>
  }
console.log(experts)
  return (
    <Container>
      <Navbar className='mt-3'>
        <Breadcrumb className="mt-lg-2 fs-2">
          <Breadcrumb.Item onClick={() => navigate('/results')}>Результаты</Breadcrumb.Item>
          <Breadcrumb.Item style={{color: '#495057'}} active>{eventName.name}</Breadcrumb.Item>
        </Breadcrumb>
      </Navbar>
      {experts.every(item=>item.points!==null) &&
      <Alert variant="dark" className="mb-3 fs-4 mt-3 d-flex justify-content-center">
        Результаты еще не подготовлены, ожидаем голоса всех экспертов
      </Alert>
      }
      {experts.every(item=>item.points===null) &&
        <>
        <Alert variant="info" className="mb-3">
          <p>Коэффициент конкордации равен {parseFloat(cof).toFixed(3)}</p>
          <hr/>
          <p>Степень согласованности мнений экспертов определяется при помощи коэффицента конкордации,
            который принимает значение, равное 1 при полной согласованности ответов экспертов,
            и 0 при полной несогласованности</p>
        </Alert>
        <Row className="mb-3 fs-5" style={{fontWeight: 'bold'}}>
          <Col sm="4">
            Название метода
          </Col>
          <Col sm="8">
            Результирующая ранжировка
          </Col>
        </Row>
        {!loading && result.map(item =>
          <>
            <Row className="mb-3 align-items-center">
              <Col sm="4">
                {item.name.map(item =>
                  <Row className="m-lg-1 mt-3">{item}</Row>
                )}
              </Col>
              <Col sm="8">
                {!item.resRank
                  ? <></>
                  : <ol>
                    {item.resRank.map(item =>
                      <Row className="mt-2">
                        <li>
                          {item.length === 1 && alternatives[item - 1]}
                          {!item.length && alternatives[parseInt(item) - 1]}
                          <ul className="list-unstyled">
                            {item.length > 1 && item.map(value =>
                              <li>{alternatives[value - 1]} </li>
                            )}
                          </ul>
                        </li>
                      </Row>
                    )}
                  </ol>}

              </Col>
            </Row>
            <hr/>
          </>
        )}
      </>}
    </Container>);
});

export default ResultPage;