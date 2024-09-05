import './GameImage.css';
import ClickBox from './../components/ClickBox'

export default function GameImage({ handleClick, xCoord, yCoord, active }) {
    // This function will need to fetch images and put them in a box

    const imgURL = 'https://picsum.photos/500';

    return (
        <div className='game-image-container'>
            <img className='game-image' onClick={handleClick} src={imgURL} alt='404 not found' height='500px' width='500px' />
            <ClickBox 
                xCoord={xCoord}
                yCoord={yCoord}
                active={active}
            />
        </div>

    )
}

// Blogpost.propTypes = {
//     post: PropTypes.object.isRequired,
// }
