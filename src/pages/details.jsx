import '../App';
import { useEffect, useState} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteHike } from '../components/hikeData';

const DetailsPage = () => {
    const [hike, setHike] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const getHike = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/hikes/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
                const hikeData = await response.json();
                setHike(hikeData);
            } else {
                console.log("Unable to fetch hike");
            }
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteHike(id);
            navigate('/'); // Navigate back to the main page or hike list
        } catch (err) {
            console.error('Error deleting hike:', err);
        }
    };

    useEffect(() => {
        getHike(id);
    }, [id]);

    if (!hike) return <p>Loading hike details...</p>;

    return (
        <div>
            <h1>Hike Details</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Difficulty</th>
                        <th>Elevation</th>
                        <th>Length</th>
                        <th>Location</th>
                        <th>Completed</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{hike.name}</td>
                        <td>{hike.difficulty}</td>
                        <td>{hike.elevation}</td>
                        <td>{hike.length}</td>
                        <td>{hike.location}</td>
                        <td>{hike.completed ? 'Yes' : 'No'}</td>
                        <td>
                            <Link to={`/edithike/${hike._id}`}>Edit</Link>
                        </td>
                        <td>
                            <button onClick={handleDelete}>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DetailsPage;
