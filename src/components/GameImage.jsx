import './GameImage.css';
import { forwardRef } from 'react';

export default forwardRef(function GameImage(props, ref) {
    // This function will need to fetch images and put them in a box

    const imgURL = 'https://cdna.artstation.com/p/assets/images/images/062/553/264/medium/pierre-roussel-gamecube-web-indigo.jpg';

    return (
        <img className='game-image' ref={ref} onClick={props.handleClick} src={imgURL} alt='404 not found' height='75%' width='75%' />
    )
})