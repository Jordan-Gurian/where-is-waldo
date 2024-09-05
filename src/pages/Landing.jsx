import './Landing.css'
import ImageTile from './../components/ImageTile'

function Landing() {
    return (
        <main className='all-image-tiles'>
            <ImageTile destURL='./game/1' />
            <ImageTile destURL='./game/2'/>
            <ImageTile destURL='./game/3'/>
        </main>
    )
}

export default Landing;