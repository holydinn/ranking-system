import React, {useContext} from 'react';
import {Context} from "../index.js";
import {Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import '../index.css'

const SideBar = observer(() => {
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }
  return (
    <Navbar bg="dark" variant="dark" className="sidebar flex-column ">
      <Navbar.Brand href="#" onClick={() => navigate('/')}>Система анализа экспертной оценки</Navbar.Brand>
      <hr/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column ">
          <Nav.Link className="nav-linkk" onClick={() => navigate('/events')}>Мероприятия</Nav.Link>
          <hr className="hr-bar"/>
          <Nav.Link className="nav-linkk" onClick={() => navigate('/results')}>Результаты</Nav.Link>
          <hr className="hr-bar"/>
          <Nav.Link className="nav-linkk" onClick={() => navigate('/votes')}>Голосование</Nav.Link>
          <hr className="hr-bar"/>
          <Nav.Link className="nav-linkk" onClick={() => {
            logOut()
            navigate('/registration')
          }}>Выйти</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
})

export default SideBar;