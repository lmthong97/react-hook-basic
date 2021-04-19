//rsfp
import React, { useState } from 'react';
import './ColorBox.scss'

ColorBox.propTypes = {
    
};

function getRandomColor() {
    const COLOR_LIST = ['deeppink', 'green', 'yellow', 'orange', 'blue', 'purple', 'black'];
    const randomIndex = Math.trunc(Math.random() * COLOR_LIST.length);
    return COLOR_LIST[randomIndex];
}

function ColorBox() {

    const [color, setColor] = useState( () => {
        const initColor = localStorage.getItem('box_color') || 'deeppink';
        console.log(initColor);
        return initColor;
    });

    function handleBoxClick(){
        //get random color
        const newColor = getRandomColor();
        setColor(newColor);


        localStorage.setItem('box_color',newColor);
    }

    return (
        <div className="color-box" 
        style={{ backgroundColor: color }}
        onClick={handleBoxClick}
        >
           
        </div>
    );
}

export default ColorBox;