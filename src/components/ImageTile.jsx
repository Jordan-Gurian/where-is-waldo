import './ImageTile.css';
import { Link } from 'react-router-dom';

export default function ImageTile({ destURL }) {
    // This function will need to fetch images and put them in a box

    const imgURL = 'https://picsum.photos/200';

    return (
        <Link to={destURL}>
            <img className='image-tile' src={imgURL} alt='404 not found' height='200px' width='200px' />
        </Link>
    )
}

// Blogpost.propTypes = {
//     post: PropTypes.object.isRequired,
// }
