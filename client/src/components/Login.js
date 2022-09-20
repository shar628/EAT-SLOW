import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Login = ({ setUsersData, userData }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        // console.log('Login work');
        const newUser = { email: email, password: password }
        const existUser = await axios({ method: 'post', url: 'http://localhost:8004/api/login', data: newUser })

        //check if the user has been added successfully

        //if(NOT) --> error and everything
        // if (!existUser) {
        // console.log('error ');
        // }
        //if(YES) set the UsersData,  its wrong because i dont need add new user just enter the app
        //  and then navigate to the main screen
        setUsersData(prev => [existUser.data, ...prev])
        console.log('2217 done');

        console.log(existUser.data);
        setEmail('')
        setPassword('')
        //navigate here

        // console.log(usersData);
    }
    useEffect(() => {

    })
    return (
        <div>Login work
            <div>
                <label>EMAIL:</label>
                <input value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div>
                <label>PASSWORD:</label>
                <input value={password} type="password" minLength={2} onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login