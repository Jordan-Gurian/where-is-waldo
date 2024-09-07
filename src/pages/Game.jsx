import { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import GameImage from './../components/GameImage'
import './Game.css'
import ClickBox from './../components/ClickBox';
import CharacterBanner from './../components/CharacterBanner';

function Game() {
    
    const { gameId } = useParams()
    const [clickBoxCoords, setClickBoxCoords] = useState([]);
    const [gameImageDims, setGameImageDims] = useState({left: 0, top: 0})

    const gameImageRef = useRef(null);

    function getGameImageDims() {
        if (gameImageRef.current) {
            const imageRect = gameImageRef.current.getBoundingClientRect();
            setGameImageDims({
                left: imageRect.left,
                top: imageRect.top,
            });
        }
    }
    
    const handleScroll = () => {
      getGameImageDims();
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleClick(e) {
        setClickBoxCoords([e.pageX, e.pageY]);
    }

    useEffect(() => {
        if (clickBoxCoords.length > 1) {
            setTimeout(() => {
                setClickBoxCoords([])
            }, 2000);
        }
    }, [clickBoxCoords])

    
    return (
        <main className='container'>
            <div>Left: {gameImageDims.left} Top: {gameImageDims.top}</div>
            <CharacterBanner 
                gameId={gameId}
            />
            <div className='game=image-container'>
                <GameImage
                    ref={gameImageRef}
                    className='game-image' 
                    handleClick={handleClick}
                />
                <ClickBox 
                    xCoord={clickBoxCoords[0]}
                    yCoord={clickBoxCoords[1]}
                    active={clickBoxCoords.length > 1}
                />
            </div>
        </main>
    )
}

export default Game;