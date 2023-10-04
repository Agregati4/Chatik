import { Navigate } from "react-router-dom"

function ProtectedRoute(props) {
  return (
    props.isLoggedIn ? props.element : <Navigate to='/signin' />
  )
}

export default ProtectedRoute;