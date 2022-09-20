import React, { useEffect, useState, useContext } from 'react'
import MyContext from './MyContext'


const DrinkToday = () => {
    const { usersData, } = useContext(MyContext)
    const [amountOfWaterToday, setAmountOfWaterToday] = useState(0)
    const [updateofnow, setupdateofnow] = useState(0)
    const [oneLastDrink, setOneLastDrink] = useState(0)
    const mange123 = () => {
        setAmountOfWaterToday(updateofnow)
        // setAmountOfWaterToday(prev => [updateofnow, ...prev])

    }
    const mange124 = () => {
        setAmountOfWaterToday(oneLastDrink + amountOfWaterToday)
    }
    useEffect(() => {
        mange123()
        console.log(updateofnow);
    },)

    return (
        <div>DrinkToday work
            <div><button onClick={mange123}
            //  onClick={(e) => { setAmountOfWaterToday(e.target.value) }} 
            >enter your data of drink</button> </div>
            <div>
                <label  >waterInfo</label>
                <input value={amountOfWaterToday}
                    onChange={(e) => { setupdateofnow(e.target.value) }}
                />
            </div>
            <div><button onClick={() => { setOneLastDrink(updateofnow) }}>show amount of drink today</button> </div>
            <div>{updateofnow} </div>
            <div>{amountOfWaterToday}   </div>
        </div>
    )
}

export default DrinkToday