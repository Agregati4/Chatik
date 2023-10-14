import { Navigate } from "react-router-dom"

function ProtectedRoute(props) {
  return (
    props.isLoggedIn ? <Navigate to='/' /> : props.element
  )
}

export default ProtectedRoute;