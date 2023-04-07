import React from 'react'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes.js";
import NavBar from "./components/NavBar.js";
import {useContext} from "@types/react";
import {Context} from "./index.js";
import SideBar from "./components/SideBar.js";

function App() {
  // const {token, login, logout, userId, ready} = useAuth()
  // const isAuthenticated = !!token

  const routes = AppRouter(false)
  // if (!ready) {
  //   return <Loader/>
  // }
  const {user} = useContext(Context)
  return (
    // <AuthContext.Provider value={{
    //   token, login, logout, userId, isAuthenticated
    // }}>
    <BrowserRouter>
      {!user.isAuth && <NavBar/>}
      {user.isAuth && <SideBar/>}
      <div className="container">
        {routes}
      </div>
    </BrowserRouter>
    // </AuthContext.Provider>
  )
}

export default App;
