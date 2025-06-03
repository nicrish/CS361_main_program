import { useEffect, useState } from 'react';
import { getHikes, deleteHike } from './hikeData';
import {DetailsPage} from '../pages/details';
import { Link } from 'react-router-dom';
import {DifficultyFilter, CompletedFilter} from './HikeFilter';
import { useSearchParams } from 'react-router-dom';
import Search from './HikeSearch';


function HikeTable() {
  const [difficulty, setDifficulty] = useState("All");
    
  function handleFilterDifficulty(event) {
      setDifficulty(event.target.value)
  }
     
  const [completed, setCompleted] = useState("All");
    
  function handleFilterCompleted(event) {
      setCompleted(event.target.value)
  }
  
  const [hikes, setHikes] = useState([]);

  const [search, setSearch] = useState(""); 

  function handleSearch(newSearch) {
      setSearch(newSearch)
     
  }  
  function handleSubmit (event) {
    event.preventDefault();
    loadData(difficulty, completed, search)
    setSearch('');
  };

  async function loadData(difficulty, completed, search) {
    const data = await getHikes(difficulty, completed, search); 
    setHikes(data);
  }
  
  useEffect(() => {
    loadData(difficulty, completed, search);
    if (difficulty || completed) {
    
    console.log("Difficulty:", difficulty);
    console.log("Completed:", completed);
    console.log("Search:", search);
    
    }
    // if (search) {
    //   handleSubmit()
    // }
    
  }, [difficulty, completed]);

  const handleDelete = async (id) => {
    try {
      await deleteHike(id);
      // setHikes(hikes.filter(hike => hike._id !== id)); // update state
      await loadData();
    } catch (err) {
      console.error('Error deleting hike:', err);
    }
  };
  

  return (
    <>
    <DifficultyFilter difficulty = {difficulty} handleFilterDifficulty={handleFilterDifficulty}></DifficultyFilter>
    <CompletedFilter completed = {completed} handleFilterCompleted={handleFilterCompleted}></CompletedFilter>
    <Search handleSubmit={handleSubmit} handleSearch = {handleSearch} search = {search} setSearch = {setSearch}></Search>
    
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
    </>

  );
}

export default HikeTable;
