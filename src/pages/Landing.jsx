import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Landing.css';
import ImageTile from './../components/ImageTile';

function Landing() {
    
    const [allGames, setAllGames] = useState([]);
    const navigate = useNavigate();

    function toGame(gameId) {
        navigate(`./game/${gameId}`);
    }

    const apiURL = import.meta.env.VITE_API_URL;

    const options = {
        method: "GET",
    }

    const url = `${apiURL}/games`

    async function loadGames() {
        try {
            const response = await fetch(url, options);
            const responseDetails = await response.json();
            setAllGames(responseDetails);
        } catch(e) {
            console.log(`Error loading image: ${e}`);
            return null
        }
    }

    useEffect(() => {
        loadGames();
    }, []);

    return (
        <main className='all-image-tiles' id='landing-tiles'>
            {allGames.map((game) => {
                return (
                <ImageTile key={uuidv4()} gameId={game.id} name={game.name} imgURL={game.imgURL} onClickHook={toGame} />
                )
            })}
        </main>
    )
}

export default Landing;