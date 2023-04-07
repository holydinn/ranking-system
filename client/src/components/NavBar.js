import React, {useContext} from 'react';
import {Context} from "../index.js";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href='/'>Система анализа экспертной оценки</Navbar.Brand>
        {user.isAuth ?
          <Nav className="ml-auto">
            <Nav.Link
              onClick={() => logOut()}
            >
              Выйти
            </Nav.Link>
          </Nav>
          :
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate('/login')}>Вход</Nav.Link>
            <Nav.Link onClick={() => navigate('/registration')}>Регистрация</Nav.Link>

          </Nav>
        }
      </Container>
    </Navbar>
  )
})

export default NavBar;