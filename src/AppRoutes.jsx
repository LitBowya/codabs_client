import {Route, Routes} from "react-router-dom";
// Layouts
import AdminLayout from "./layouts/AdminLayout.jsx"
import UserLayout from "./layouts/UserLayout.jsx"

// User Pages
import Home from "./pages/User/Home.jsx"
import Login from './pages/User/Login.jsx';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard.jsx';


const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="*" element={
                <UserLayout>
                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </UserLayout>
            } />


            {/* Protected Admin Dashboard Routes */}
            <Route
                path="/admin/*"
                element={
                    <AdminLayout>
                        <Routes>
                            <Route path="" element={<Dashboard />} />
                        </Routes>
                    </AdminLayout>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
