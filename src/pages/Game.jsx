import { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import GameImage from './../components/GameImage'
import './Game.css'
import ClickBox from './../components/ClickBox';
import CharacterBanner from './../components/CharacterBanner';
import FormDialog from './../components/FormDialog';
import ClickBanner from '../components/ClickBanner';
import Timer from '../components/Timer';
import { v4 as uuidv4 } from 'uuid';

function Game() {
    
    const { gameId } = useParams()
    const [clickBoxCoords, setClickBoxCoords] = useState([]);
    const [gameImageDims, setGameImageDims] = useState({left: 0, top: 0, width: 0, height: 0});
    const [hiddenCharacterFound, setHiddenCharacterFound] = useState(null); // passed to CharacterBanner
    const [gameComplete, setGameComplete] = useState(false); // passed to CharacterBanner
    const apiURL = import.meta.env.VITE_API_URL;
    const [startTime, setStartTime] = useState(Date.now());
    const [currentTime, setCurrentTime] = useState("00:00");
    const [finalTime, setFinalTime] = useState(null);


    //#region timer logic
    async function getDuration() {
        const timerUrl = `${apiURL}/timer/stop`;

        const timerBody = {
        start: startTime,
        };

        const timerBodyString = JSON.stringify(timerBody);

        const timerHeaders = {
            "Content-Type": "application/json"
        };

        const timerOptions = {
            body: timerBodyString,
            method: "POST",
            headers: timerHeaders,
        };
        const timerResponse = await fetch(timerUrl, timerOptions);
        const duration = await timerResponse.json();
        setCurrentTime(duration);
    }

    useEffect(() => { 
        const intervalId = setInterval(() => {
            getDuration();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])
    //#endregion timer logic

    //#region Fetch game image
    const [game, setGame] = useState({});

    const options = {
        method: "GET",
    }

    const url = `${apiURL}/games/${gameId}`

    async function loadGame() {
        try {
            const response = await fetch(url, options);
            const responseDetails = await response.json();
            setGame(responseDetails);
        } catch(e) {
            console.log(`Error loading game image: ${e}`);
            return null
        }
    }

    useEffect(() => {
        loadGame();
    }, []);
    //#endregion Fetch game image

    //#region Game Image sizing
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
    //#endregion Game Image sizing

    //#region Click box logic

    // X and Y coords are converted into percentages of the game image size, so 
    // the dimensions are reset on click.
    function handleClick(e) {
        getGameImageDims(); 
        setClickBoxCoords([e.pageX, e.pageY]);
    }

    // Remove click box and click banner after 2 seconds
    useEffect(() => {
        if (clickBoxCoords.length > 1) {
            setTimeout(() => {
                setClickBoxCoords([])
                setHiddenCharacterFound(null);
            }, 2000);
        }
    }, [clickBoxCoords])
    //#endregion Click box logic

    if (gameComplete) {
        
        if (!finalTime) {
            setFinalTime(currentTime);
        }
        
        return (
            <main className='container'>
                <CharacterBanner
                    gameId={gameId}
                    xCoord={(clickBoxCoords[0] - gameImageDims.left + window.scrollX) / gameImageDims.width}
                    yCoord={(clickBoxCoords[1] - gameImageDims.top - window.scrollY) / gameImageDims.height}
                    gameCompleteHook={setGameComplete}
                    charFoundHook={setHiddenCharacterFound}
                />
                <FormDialog time={finalTime}/>
                <div className='game=image-container'>
                    <GameImage
                        key={uuidv4()}
                        ref={gameImageRef}
                        className='game-image' 
                        imgURL={game.imgURL}
                        handleClick={handleClick}
                    />
                </div>
                <ClickBanner found={hiddenCharacterFound} />
            </main>
        )
    }

    if (clickBoxCoords.length > 1) {
        return (
            <main className='container'>
                <Timer 
                    time={currentTime}
                />
                <CharacterBanner
                    gameId={gameId}
                    xCoord={(clickBoxCoords[0] - gameImageDims.left + window.scrollX) / gameImageDims.width}
                    yCoord={(clickBoxCoords[1]  - gameImageDims.top - window.scrollY) / gameImageDims.height}
                    gameCompleteHook={setGameComplete}
                    charFoundHook={setHiddenCharacterFound}
                />
                <div className='game=image-container'>
                    <GameImage
                        key={uuidv4()}
                        ref={gameImageRef}
                        className='game-image'
                        imgURL={game.imgURL}
                        handleClick={handleClick}
                    />
                    <ClickBox 
                        xCoord={clickBoxCoords[0]}
                        yCoord={clickBoxCoords[1]}
                        gameHeight={gameImageDims.height}
                    />
                </div>
                <ClickBanner found={hiddenCharacterFound} />
            </main>
        )
    } else { // no click box
        return (
            <main className='container'>
                <Timer 
                    time={currentTime}
                />
                <CharacterBanner 
                    gameId={gameId}
                    xCoord={(clickBoxCoords[0] - gameImageDims.left + window.scrollX) / gameImageDims.width}
                    yCoord={(clickBoxCoords[1]  - gameImageDims.top - window.scrollY) / gameImageDims.height}
                    gameCompleteHook={setGameComplete}
                    charFoundHook={setHiddenCharacterFound}
                />
                <div className='game=image-container'>
                    <GameImage
                        key={uuidv4()}
                        ref={gameImageRef}
                        className='game-image'
                        imgURL={game.imgURL}
                        handleClick={handleClick}
                    />
                </div>
            </main>
        )
    }

}

export default Game;