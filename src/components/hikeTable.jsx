import { useEffect, useState } from 'react';
import { getHikes, deleteHike } from './hikeData';
import {DetailsPage} from '../pages/details';
import { Link } from 'react-router-dom';

function HikeTable() {
  const [hikes, setHikes] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getHikes(); // or import { hikes } if using static
      setHikes(data);
    }
    loadData();
  }, []);
  const handleDelete = async (id) => {
    try {
      await deleteHike(id);
      setHikes(hikes.filter(hike => hike._id !== id)); // update state
    } catch (err) {
      console.error('Error deleting hike:', err);
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Difficulty</th>
          {/* <th>Elevation</th>
          <th>Length</th>
          <th>Location</th> */}
          <th>Completed</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {hikes.map((hike, index) => (
          <tr key={index}>
            <td>{hike.name}</td>
            <td>{hike.difficulty}</td>
            {/* <td>{hike.elevation}</td>
            <td>{hike.length}</td>
            <td>{hike.location}</td> */}
            <td>{hike.completed}</td>
            <td>
              <Link to={`/details/${hike._id}`}>Details</Link>
            </td>
            <td>
              <Link to={`/edithike/${hike._id}`}>Edit</Link>
            </td>
            <td>
              <button onClick={() => handleDelete(hike._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HikeTable;
