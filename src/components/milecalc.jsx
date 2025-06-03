import { useEffect, useState } from 'react';
import {getData} from './hikeData';

export function MileCalc(){
    const [calc, setCalc] = useState("");
    async function loadData() {
        const data = await getData()
        console.log("data")
        setCalc(data)
    }
    useEffect(() => {
        loadData()
    }, []);



    console.log("calc")
    console.log(calc)
    
    

    return(
        <div>
            <h1>Total Miles: {calc}</h1>
        </div>
    )
}

