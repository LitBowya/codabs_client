import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Bounce, ToastContainer} from "react-toastify";
import AppRoutes from './AppRoutes.jsx';

const App = () => {

    return (
        <BrowserRouter>
            <AppRoutes />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </BrowserRouter>
    );
};

export default App;
