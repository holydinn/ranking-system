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

  //console.log(event.events)
  return (
    <div>
      <Navbar className='mt-3'>
        <Container fluid className='d-flex justify-content-between'>
          <Breadcrumb className="mt-lg-2 fs-2">
            <Breadcrumb.Item active>Мероприятия</Breadcrumb.Item>
          </Breadcrumb>
          <Button size="lg" variant="outline-secondary" onClick={() => navigate('/events/new')}>Добавить
            мероприятие</Button>
        </Container>
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

    </div>
  );
});

export default Events;