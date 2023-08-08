import React from 'react';
import pencilIcon from "../icons/pencil.svg"

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    const buttonClicked = () => {
        console.log('+++ saveRenderer.js (line: 8)', props);
    };

    return (
        <span>
            <span>{cellValue}</span>&nbsp;
            <img
                className='pencilIcon'
                src={pencilIcon}
                onClick={() => buttonClicked()}
                alt="pencil"
            />

        </span>
    );
};