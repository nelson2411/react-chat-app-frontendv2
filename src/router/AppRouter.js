import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"
import ChatPage from "../pages/ChatPage"
import AuthRouter from "./AuthRouter"
import { AuthContext } from "../auth/AuthContext"
import PublicRoutes from "./PublicRoutes"
import PrivateRoutes from "./PrivateRoutes"

const AppRouter = () => {
  const { auth, verifyToken } = React.useContext(AuthContext)

  console.table("AppRouter", auth)

  React.useEffect(() => {
    verifyToken()
  }, [verifyToken])

  if (auth.checking) {
    return <h1>Loading...</h1>
  }

  return (
    <Router>
      <div>
        <Switch>
          {/* <Route path="/auth" component={AuthRouter} /> */}
          {/* <Route exact path="/" component={ChatPage} /> */}
          <PublicRoutes
            path="/auth"
            isAuthenticated={auth.logged}
            component={AuthRouter}
          />
          <PrivateRoutes
            exact
            path="/"
            isAuthenticated={auth.logged}
            component={ChatPage}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter
