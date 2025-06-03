

export async function getHikes(difficulty, completed, search) {
    const params = new URLSearchParams();
    params.append("difficulty", difficulty);
    params.append("completed", completed);
    params.append("search", search);
    console.log(params.toString())
    console.log("http://localhost:5001/hikes?${params.toString()}")
    const res = await fetch(`http://localhost:5001/hikes?${params.toString()}`);
    
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

export async function getData() {
    
    const res = await fetch(`http://localhost:5001/calc`);
    
    return await res.json();
  }