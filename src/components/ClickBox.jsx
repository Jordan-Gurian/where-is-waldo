import './ClickBox.css';

export default function ClickBox({ xCoord, yCoord, active }) {
    
    const borderThickness = 2; //px

    const border = `${borderThickness}px solid black`;
    const height = 50; //px
    const width = 50; //px
    const top = yCoord - ((height + 2 * borderThickness) / 2); //offset by half of div height
    const left = xCoord - ((width + 2 * borderThickness)/ 2); //offset by half of div width

    const opacity = active ? 1 : 0;

    return (
        <div className='click-box' style={
            {
                border,
                top, 
                left, 
                height,
                width,
                opacity
            }
        }>
        </div>
    )
}