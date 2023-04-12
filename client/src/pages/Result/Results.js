import React from 'react';
import {Breadcrumb,  Container, Navbar} from "react-bootstrap";

const Results = () => {
  return (
    <Navbar className='mt-3'>
      <Container fluid className='d-flex'>
        <Breadcrumb className="mt-lg-2 fs-2">
          <Breadcrumb.Item active>Результаты</Breadcrumb.Item>
        </Breadcrumb>

      </Container>
    </Navbar>
  );
};

export default Results;