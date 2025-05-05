import {Link} from 'react-router-dom'

function Navigation(){
    return (
        <nav className="app-nav">
            <Link to="/">Home Page             </Link>
            <Link to="/addhike">Create Hike</Link>
            
        </nav>
    )
}

export default Navigation;