import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedLayout = ({ children, login = false }) => {
    const isAuth = Boolean(useSelector((state) => state.token))

    if (login) {
        if (isAuth) {
            return <Navigate to="/home" />
        }
        return children
    }

    if (!isAuth) {
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedLayout