import './Leaderboard.css'
import { useState, useEffect, forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default forwardRef(function Leaderboard(props, ref) {

    const [game, setGame] = useState({});
    const [leaderboard, setLeaderboard] = useState([]);
    const apiURL = import.meta.env.VITE_API_URL;
    const gameURL = `${apiURL}/games/${props.gameId}`;

    const options = {
        method: "GET",
    }

    async function loadGame() {
        try {
            const response = await fetch(gameURL, options);
            const responseDetails = await response.json();
            setGame(responseDetails);
            const leaderboardSorted = responseDetails.leaderboard.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
            setLeaderboard(leaderboardSorted.slice(0, 10));
            ref.current.scrollIntoView({behavior: 'smooth', block: 'end'});
        } catch(e) {
            console.log(`Error loading image: ${e}`);
            return null
        }
    }

    useEffect(() => {
        loadGame();
    }, []);   

    return (
        <table ref={ref}>
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
})