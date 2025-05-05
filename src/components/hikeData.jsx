import { useNavigate } from "react-router-dom";

export async function getHikes() {
    const res = await fetch("http://localhost:5001/hikes");
    return await res.json();
  }
export async function deleteHike(id) {
  const res = await fetch(`http://localhost:5001/hikes/${id}`, {
    method: 'DELETE',
  });
  
  if(res.status === 200){
    alert("successful delete")
    //navigate(`/`);
  } else {
    alert("unable to delete hike")
    //navigate(`/`);
  }
}