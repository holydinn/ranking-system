import React, {useState, useContext} from 'react';
import {Button, Card, Container, Form, Nav} from "react-bootstrap";
import {useLocation, useNavigate,} from "react-router-dom";
import {Context} from "../index.js";
import {login, registration} from "../http/userAPI.js";
import {observer} from "mobx-react-lite";
import ModalComponent from "../components/Modal.js";
import { useMediaQuery } from 'react-responsive';

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
        //console.log(data)
      } else {
        data = await registration(email, password)
        //console.log(data)
      }
      user.setUser(data)
      user.setIsAuth(true)
      navigate('/')
    } catch (e) {
      await setError(e.response.data.message)
      await handleModalShow(e.response.data.message)
    }
  }

  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleModalClose = () => {
    setShow(false);
  }
  const handleModalShow = (type) => {
    setModalType(type);
    setShow(true)
    if (type !== 'success') {
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
    }

  }
  const handleSuccessClose = () => {
    setIsSuccess(true);
    navigate('/');
  };

  const isSmScreen = useMediaQuery({ query: '(min-width: 450px)' });
  const isxSScreen = useMediaQuery({ query: '(min-width: 370px)' });
  const isXxsScreen = useMediaQuery({ query: '(max-width: 425px)' });

  const getLinkFontSize = () => {
    if  (isSmScreen) {
      return 16;
    }else if (isxSScreen) {
      return 14;
    }
    return 12; // Default font size for xs screens
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}
    >
      <ModalComponent
        show={show}
        onHide={handleModalClose}
        title={modalType === 'success' ? 'Успех!' : 'Ошибка!'}
        body={
          modalType === 'success' &&
          'Мероприятие успешно добавлено!'
        }
        error={error}
        isSuccess={isSuccess}
        onSuccessClose={handleSuccessClose}
      />
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
            {!isLogin && <Form.Text className="text-muted"> Пароль должен содержать не менее 4 символов. </Form.Text>}

          </Form.Group>
          {!isXxsScreen ?
            <Form.Group className="d-flex justify-content-between mt-3">
              {isLogin ?
                <div className="d-flex mt-2">
                  <div style={{fontSize: getLinkFontSize()}}>Нет аккаунта?</div>
                  <Nav.Link style={{color: '#6c757d', paddingLeft: 5,fontSize: getLinkFontSize()}}
                            onClick={() => navigate('/registration')}> Зарегистрировться</Nav.Link>
                </div>
                :
                <div className="d-flex mt-2">
                  <div style={{fontSize: getLinkFontSize()}}>Есть аккаунт?</div>
                  <Nav.Link style={{color: '#6c757d', paddingLeft: 5,fontSize: getLinkFontSize()}}
                            onClick={() => navigate('/login')}> Войти</Nav.Link>
                </div>
              }
              <Button variant={"outline-secondary"} onClick={click}>
                {isLogin ? 'Войти' : 'Создать'}
              </Button>
            </Form.Group>
          :
            <Form.Group className="d-grid gap-2 mt-3">
              <Button variant={"outline-secondary"} onClick={click}>
                {isLogin ? 'Войти' : 'Создать'}
              </Button>
              {isLogin ?
                <div className="d-flex justify-content-center mt-3">
                  <div style={{fontSize: getLinkFontSize()}}>Нет аккаунта?</div>
                  <Nav.Link style={{color: '#6c757d', paddingLeft: 5,fontSize: getLinkFontSize()}}
                            onClick={() => navigate('/registration')}> Зарегистрировться</Nav.Link>
                </div>
                :
                <div className="d-flex justify-content-center mt-3">
                  <div style={{fontSize: getLinkFontSize()}}>Есть аккаунт?</div>
                  <Nav.Link style={{color: '#6c757d', paddingLeft: 5,fontSize: getLinkFontSize()}}
                            onClick={() => navigate('/login')}> Войти</Nav.Link>
                </div>
              }
            </Form.Group>
          }

        </Form>
      </Card>
    </Container>
  );
})

export default Auth;