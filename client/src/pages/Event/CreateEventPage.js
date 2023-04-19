import React, {useContext, useState} from 'react';
import {Breadcrumb, Button, Col, Container, Form, Navbar, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index.js";
import {createAlternative, createEvent, createExpert} from "../../http/eventAPI.js";
import {observer} from "mobx-react-lite";


const CreateEventPage = observer(() => {
  const navigate = useNavigate()
  const {user} = useContext(Context)
  const [eventName, setEventName] = useState('')
  const [expert, setExpert] = useState(['']);
  const [alt, setAlt] = useState(['']);
  const [numExperts, setNumExperts] = useState(0);
  const [numAlts, setNumAlts] = useState(0);


  const handleExpertChange = (index, event) => {
    const newExperts = [...expert];
    newExperts[index] = event.target.value;
    setExpert(newExperts);
  };
  const handleAltChange = (index, event) => {
    const newAlts = [...alt];
    newAlts[index] = event.target.value;
    setAlt(newAlts);
  };

  const createExperts = () => {
    let experts = [];
    for (let i = 0; i < numExperts; i++) {
      experts.push(<Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Эксперт №{i + 1}
        </Form.Label>
        <Col sm="7">
          <Form.Control
            required
            key={`input1-${i}`}
            type="text"
            value={expert[i]}
            onChange={(event) => handleExpertChange(i, event)}
            placeholder="Введите ФИО эксперта"
          />
        </Col>
      </Form.Group>);
    }
    return experts;
  };
  const createAlts = () => {
    let alts = [];
    for (let i = 0; i < numAlts; i++) {
      alts.push(<Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Участник №{i + 1}
        </Form.Label>
        <Col sm="7">
          <Form.Control
            required
            key={`input2-${i}`}
            type="text"
            value={alt[i]}
            onChange={(event) => handleAltChange(i, event)}
            placeholder="Введите ФИО участника"
          />
        </Col>
      </Form.Group>);
    }
    return alts;
  };

  const checkInputs = () => {
    try {
      if (!eventName || eventName === '') {
        throw new SyntaxError('Вы не ввели название мероприятия!')
      }
      console.log(expert)
      console.log(alt)
      console.log(numExperts)
      expert.forEach((input) => {
        if (!input || input === '' || expert.length !== numExperts) {
          throw new SyntaxError('Вы ввели не все имена экспертов!')
        }
      })
      alt.forEach((input) => {
        if (!input || input === '' || alt.length !== numAlts) {
          throw new SyntaxError('Вы ввели не все имена участников!')
        }
      })
      addEvent()
    } catch (e) {
      alert(e.message)
    }
  }

  const addEvent = async () => {
    try {
      const curEvent = await createEvent({name: eventName, adminId: user.user.id})
      await expert.forEach((input) => (createExpert({name: input, eventId: curEvent.id})))
      await alt.forEach((input) => (createAlternative({name: input, eventId: curEvent.id})))
      await alert('Мероприятие успешно добавлено!')
      await navigate('/events')
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container>

      <Navbar className='mt-3'>

        <Breadcrumb className="mt-lg-2 fs-2">
          <Breadcrumb.Item onClick={() => navigate('/events')}>Мероприятия</Breadcrumb.Item>
          <Breadcrumb.Item style={{color: '#495057'}} active>Создать мероприятие</Breadcrumb.Item>
        </Breadcrumb>

      </Navbar>

      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Название
          </Form.Label>
          <Col sm="7">
            <Form.Control
              required
              value={eventName}
              onChange={e => setEventName(e.target.value)}
              placeholder="Введите название мероприятия"
            />
          </Col>
        </Form.Group>

        <hr/>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Количество экспертов
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="number"
              onChange={(e) => setNumExperts(parseInt(e.target.value))}
              required
              placeholder="Введите количество экспертов"
            />
          </Col>
        </Form.Group>
        {createExperts()}
        <hr/>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Количество участников
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="number"
              onChange={(e) => setNumAlts(parseInt(e.target.value))}
              required
              placeholder="Введите количество участников"
            />
          </Col>
        </Form.Group>
        {createAlts()}
        <Button className="mt-3"
                size="lg"
                variant={"outline-secondary"}
                onClick={checkInputs}
        >
          Добавить мероприятие
        </Button>
      </Form>


    </Container>
  );
});

export default CreateEventPage;