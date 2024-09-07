import Character from './Character';
import './CharacterBanner.css'
import { v4 as uuidv4 } from 'uuid';

export default function CharacterBanner({ gameId, xCoord, yCoord }) {
    // This function will need to fetch images and put them in a box
    // use gameId in api call
    const characters = [{name: 'Fox', imgURL: 'https://play.nintendo.com/images/Masthead_Fox.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png', x1: 0, x2: 1, y1: 0, y2: 1},
    {name:'Link', imgURL:'https://ssb.wiki.gallery/images/thumb/9/91/Toon_Link.png/1200px-Toon_Link.png', x1: 0, x2: 1, y1: 0, y2: 1}] // this will be retrieved with api call

    function characterFound(char) {
        return xCoord > char.x1 && xCoord < char.x2 && yCoord > char.y1 && yCoord < char.y2
        
    }

    return (
        <div className='character-banner'>
            {characters.map((char) => {
                return <Character key={uuidv4()} name={char.name} imgURL={char.imgURL} found={characterFound(char)}/>
            })}
        </div>

    )
}