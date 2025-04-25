import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Admin/Sidebar.jsx';
import Navbar from '../components/Admin/Navbar.jsx';
import Footer from '../components/Admin/Footer.jsx';

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // You can show a loading state while checking auth
    if (!user) {
        return null; // or a spinner or loading UI
    }

    return (
        <div className="flex h-screen bg-primary">

                <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 max-width">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default AdminLayout;
