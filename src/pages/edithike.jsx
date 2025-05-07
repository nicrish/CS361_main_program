import '../App';
import { useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

export const EditHikePage = () => {
    const [hike, setHike] = useState({});
    const navigate = useNavigate();
    let { id } = useParams();

    const getHike = async (id) => {
        const response = await fetch(`http://localhost:5001/hikes/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
          });
          if(response.status === 200){
            let hike = await response.json()
            console.log(hike)
            setHike(hike)
          } else {
            console.log("unable to fetch hike")
          }
    }

    const editHike = async (id) => {
        const response = await fetch(`http://localhost:5001/hikes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(hike),
            headers: { 'Content-Type': 'application/json'}
          });
          if(response.status === 200){
            alert("successful edit")
            navigate(`/`);
          } else {
            alert("unable to fetch hike")
            navigate(`/`);
          }
    }

    useEffect(() => {
        getHike(id);
    }, [id]);

    const setName = (name) => {
        setHike({...hike, name: name})
    }
    const setDifficulty = (difficulty) => {
        setHike({...hike, difficulty:difficulty})
    }
    const setElevation = (elevation) => {
        setHike({...hike, elevation:elevation})
    }
    const setLength = (length) => {
        setHike({...hike, length:length})
    }
    const setLocation = (location) => {
        setHike({...hike, location:location})
    }
    const setCompleted = (completed) => {
        setHike({...hike, completed:completed})
    }
    return (
        <div>
            <h1>Edit Hike</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter name here"
                    value={hike.name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type="text"
                    value={hike.difficulty}
                    placeholder="Enter difficulty here"
                    onChange={e => setDifficulty(e.target.value)} />
                <input
                    type="number"
                    placeholder="Enter elevation here"
                    value={hike.elevation}
                    onChange={e => setElevation(e.target.valueAsNumber)} />
                <input
                    type="text"
                    placeholder="Enter length here"
                    value={hike.length}
                    onChange={e => setLength(e.target.value)} />
                <input
                    type="text"
                    placeholder="Enter location here"
                    value={hike.location}
                    onChange={e => setLocation(e.target.value)} />                                        
                <input
                    type="text"
                    placeholder="Enter completed here"
                    value={hike.completed}
                    onChange={e => setCompleted(e.target.value)} />  
                <button
                    onClick={() => editHike(hike._id)}
                    >Edit</button>
            </div>
        </div>
    );
}

export default EditHikePage;