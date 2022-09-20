import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Register = ({ setUsersData, userData }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [waterInfo, setWaterInfo] = useState('')

    const handleSubmitUserData = async () => {
        // const response = await fetch('http://localhost:8004/api/users')
        // const dataFromResponse = await response.json()
        // setUsersData(dataFromResponse);

        const newUser = { name: name, email: email, password: password, age: age, waterInfo: waterInfo.amountOfWaterDrank }
        const userAdded = await axios({ method: 'post', url: 'http://localhost:8004/api/user', data: newUser })
        setUsersData(prev => [userAdded.data, ...prev])

        setName('')
        setEmail('')
        setPassword('')
        setAge('')
        setWaterInfo('')
        console.log(userAdded.data);
        console.log(userData);
    }
    useEffect(() => {
        // eslint-disable-next-line no-undef
        // console.log(userAdded.data);
    }, [])

    return (
        <div>
            Register work 22:36
            <div>
                <label>NAME:</label>
                <input value={name} onChange={(e) => { setName(e.target.value) }} />
            </div>
            <div>
                <label>EMAIL:</label>
                <input value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div>
                <label>PASSWORD:</label>
                <input value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            {/* <div>
                <label>AGE:</label>
                <input value={age} onChange={(e) => { setAge(e.target.value) }} />
            </div> */}
            {/* <div>
                <label>waterInfo</label>
                <input value={waterInfo} onChange={(e) => { setWaterInfo(e.target.value) }} />
            </div> */}
            <div>
                <button onClick={handleSubmitUserData} >ENTER YOUR DATA:</button>
            </div>
        </div>
    )
}

export default Register