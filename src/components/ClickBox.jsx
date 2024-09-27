import './ClickBox.css';

export default function ClickBox({ xCoord, yCoord, gameHeight }) {
    
    const borderThickness = 0.25; //rem

    const border = `${borderThickness}rem solid #011627`;

    const clickBoxScaling = 0.05;

    const height = gameHeight * clickBoxScaling; //px
    const width = gameHeight * clickBoxScaling; //px
    const top = yCoord - ((height + 32 * borderThickness) / 2); //offset by half of div height, assumes root font size of 16
    const left = xCoord - ((width + 32 * borderThickness)/ 2); //offset by half of div width, assumes root font size of 16


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