import React from 'react';
import {Breadcrumb, Container, ListGroup, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {Context} from "../../index.js";
import {fetchEvents} from "../../http/eventAPI.js";

const Results = observer(() => {
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
      <Navbar className='mt-3'>
        <Breadcrumb className="mt-lg-2 fs-2">
          <Breadcrumb.Item active>Результаты</Breadcrumb.Item>
        </Breadcrumb>
      </Navbar>
      <ListGroup className="mt-3 fs-6 mb-3">
        {event.events.map(e =>
          <ListGroup.Item
            key={e.id}
            onClick={() => navigate('/results/' + e.id)}
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

export default Results;