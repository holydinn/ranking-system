import React from 'react';
import {Card, Container} from "react-bootstrap";
import {useContext} from "react";
import {Context} from "../index.js";
import {observer} from "mobx-react-lite";


const Main = observer(() => {
  const {user} = useContext(Context)
  return (

    <Container className="d-flex justify-content-center align-items-center"
               style={{height: window.innerHeight - 54}}>
      <Card style={{width: 900, border: "none"}}>
        {user._isAuth &&
          <Card.Body className="d-flex flex-column p-5 m-auto justify-content-center align-items-center">
            <h3>Добро пожаловать в систему анализа эксперной оценки!</h3>
            <Card.Text>
              С её помощью вы сможете создавать мероприятия и отслеживать их результаты
            </Card.Text>
          </Card.Body>
        }
        {!user._isAuth &&
          <Card.Body className="d-flex flex-column p-5 m-auto justify-content-center align-items-center">
            <h1>Система анализа экспертной оценки</h1>
            <Card.Text className="fs-5">
              Для взаимодейсвия с системой войдите или зарегестрируйтесь
            </Card.Text>
          </Card.Body>
        }
      </Card>
    </Container>


  );
});

export default Main;