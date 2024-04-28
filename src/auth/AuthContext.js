import React from "react"
import { createContext } from "react"
import { fetchWhitoutToken, fetchWithToken } from "../helpers/fetch"

export const AuthContext = createContext()

const initialState = {
  uid: null, // user id coming from database
  checking: true, // check if the user is logged in or not
  logged: false,
  name: null,
  email: null,
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(initialState)
  const login = async (email, password) => {
    const resp = await fetchWhitoutToken("login", { email, password }, "POST")
    if (resp.ok) {
      localStorage.setItem("token", resp.token)
      const { user } = resp
      setAuth({
        uid: user.id,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      })
      console.info("User logged in")
    }
    return resp.ok
  }
  const register = async (name, email, password) => {
    const resp = await fetchWhitoutToken(
      "login/new",
      { name, email, password },
      "POST"
    )

    if (resp.ok) {
      console.log(resp)
      localStorage.setItem("token", resp.token)
      const { user } = resp
      setAuth({
        uid: user.id,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      })
      console.log("User registered")
      return true
    }
    return resp.ok
  }
  const verifyToken = React.useCallback(async () => {
    const token = localStorage.getItem("token") || ""
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      })
      return false
    }
    const resp = await fetchWithToken("login/renew")
    if (resp.ok) {
      localStorage.setItem("token", resp.token)
      const { user } = resp
      setAuth({
        uid: user.id,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      })
      console.info("User logged in")
      return true
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      })
      return false
    }
  }, [])
  const logout = () => {
    localStorage.removeItem("token") // remove the token from the local storage
    setAuth({
      checking: false,
      logged: false,
    })
  }
  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        verifyToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
