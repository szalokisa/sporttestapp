import { forwardRef, useRef } from 'react';
import './DateTimePicker.scss';
import { dateAndTime } from './dateAndTime';
import { listOfZones } from './listOfZones';

export const DateTimePicker = forwardRef((props, ref) => {
    const refTime = useRef();
    const refZone = useRef();

    function handleInputChange() {
        const currentValue = dateAndTime.getDateFromHtml(ref.current.value, refTime.current.value, refZone.current.value);

        props.onChange({
            target: {
                name: props.name,
                value: currentValue,
            }
        })
    }

    function handleInputBlur(e) {
        const currentValue = dateAndTime.getDateFromHtml(ref.current.value, refTime.current.value, refZone.current.value);

        props.onBlur({
            target: {
                name: props.name,
                value: currentValue,
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
                        readOnly={(props.readOnly)}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        ref={ref}
                    />
                    {props.divError}
                </div>

                <input
                    type="time"
                    className={`date-time-picker-input-time ${props.className}`}
                    id={`${props.name}-time`}
                    name={`${props.name}-time`}
                    value={`${dateAndTime.getHtmlTime(props.value)}`}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    ref={refTime}
                />

                <select
                    className={`form-select date-time-picker-input-zone ${props.className}`}
                    id={`${props.name}-zone`}
                    name={`${props.name}-zone`}
                    value={`${dateAndTime.getHtmlZone(props.value)}`}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    ref={refZone}
                >
                    {listOfZones.map(zone => (<option key={`zone-${zone.offset}`} value={zone.offsetTime}>{zone.name}</option>))}
                </select>

            </div>
        </div>
    )
})
