import './ClickBox.css';

export default function ClickBox({ xCoord, yCoord, gameHeight }) {
    
    const borderThickness = 2; //px

    const border = `${borderThickness}px solid black`;

    const clickBoxScaling = 0.05;

    const height = gameHeight * clickBoxScaling; //px
    const width = gameHeight * clickBoxScaling; //px
    const top = yCoord - ((height + 2 * borderThickness) / 2); //offset by half of div height
    const left = xCoord - ((width + 2 * borderThickness)/ 2); //offset by half of div width


    return (
        <div className='click-box' style={
            {
                border,
                top, 
                left, 
                height,
                width,
            }
        }>
        </div>
    )
}