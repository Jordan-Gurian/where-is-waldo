import './GameImage.css';
import { forwardRef } from 'react';

export default forwardRef(function GameImage(props, ref) {

    const height = '75%';
    const width  = '75%';

    return (
        <img className='game-image game' ref={ref} onClick={props.handleClick} src={props.imgURL} alt='404 not found' height={height} width={width} />
    )
})