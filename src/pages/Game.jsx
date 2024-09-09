import { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import GameImage from './../components/GameImage'
import './Game.css'
import ClickBox from './../components/ClickBox';
import CharacterBanner from './../components/CharacterBanner';
import FormDialog from './../components/FormDialog'

function Game() {
    
    const { gameId } = useParams()
    const [clickBoxCoords, setClickBoxCoords] = useState([]);
    const [gameImageDims, setGameImageDims] = useState({left: 0, top: 0, width: 0, height: 0})
    const [gameComplete, setGameComplete] = useState(false);


    const gameImageRef = useRef(null);

    function getGameImageDims() {
        if (gameImageRef.current) {
            const imageRect = gameImageRef.current.getBoundingClientRect();
            setGameImageDims({
                left: imageRect.left,
                top: imageRect.top,
                width: imageRect.width,
                height: imageRect.height,
            });
        }
    }
    
    const handleResize = () => {
      getGameImageDims();
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        getGameImageDims();
      }
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

    if (gameComplete) {
        return (
            <main className='container'>
                <CharacterBanner
                    gameId={gameId}
                    xCoord={(clickBoxCoords[0] - gameImageDims.left) / gameImageDims.width}
                    yCoord={(clickBoxCoords[1]  - gameImageDims.top) / gameImageDims.height}
                    gameCompleteHook={setGameComplete}
                />
                <FormDialog />
                <div className='game=image-container'>
                    <GameImage
                        ref={gameImageRef}
                        className='game-image' 
                        handleClick={handleClick}
                    />
                </div>
            </main>
        )
    }

    if (clickBoxCoords.length > 1) {
        return (
            <main className='container'>
                <CharacterBanner
                    gameId={gameId}
                    xCoord={(clickBoxCoords[0] - gameImageDims.left) / gameImageDims.width}
                    yCoord={(clickBoxCoords[1]  - gameImageDims.top) / gameImageDims.height}
                    gameCompleteHook={setGameComplete}
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
                        gameHeight={gameImageDims.height}
                    />
                </div>
            </main>
        )
    } else { // no click box
        return (
            <main className='container'>
                <CharacterBanner 
                    gameId={gameId}
                    xCoord={(clickBoxCoords[0] - gameImageDims.left) / gameImageDims.width}
                    yCoord={(clickBoxCoords[1]  - gameImageDims.top) / gameImageDims.height}
                />
                <div className='game=image-container'>
                    <GameImage
                        ref={gameImageRef}
                        className='game-image' 
                        handleClick={handleClick}
                    />
                </div>
            </main>
        )
    }

}

export default Game;