import React from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../auth/AuthContext"
import Swl from "sweetalert2"

const LoginPage = () => {
  const { login } = React.useContext(AuthContext)
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  React.useEffect(() => {
    const email = localStorage.getItem("email")
    if (email) {
      setForm((form) => ({ ...form, email, rememberMe: true }))
    }
  }, []) // componentDidMount

  const onChange = ({ target }) => {
    const { name, value } = target
    setForm({
      ...form,
      [name]: value, // square brackets to use the value of the variable as the key
    })
  }

  const toggleCheck = () => {
    setForm({
      ...form,
      rememberMe: !form.rememberMe,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    form.rememberMe
      ? localStorage.setItem("email", form.email)
      : localStorage.removeItem("email")

    // call to the backend
    const { email, password } = form
    const ok = await login(email, password)
    console.log(ok)
    if (!ok) {
      Swl.fire("Error", "Verifique el email y password", "error")
    }
  }
  return (
    <form
      onSubmit={onSubmit}
      className="login100-form validate-form flex-sb flex-w"
    >
      <span className="login100-form-title mb-3">Chat - Ingreso</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col" onClick={() => toggleCheck()}>
          <input
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberMe"
            checked={form.rememberMe}
            readOnly
          />
          <label className="label-checkbox100">Recordarme</label>
        </div>

        <div className="col text-right">
          <Link to="/auth/register" className="txt1">
            Nueva cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button className="login100-form-btn">Ingresar</button>
      </div>
    </form>
  )
}

export default LoginPage
