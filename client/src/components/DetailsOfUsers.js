import React, { useContext, useEffect, useState } from 'react'
import DrinkToday from './DrinkToday'
import MyContext from './MyContext'

const DetailsOfUsers = () => {
    const { usersData } = useContext(MyContext)
    const [amountOfWaterDrank, setAmountOfWaterDrank] = useState('')
    const [waterInfo, setWaterInfo] = useState('')
    // const users = usersData.users
    const name1 = usersData.map(n => n.name)
    const water1 = usersData.map(n => n.waterInfo.amountOfWaterDrank)
    // const waterOf3 = usersData[2][waterInfo.amountOfWaterDrank]
    // console.log(name1);
    console.log();

    useEffect(() => {
        console.log(waterInfo.amountOfWaterDrank);
    }, [waterInfo])

    return (
        <div>
            {/* {usersData} */}
            <div>   {name1}</div>
            <div>  {water1}</div>
            <div> <DrinkToday /> </div>
            {/* {waterOf3} */}
            {/* DetailsOfUsers work 00:32 */}
        </div>
    )
}

export default DetailsOfUsers