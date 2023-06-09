import { forwardRef, useRef } from 'react';
import './DateTimePicker.scss';
import { dateAndTime } from '../../dateAndTime';

export const DateTimePicker = forwardRef((props, ref) => {

    function handleInputChangeDate(e) {
        props.onChange({
            target: {
                name: props.name,
                value: e.target.value || ''
            }
        })
    }

    function handleInputChangeTime(e) {
        props.onChange({
            target: {
                name: props.name,
                value: e.target.value || ''
            }
        })
    }

    function handleInputBlur(e) {
        props.onBlur({
            target: {
                name: props.name,
                value: e.target.value
            }
        })
    }
    return (
        <div className='date-time-picker'>
            {props.labelArea}
            {props.explanationTextArea}
            <div className='date-time-picker-input-area'>
                <div className={`date-time-picker-input-date ${props.divErrorClass}`}>
                    <input
                        type="date"
                        className={props.className}
                        id={props.name}
                        name={props.name}
                        value={`${dateAndTime.getHtmlDate(props.value)}`}
                        onChange={handleInputChangeDate}
                        onBlur={handleInputBlur}
                        ref={ref}
                    />
                    {props.divError}
                </div>

                <input
                    type="time"
                    className={`date-time-picker-input-time ${props.className}`}
                    id={`${props.name}-time}`}
                    name={`${props.name}-time}`}
                    value={`${dateAndTime.getHtmlTime(props.value)}`}
                    onChange={handleInputChangeTime}
                    onBlur={handleInputBlur}
                />
            </div>
        </div>
    )
})
