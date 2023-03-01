import React, {useEffect, useState} from 'react';
import './App.css';
import MainSideBar from "./components/sideBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/Dashboard";
import User from "./pages/User";
import UserEdit from "./pages/User/UserEdit";
import Dashboard from "./pages/Dashboard/Dashboard"


function App() {
    function useLoggedIn() {
        const [loggedIn, setLoggedIn] = useState(false);

        useEffect(() => {
            const user = localStorage.getItem('token');
            console.log(user)
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        }, []);

        return loggedIn;
    }
    const loggedIn = useLoggedIn();

    return (
    <div className="App">
        <BrowserRouter>
            {loggedIn ? (
                <>
                    <MainSideBar />
                    <div className="screens-container">
                        <div className='screens-section-container'>
                            <Routes>
                                <Route path='/main' element={<MainPage />} />
                                <Route path='/home' element={<Dashboard />} />
                                <Route path='/user' element={<User />}/>
                                <Route path='/userEdit' element={<UserEdit/>}/>

                            </Routes>
                        </div>
                    </div>
                </>
            ): (
                <Routes>
                    <Route path='/' element={<Login/>} />
                </Routes>
            )}
        </BrowserRouter>
    </div>
  );
}

export default App;
