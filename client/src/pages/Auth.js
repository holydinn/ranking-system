import React from 'react';
import {Button, Card, Container, Form, Nav} from "react-bootstrap";
import {useLocation} from "react-router-dom";

const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Войти в систему' : 'Создать аккаунт'}</h2>
        <Form className="d-flex flex-column">
          <Form.Group className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите email..."
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль..."
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-between mt-3">
            {isLogin ?
              <div className="d-flex mt-2">
                <div>Нет аккаунта?</div>
                <Nav.Link style={{color: '#6c757d', paddingLeft: 5}} href='/registration'> Зарегистрировться</Nav.Link>
              </div>
              :
              <div className="d-flex mt-2">
                <div>Есть аккаунт?</div>
                <Nav.Link style={{color: '#6c757d', paddingLeft: 5}} href='/login'> Войти</Nav.Link>
              </div>
            }
            <Button variant={"outline-secondary"}>
              {isLogin ? 'Войти' : 'Создать'}
            </Button>
          </Form.Group>


        </Form>
      </Card>

    </Container>
  );
};

export default Auth;