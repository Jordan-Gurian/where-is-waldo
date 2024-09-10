import './ImageTile.css';

export default function ImageTile({ id, onClickHook }) {
    // This function will need to fetch images and put them in a box

    const imgURL = 'https://picsum.photos/200';

    return (
        <img className='image-tile' src={imgURL} alt='404 not found' height='200px' width='200px' onClick={() => onClickHook(id)} />
    )
}
