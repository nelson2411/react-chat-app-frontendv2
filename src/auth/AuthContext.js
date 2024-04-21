import React from "react"
import { createContext } from "react"
import { fetchWhitoutToken } from "../helpers/fetch"

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
    }
    return resp.ok
  }
  const register = (name, email, password) => {}
  const verifyToken = React.useCallback(() => {}, [])
  const logout = () => {}
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
