import React, {useContext, useEffect} from 'react';
import {Breadcrumb, Button, Container, ListGroup, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";
import {fetchEvents} from "../../http/eventAPI.js";

const Events = observer(() => {
  const navigate = useNavigate()
  const {event} = useContext(Context)
  const {user} = useContext(Context)

  useEffect(() => {
    fetchEvents(user.user.id).then(data => {
      event.setEvents(data)
    })
  }, [event])

  return (
    <Container className="mb-3">
      <Navbar className='mt-3 d-flex justify-content-between'>
          <Breadcrumb className="mt-lg-2 fs-2">
            <Breadcrumb.Item active>Мероприятия</Breadcrumb.Item>
          </Breadcrumb>
          <Button size="lg" variant="outline-secondary" onClick={() => navigate('/events/new')}>Добавить
            мероприятие</Button>
      </Navbar>

      <ListGroup className="mt-3 fs-6 mb-3" >
        {event.events.map(e =>
          <ListGroup.Item
            key={e.id}
            onClick={() => navigate('/events/' + e.id)}
            style={{cursor: 'pointer'}}
            className="pt-3 pb-3 link-dark"
          >
            {e.name}
          </ListGroup.Item>
        )}
      </ListGroup>

    </Container>
  );
});

export default Events;