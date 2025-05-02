import { useEffect, useState } from 'react';
import { getHikes } from './hikeData';

function HikeTable() {
  const [hikes, setHikes] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getHikes(); // or import { hikes } if using static
      setHikes(data);
    }
    loadData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th><th>Difficulty</th><th>Elevation</th><th>Length</th><th>Location</th><th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {hikes.map((hike, index) => (
          <tr key={index}>
            <td>{hike.name}</td>
            <td>{hike.difficulty}</td>
            <td>{hike.elevation}</td>
            <td>{hike.length}</td>
            <td>{hike.location}</td>
            <td>{hike.completed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HikeTable;
