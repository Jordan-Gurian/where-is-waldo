import { useState, useEffect } from 'react';
import Character from './Character';
import './CharacterBanner.css'
import { v4 as uuidv4 } from 'uuid';

export default function CharacterBanner({ gameId, xCoord, yCoord }) {
    // This function will need to fetch images and put them in a box
    // use gameId in api call

    const characters = [{name: 'Fox', imgURL: 'https://play.nintendo.com/images/Masthead_Fox.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png', x1: 0.686, x2: .716, y1: 0.434, y2: .468},
    {name:'Link', imgURL:'https://ssb.wiki.gallery/images/thumb/9/91/Toon_Link.png/1200px-Toon_Link.png', x1: 0.638, x2: 0.660, y1: 0.690, y2: 0.701}]// this will be retrieved with api call

    const [hiddenCharacters, setHiddenCharacters] = useState(characters);


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

    function characterStillHidden(currentChar) {
        for (let i =0; i < hiddenCharacters.length; i++) {
            if (currentChar.name === hiddenCharacters[i].name) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        setHiddenCharacters(hiddenCharacters.filter((char) => !characterFound(char)));
    }, [xCoord, yCoord])
    

    return (
        <div className='character-banner'>
            {characters.map((char) => {
                return <Character key={uuidv4()} name={char.name} imgURL={char.imgURL} found={!characterStillHidden(char)}/>
            })}
        </div>

    )
}