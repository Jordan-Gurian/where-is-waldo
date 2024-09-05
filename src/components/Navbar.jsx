import { Link } from "react-router-dom";
import './Navbar.css'

function Navbar() {
    return (
        <header>
            <nav>
                <div className="nav-text">Where is Waldo?</div>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/leaderboard">Leaderboard</Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar