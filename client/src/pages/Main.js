import React from 'react';
import {Card, Container} from "react-bootstrap";


const Main = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center"
               style={{height: window.innerHeight - 54}}>
      <Card style={{width: 900, border:"none"}} >

        <Card.Body className="d-flex flex-column p-5 m-auto justify-content-center align-items-center">
          <h3 >Добро пожаловать в систему анализа эксперной оценки!</h3>
          <Card.Text >
            С её помощью вы сможете создавать мероприятия и отслеживать их результаты
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>


  );
};

export default Main;