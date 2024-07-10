import { Outlet } from "react-router-dom"

const Root = () => {
    return (
        <div>
            <div>Root</div>
            <Outlet />
        </div>
    )
}

export default Root