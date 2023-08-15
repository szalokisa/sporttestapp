import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    const buttonClicked = () => {
        if (props.form === 'Child1') {
            props.setView('CHILD');
        }
        if (props.form === 'Child2') {
            props.setView('CHILD2');
        }
    };

    return (
        <span>
            <span>{cellValue}</span>&nbsp;
            <button onClick={() => buttonClicked()}>...</button>
        </span>
    );
};