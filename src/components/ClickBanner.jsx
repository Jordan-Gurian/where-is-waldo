import './ClickBanner.css'

export default function ClickBanner({ found }) {
    

    if (found) {
        return (
            <div className='char-found'>You found a character!</div>
        )
    } else {
        return (
            <div className='char-missed'>Wrong! That is not a character!</div>
        )
    }
}