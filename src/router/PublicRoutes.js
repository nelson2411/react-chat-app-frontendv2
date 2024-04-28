import React from "react"
import { Route, Redirect } from "react-router-dom"

const PublicRoutes = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

export default PublicRoutes
