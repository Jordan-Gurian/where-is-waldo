import './Leaderboard.css'
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Leaderboard({ gameId }) {

    const [game, setGame] = useState({});
    const [leaderboard, setLeaderboard] = useState([]);
    const apiURL = import.meta.env.VITE_API_URL;
    const gameURL = `${apiURL}/games/${gameId}`;
    const leaderboardURL = `${apiURL}/leaderboards/${gameId}`;

    const options = {
        method: "GET",
    }

    async function loadGame() {
        try {
            const response = await fetch(gameURL, options);
            const responseDetails = await response.json();
            setGame(responseDetails);
        } catch(e) {
            console.log(`Error loading image: ${e}`);
            return null
        }
    }

    async function loadLeaderboard() {
        try {
            const response = await fetch(leaderboardURL, options);
            const responseDetails = await response.json();
            setLeaderboard(responseDetails);
        } catch(e) {
            console.log(`Error loading leaderboard: ${e}`);
            return null
        }
    }

    useEffect(() => {
        loadGame();
        loadLeaderboard();
    }, []);   

    return (
        <table>
            <caption>
                {game.name}
            </caption>
            <thead>
                <tr>
                <th scope="col">Rank</th>
                <th scope="col">Name</th>
                <th scope="col">Time</th>
                </tr>
            </thead>
            <tbody>
                {leaderboard.map((player, rank) => {
                    return (
                    <tr key={uuidv4()}>
                        <th scope="row">{rank + 1}</th>
                        <td>{player.name}</td>
                        <td>{player.time}</td>
                    </tr>
                )
                })}
            </tbody>
        </table>
    )
}