import './GameImage.css';
import { forwardRef } from 'react';

export default forwardRef(function GameImage(props, ref) {
    return (
        <img className='game-image' ref={ref} onClick={props.handleClick} src={props.imgURL} alt='404 not found' height='75%' width='75%' />
    )
})