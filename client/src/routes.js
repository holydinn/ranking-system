import React, {useContext} from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth.js";

import Main from "./pages/Main.js";
import {Context} from "./index.js";
import {observer} from "mobx-react-lite";
import Events from "./pages/Event/Events.js";
import CreateEventPage from "./pages/Event/CreateEventPage.js";
import EventPage from "./pages/Event/EventPage.js";
import Results from "./pages/Result/Results.js";
import ResultPage from "./pages/Result/ResultPage.js";
import Votes from "./pages/Vote/Votes.js";
import VotePage from "./pages/Vote/VotePage.js";


const AppRouter = observer(() => {
    const {user} = useContext(Context)
    console.log(user)
    return (
      <Routes>
        {user._isAuth &&
          <>
            <Route path="/">
              <Route index element={<Main/>}/>
              <Route path="events">
                <Route index element={<Events/>}/>
                <Route path=":id" element={<EventPage/>}/>
                <Route path="new" element={<CreateEventPage/>}/>
              </Route>
              <Route path="results">
                <Route index element={<Results/>}/>
                <Route path=":id" element={<ResultPage/>}/>
              </Route>
              <Route path="votes">
                <Route index element={<Votes/>}/>
                <Route path=":id" element={<VotePage/>}/>
              </Route>
            </Route>
            <Route
              path="*"
              element={<Navigate to="/" replace/>}
            />
          </>
        }
        {!user._isAuth &&
          <>
            <Route path="registration" element={<Auth/>}/>
            <Route path="login" element={<Auth/>}/>
            <Route
              path="*"
              element={<Navigate to="/login" replace/>}
            />
          </>
        }
      </Routes>
    )
  })
;

export default AppRouter;