import React from "react"
import { AuthContext } from "../auth/AuthContext"
import swal from "sweetalert2"

/*
create the logout functionality in the "salir" button
Please add an alert to confirm the user wants to logout
*/

const SearchBox = () => {
  const { auth, logout } = React.useContext(AuthContext)

  const handleLogout = () => {
    // add an alert to confirm the user wants to logout, using sweetalert
    swal
      .fire({
        title: "Are you sure?",
        text: "You are going to logout",
        icon: "warning",
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "Yes, I want to logout",
        denyButtonText: "No, I want to stay",
        dangerMode: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          logout()
        }
      })
  }

  return (
    <div className="headind_srch">
      <div className="recent_heading mt-2">
        <h5>{auth.name ? auth.name : "Sin nombre"} 🟢</h5>
      </div>
      <div className="srch_bar">
        <div className="stylish-input-group">
          <button className="btn text-danger" onClick={handleLogout}>
            Salir
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBox
