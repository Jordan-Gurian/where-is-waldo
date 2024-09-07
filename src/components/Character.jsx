import './Character.css'

export default function Character({ name, imgURL, found }) {
    // This function will need to fetch images and put them in a box

    if (found) {
        return(
            <div className='character found'>
                <img className='game-image' src={imgURL} alt='404 not found' height='50px' width='50px' />
                <div>{name}</div>
            </div>
        )
    } else {
        return (
            <div className='character'>
                <img className='game-image' src={imgURL} alt='404 not found' height='50px' width='50px' />
                <div>{name}</div>
            </div>
    
        )
    }
}