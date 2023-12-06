import React from 'react';
import checkboxicon from "../icons/checkbox.svg"
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    const buttonClicked = () => {
        console.log('saveRenderer.js (line: 8)', props);
    };

    return (
        <span>
            <span>{cellValue}</span>&nbsp;
            <img
                className='pencilIcon'
                src={checkboxicon}
                onClick={() => buttonClicked()}
                alt="pencil"
            />

        </span>
    );
};