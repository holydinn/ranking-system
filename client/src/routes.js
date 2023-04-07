import React, {useContext} from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth.js";
import Events from "./pages/Events.js";
import Results from "./pages/Results.js";
import Votes from "./pages/Votes.js";
import Main from "./pages/Main.js";
import {Context} from "./index.js";

const AppRouter = () => {
  const {user} = useContext(Context)
  console.log(user)
  if (user.isAuth) {
    return (
      <Routes>
        <Route path="/">
          <Route index element={<Main/>}/>
          <Route path="events">
            <Route index element={<Events/>}/>
            {/*<Route path=":id" element={<EventPage/>}/>*/}
            {/*<Route path="new" element={<EventPage/>}/>*/}
          </Route>
          <Route path="results">
            <Route index element={<Results/>}/>
            {/*<Route path=":id" element={<ResultPage/>}/>*/}
          </Route>
          <Route path="vote">
            <Route index element={<Votes/>}/>
            {/*<Route path=":id" element={<VotePage/>}/>*/}
          </Route>
        </Route>
        <Route
          path="*"
          element={<Navigate to="/" replace/>}
        />
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path="/">
        <Route path="login" element={<Auth/>}/>
        <Route path="registration" element={<Auth/>}/>
      </Route>
      <Route
        path="*"
        element={<Navigate to="/" replace/>}
      />
    </Routes>
  )
};

export default AppRouter;