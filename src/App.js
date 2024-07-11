import React, {useEffect, useState} from 'react';
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";
import Navbar from './components/UI/navbar/Navbar';

function App() {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('auth'));
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;