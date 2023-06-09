import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    const buttonClicked = () => {
        console.log('+++ deleteRenderer.js (line: 8)',props);
    };

    return (
        <span>
            <span>{cellValue}</span>&nbsp;
            <button onClick={() => buttonClicked()}>Adat törlése</button>
        </span>
    );
};