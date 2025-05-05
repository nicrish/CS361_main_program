import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage';
import AddHikePage from './pages/addhike';
import EditHikePage from './pages/edithike';
import Navigation from './components/navigation';

function App() {
  const currentYear = new Date().getFullYear();
  return (
    <Router>
      <div className="app">
        
          <header>
            <h1>Hike Tracker</h1>
            <p>A Full Stack MERN App Demonstration</p>
          </header>
          <Navigation/>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/addhike" element={ <AddHikePage/>}></Route>
            <Route path="/edithike/:id" element={ <EditHikePage/>}></Route>
          </Routes>
          <footer>
            <p>&copy; {currentYear} Nicole Rishwain</p>
          </footer>
      </div>
    </Router>
    
  );
}

export default App;