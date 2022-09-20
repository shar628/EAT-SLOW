import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';
import About from './About';
import App from '../App';
import Register from './Register';
import MyContext from './MyContext';
import Login from './Login';

const Routing = () => {

    const [usersData, setUsersData] = useState([])

    const getApiUsers = async () => {
        try {
            const response = await fetch('http://localhost:8004/api/users')
            const dataFromResponse = await response.json()
            setUsersData(dataFromResponse);
            // console.log(dataFromResponse);
            // const usersUrl = "http://localhost:8004/api/users";
            // const response = await axios.get(usersUrl);
            // console.log(response);
            // const data = await response.data;
            // setUsersData(data);
        } catch (e) {
            console.log("Error getting" + e);
        }
    }

    useEffect(() => {
        getApiUsers();
    }, [])
    useEffect(() => {
        console.log(usersData);
    }, [usersData]);
    return (
        <MyContext.Provider value={{ usersData, }} >
            Routing 22:21
            <BrowserRouter>
                <Link to="/" >Home</Link>
                <Link to="/about" >About</Link>
                <Link to="/login" >Login</Link>
                <Link to="/Register" >Register</Link>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/login' element={<Login setUsersData={setUsersData} usersData={usersData} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/register" element={<Register setUsersData={setUsersData} usersData={usersData} />} />
                </Routes>
            </BrowserRouter>
        </MyContext.Provider>
    )
}

export default Routing