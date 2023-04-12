import React from 'react';
import {Breadcrumb,  Container, Navbar} from "react-bootstrap";

const Votes = () => {
  return (
    <Navbar className='mt-3'>
      <Container fluid className='d-flex justify-content-between'>
        <Breadcrumb className="mt-lg-2 fs-2">
          <Breadcrumb.Item active>Голосование</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
    </Navbar>
  );
};

export default Votes;