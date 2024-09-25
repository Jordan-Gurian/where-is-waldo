import { useParams, useNavigate } from  'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './Leaderboard.css'
import ImageTile from './../components/ImageTile';
import LeaderboardComponent from './../components/Leaderboard';
import { v4 as uuidv4 } from 'uuid';

export default function Leaderboard() {
    
    const ref = useRef(null);
    const [allGames, setAllGames] = useState([]);
    const { gameId } = useParams();
    const [currentGameId, setCurrentGameId] = useState(gameId);
    const navigate = useNavigate();
    const apiURL = import.meta.env.VITE_API_URL;
    const url = `${apiURL}/games`

    const options = {
        method: "GET",
    }


    function toLeaderboard(id) {
        if (!gameId) {
            navigate(`./${id}`);
        } else {
            navigate(`./../${id}`);
        }
    }

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
    
    useEffect(() => {
        if (!gameId && allGames.length > 0) {
            setCurrentGameId(allGames[0].id);
        } else {
            setCurrentGameId(gameId);
        }
    }, [gameId, allGames])
 
    if (!currentGameId) {
        return (
            <main className='leaderboard-container'>
                <div className='all-image-tiles'>
                    {allGames.map((game) => {
                    return (
                        <ImageTile key={uuidv4()} gameId={game.id} name={game.name} imgURL={game.imgURL} onClickHook={toLeaderboard} />
                    )
                })}
                </div>
            </main>
        )
    } else {
        return (
            <main className='leaderboard-container'>
                <div className='all-image-tiles'>
                    {allGames.map((game) => {
                    return (
                        <ImageTile key={uuidv4()} gameId={game.id} name={game.name} imgURL={game.imgURL} onClickHook={toLeaderboard} />
                    )
                })}
                </div>
                <LeaderboardComponent key={uuidv4()} ref={ref} gameId={currentGameId}/>
            </main>
        )
    }
 
}