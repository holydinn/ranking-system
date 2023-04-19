import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
  const navigate = useNavigate()
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand style={{cursor: 'pointer'}} onClick={() => navigate('/')}>Система анализа экспертной оценки</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link onClick={() => navigate('/login')}>Вход</Nav.Link>
          <Nav.Link onClick={() => navigate('/registration')}>Регистрация</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
})

export default NavBar;