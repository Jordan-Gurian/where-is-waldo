import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import GameImage from './../components/GameImage'
import './Game.css'

function Game() {
    
    const { gameId } = useParams()
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
        <main>
            <GameImage 
                className='game-image' 
                handleClick={handleClick}
                xCoord={clickBoxCoords[0]}
                yCoord={clickBoxCoords[1]}
                active={clickBoxCoords.length > 1}
            />
        </main>

    )
}

export default Game;