import { useState} from 'react';
import { useNavigate } from "react-router-dom";

function AddHikePage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [elevation, setElevation] = useState("");
    const [length, setLength] = useState("");
    const [location, setLocation] = useState("");
    const [completed, setCompleted] = useState("");
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5001/add', {
            method: "post",
            body: JSON.stringify({ name, difficulty, elevation, length, location, completed }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved successfully");
            setDifficulty("");
            setName("");
            setElevation("");
            setCompleted("");
            setLength("");
            setLocation("")
        }
    }
    return (
        <>
            <h1>This is React WebApp </h1>
            <form action="">
                <input type="text" placeholder="name" 
                value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="difficulty" 
                value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
                <input type="text" placeholder="elevation" 
                value={elevation} onChange={(e) => setElevation(e.target.value)} />
                <input type="text" placeholder="length" 
                value={length} onChange={(e) => setLength(e.target.value)} />
                <input type="text" placeholder="location" 
                value={location} onChange={(e) => setLocation(e.target.value)} />
                <input type="text" placeholder="completed" 
                value={completed} onChange={(e) => setCompleted(e.target.value)} />

                <button type="submit" 
                onClick={handleOnSubmit}>submit</button>
            </form>

        </>
    );
}

export default AddHikePage;