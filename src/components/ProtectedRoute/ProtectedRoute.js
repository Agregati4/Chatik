import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

function ProtectedRoute(props) {
  const { isLoggedIn } = useSelector(state => state.isLoggedIn);

  return (
    isLoggedIn ? props.element : <Navigate to='/signin' />
  )
}

export default ProtectedRoute;