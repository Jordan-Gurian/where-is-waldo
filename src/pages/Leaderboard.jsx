import { useParams, useNavigate } from  'react-router-dom';
import './Leaderboard.css'
import ImageTile from './../components/ImageTile';
import LeaderboardComponent from './../components/Leaderboard';

export default function Leaderboard() {
    
    const { leaderboardId } = useParams();
    const navigate = useNavigate();

    function goTo(id) {
        if (!leaderboardId) {
            navigate(`./${id}`)
        } else {
            navigate(`./../${id}`)
        }
    }

    return (
        <main className='leaderboard-container'>
            <div className='image-tile-container'>
                <ImageTile id={1} onClickHook={goTo} />
                <ImageTile id={2} onClickHook={goTo} />
                <ImageTile id={3} onClickHook={goTo} />
            </div>
            <LeaderboardComponent leaderboardId={leaderboardId}/>
        </main>
    )
}