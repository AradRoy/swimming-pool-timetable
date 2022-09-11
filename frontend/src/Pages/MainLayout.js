import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";


const MainLayout = () => {
    return (
        <>
            <NavBar />

            <Outlet />

            <h4>Footer</h4>
        </>
    )
}
export default MainLayout