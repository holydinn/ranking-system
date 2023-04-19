import React, {useState, useContext} from 'react';
import {Button, Card, Container, Form, Nav} from "react-bootstrap";
import {useLocation, useNavigate,} from "react-router-dom";
import {Context} from "../index.js";
import {login, registration} from "../http/userAPI.js";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === '/login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
        console.log(data)
      } else {
        data = await registration(email, password)
        console.log(data)
      }
      user.setUser(data)
      user.setIsAuth(true)
      navigate('/')
    } catch (e) {
      alert(e.response.data.message)
    }
  }
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
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль..."
              value={password}
              onChange={e => setPassword(e.target.value)}
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
            <Button variant={"outline-secondary"} onClick={click}>
              {isLogin ? 'Войти' : 'Создать'}
            </Button>
          </Form.Group>


        </Form>
      </Card>

    </Container>
  );
})

export default Auth;