import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import AppRouter from "./routes.js";
import NavBar from "./components/NavBar.js";
import {useContext} from "react";
import {Context} from "./index.js";
import SideBar from "./components/SideBar.js";
import './index.css'
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI.js";
import {Spinner} from "react-bootstrap";
import VotePage from "./pages/Vote/VotePage.js";

const App = observer(() => {
  // const {token, login, logout, userId, ready} = useAuth()
  // const isAuthenticated = !!token

  //const routes = AppRouter()
  // if (!ready) {
  //   return <Loader/>
  // }
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)
  // const location = useLocation()
  // const isVote = location.pathname === '/votes/:id'

  useEffect(() => {
    setTimeout(() => {
      check().then(data => {
        user.setUser(user)
        user.setIsAuth(true)
      }).finally(() => setLoading(false))
    }, 1000)

  }, [user])

  if (loading) {
    return <Spinner animation={"grow"}/>
  }
  return (
    // <AuthContext.Provider value={{
    //   token, login, logout, userId, isAuthenticated
    // }}>
    <BrowserRouter>
      {user._isAuth &&
        <>
          <div className="d-flex">
            <SideBar/>
            <div id="page-content-wrapper">
              <div className="container">
                <AppRouter/>
              </div>
            </div>
          </div>
        </>
      }
      {!user._isAuth &&
        <>
          <NavBar/>
          <div className="container">
            <AppRouter/>
          </div>
        </>
      }
      {/*{!user._isAuth && isVote &&*/}
      {/*  <>*/}
      {/*    <div className="container">*/}
      {/*      <Routes>*/}
      {/*        <Route path="votes/:id" element={<VotePage/>}/>*/}
      {/*      </Routes>*/}
      {/*    </div>*/}

      {/*  </>*/}
      {/*}*/}
    </BrowserRouter>
    // </AuthContext.Provider>
  )
})

export default App;
