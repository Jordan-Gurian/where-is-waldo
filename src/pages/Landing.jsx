import { useNavigate } from 'react-router-dom';
import './Landing.css'
import ImageTile from './../components/ImageTile'

function Landing() {
    
    const navigate = useNavigate();

    function toGame(gameId) {
        navigate(`./game/${gameId}`);
    }

    return (
        <main className='all-image-tiles'>
            <ImageTile id={1} onClickHook={toGame} />
            <ImageTile id={2} onClickHook={toGame} />
            <ImageTile id={3} onClickHook={toGame} />
        </main>
    )
}

export default Landing;