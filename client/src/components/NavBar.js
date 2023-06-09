import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import { useMediaQuery } from 'react-responsive';

const NavBar = observer(() => {
  const navigate = useNavigate()
  const isMdScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const isSmScreen = useMediaQuery({ query: '(min-width: 576px)' });
  const isxSScreen = useMediaQuery({ query: '(min-width: 370px)' });

  const getLinkFontSize = () => {
    if (isMdScreen) {
      return 20;
    } else if (isSmScreen) {
      return 19;
    }else if (isxSScreen) {
      return 16;
    }
    return 13; // Default font size for xs screens
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="sm">
      <Container >
        <Navbar.Brand className="sidebar-brand" style={{cursor: 'pointer',fontSize: getLinkFontSize()}} onClick={() => navigate('/')}>Система анализа экспертной оценки</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          <Nav.Link style={{fontSize: getLinkFontSize()}} onClick={() => navigate('/login')}>Вход</Nav.Link>
          <Nav.Link style={{fontSize: getLinkFontSize()}} onClick={() => navigate('/registration')}>Регистрация</Nav.Link>
        </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
})

export default NavBar;