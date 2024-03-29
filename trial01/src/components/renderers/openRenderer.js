import React from 'react';
import subformicon from "../icons/subform.svg"

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
            <img
                className='pencilIcon'
                src={subformicon}
                onClick={() => buttonClicked()}
                alt="pencil"
            />

        </span>
    );

    // return (
    //     <span>
    //         <span>{cellValue}</span>&nbsp;
    //         <button onClick={() => buttonClicked()}>...</button>
    //     </span>
    // );
};