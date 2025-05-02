export async function getHikes() {
    const res = await fetch("http://localhost:5001/hikes");
    return await res.json();
  }