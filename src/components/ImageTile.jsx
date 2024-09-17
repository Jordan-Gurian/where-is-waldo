import './ImageTile.css';

export default function ImageTile({ gameId, name, imgURL, onClickHook }) {
    return (
        <div className='image-tile-container'>
            <img className='image-tile' src={imgURL} alt='404 not found' height='200px' width='200px' onClick={() => onClickHook(gameId)} />
            <div className='image-tile-label'>{name}</div>
        </div>
    )
}
