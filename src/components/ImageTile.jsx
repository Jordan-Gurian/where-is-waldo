import './ImageTile.css';

export default function ImageTile({ gameId, name, imgURL, onClickHook }) {
    return (
        <div className='image-tile-container' onClick={() => onClickHook(gameId)}>
            <img className='image-tile' src={imgURL} alt='404 not found'/>
            <div className='image-tile-label'>{name}</div>
        </div>
    )
}
