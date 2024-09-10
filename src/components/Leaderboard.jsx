import './Leaderboard.css'
import { v4 as uuidv4 } from 'uuid';

export default function Leaderboard({ leaderboardId }) {
    // perform API GET for data
    let leaderboardData;

    if (!leaderboardId) {
        leaderboardId = '1';
    }

    if (leaderboardId === '1') {
        leaderboardData = [{name: 'Lisa', time: '00:14'},
            {name: 'Marge', time: '00:45'},
            {name: 'Maggie', time: '00:46'},
            {name: 'Bart', time: '08:21'},
            {name: 'Homer', time: '37:56'}
         ];
    } else if (leaderboardId === '2') {
        leaderboardData = [{name: 'Lisa', time: '00:14'},
            {name: 'Maggie', time: '00:46'},
            {name: 'Bart', time: '08:21'},
         ];
    } else {
        leaderboardData = [{name: 'Lisa', time: '00:14'},
            {name: 'Marge', time: '00:45'},
            {name: 'Maggie', time: '00:46'},
         ];
    }


    return (
        <table>
            <caption>
                Leaderboard Level {leaderboardId}
            </caption>
            <thead>
                <tr>
                <th scope="col">Rank</th>
                <th scope="col">Name</th>
                <th scope="col">Time</th>
                </tr>
            </thead>
            <tbody>
                {leaderboardData.map((player, rank) => {
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