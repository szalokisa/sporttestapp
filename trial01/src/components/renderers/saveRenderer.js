import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    const buttonClicked = () => {
        console.log('+++ saveRenderer.js (line: 8)', props);
        // props.saveData(props.data);
    };

    return (
        <span>
            <span>{cellValue}</span>&nbsp;
            <button onClick={() => buttonClicked()}>...</button>
        </span>
    );
};