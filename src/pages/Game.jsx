import { useState, useEffect } from 'react';
import ClickBox from './../components/ClickBox'
import './Game.css'

function Game() {
    
    const [clickBoxCoords, setClickBoxCoords] = useState([]);

    function handleClick(e) {
        setClickBoxCoords([e.clientX, e.clientY]);
    }

    useEffect(() => {
        if (clickBoxCoords.length > 1) {
            setTimeout(() => {
                setClickBoxCoords([])
            }, 2000);
        }
    }, [clickBoxCoords])

    
    return (
        <main className='game-image' onClick={handleClick}>
            <div>This is the game page</div>
            <ClickBox 
                xCoord={clickBoxCoords[0]}
                yCoord={clickBoxCoords[1]}
                active={clickBoxCoords.length > 1}
            />
        </main>

    )
}

export default Game;