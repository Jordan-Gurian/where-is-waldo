import { Link } from "react-router-dom";
import './Navbar.css'

function Navbar() {
    return (
        <header>
            <nav>
                <div className="nav-text">Where's Waldo?</div>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/leaderboard">Leaderboards</Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar