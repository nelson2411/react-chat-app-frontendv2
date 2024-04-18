import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"
import ChatPage from "../pages/ChatPage"
import AuthRouter from "./AuthRouter"
import "../css/login-register.css"

const AppRouter = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          <Router>
            <div>
              <Switch>
                <Route path="/auth" component={AuthRouter} />
                <Route exact path="/" component={ChatPage} />
                <Redirect to="/" />
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    </div>
  )
}

export default AppRouter
