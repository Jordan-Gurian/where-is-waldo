import { useState, useRef, useEffect } from 'react';
import Character from './Character';
import './CharacterBanner.css'
import { v4 as uuidv4 } from 'uuid';

export default function CharacterBanner({ characters, xCoord, yCoord, gameCompleteHook, charFoundHook }) {

    // const characters = [{name: 'Fox', imgURL: 'https://play.nintendo.com/images/Masthead_Fox.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png', x1: 0.686, x2: .716, y1: 0.434, y2: .468},
    // {name:'Link', imgURL:'https://ssb.wiki.gallery/images/thumb/9/91/Toon_Link.png/1200px-Toon_Link.png', x1: 0.638, x2: 0.660, y1: 0.690, y2: 0.710}]// this will be retrieved with api call

    const [hiddenCharacters, setHiddenCharacters] = useState(['dummy']);
    const hiddenCharactersCount = useRef(hiddenCharacters.length);

    // Check if current click is within character hit box
    function characterFound(char) {
        if (isNaN(xCoord) || isNaN(yCoord)) {
            return false;
        } else {
            return xCoord >= char.x1
            && xCoord <= char.x2 
            && yCoord >= char.y1
            && yCoord <= char.y2
        }
    }

    // Check if one of the characters tied to this game has been found yet
    function characterStillHidden(currentChar) {
        for (let i =0; i < hiddenCharacters.length; i++) {
            if (currentChar.name === hiddenCharacters[i].name) { // probably switch to id when api is incorporated
                return true;
            }
        }
        return false;
    }

    // When the user clicks, remove any character that has just been found from 
    // hiddenCharacters.
    useEffect(() => {
        setHiddenCharacters(hiddenCharacters.filter((char) => !characterFound(char)));
    }, [xCoord, yCoord])
    
    // When hiddenCharacters is updated, pass whether or not a character has been
    // found to Game
    useEffect(() => {
        if (hiddenCharacters.length != hiddenCharactersCount.current) {
            hiddenCharactersCount.current = hiddenCharacters.length;
            charFoundHook(true)
        } else {
            charFoundHook(false);
        }
    }, [hiddenCharacters])

    useEffect(() => {
        if (characters.length > 0) {
            setHiddenCharacters(characters);
        }
    }, [characters])

    // Let Game know that the game is complete when there are no hidden characters
    if (characters.length > 0 && hiddenCharacters.length === 0) {
        gameCompleteHook(true);
    }

    return (
        <div className='character-banner'>
            {characters.map((char) => {
                return <Character key={uuidv4()} name={char.name} imgURL={char.imgURL} found={!characterStillHidden(char)}/>
            })}
        </div>
    )
}