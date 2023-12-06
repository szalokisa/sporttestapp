import { DateTimePicker } from './dateTimePicker/DateTimePicker';
// import {T_ableSelect } from './t_ableSelect/T_ableSelect';


export default function InputFieldSet(
  {
    loginData, language, errors, fieldValues, handleInputChange, handleInputBlur, type, name, labelText, explanationText, link, linkText, reference, optionList, readOnly, tabIndex, className
  }) {
  let labelArea;
  let explanationTextArea;
  let linkArea;
  let input;
  let customisedInput;
  let options;
  let divError;
  let divErrorClass = '';
  let tabIndexWithLogic = (readOnly) ? -1 : tabIndex;

  if (labelText !== undefined) {
    labelArea = <label htmlFor={name} className="form-label">{labelText}</label>
    if (explanationText) {
      explanationTextArea = <label className="form-label explanationText">{explanationText}</label>
    }
    if (link) {
      linkArea = <a href={link} rel='noreferrer' target='_blank'>{(linkText) ? linkText : link}</a>
    }
  }

  if (errors !== undefined) {
    divErrorClass = `${className || 'mb-3'} ${errors[name] !== '' ? "was-validated" : ""}`
    divError = <div className="invalid-feedback">
      {errors[name]}
    </div>
  }

  switch (type) {
    case "select":
      if (optionList !== undefined) {
        options = optionList.map(option => {
          return (<option key={`option-${option.value}`} value={option.value}>{option.text}</option>)
        });
      }

      input = <select
        className="form-select"
        id={name}
        name={name}
        value={fieldValues[name]}
        readOnly={(readOnly)}
        tabIndex={tabIndexWithLogic}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        ref={reference}
      >
        {options}
      </select>
      break;

    case "radio":
      if (optionList === undefined) {
        input = <div ref={reference}>{`InputFieldSet - radio: options are not defined!`}</div>
      } else {
        input = <div ref={reference} className="radio-group">
          {optionList.map(option => {
            return (
              <div className="form-check" key={option.value}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={name}
                  value={option.value}
                  id={`${name}-${option.name}`}
                  checked={(fieldValues[name] === option.value)}
                  onChange={(e) => {
                    handleInputChange({
                      target: {
                        name: name,
                        value: option.value
                      }
                    }
                    )
                  }}
                />

                <label className="form-check-label" htmlFor={option.name}>
                  {option.text}
                </label>
              </div>
            )
          })}
        </div>
      }
      break;

    case "textarea":
      input = <textarea
        className="form-control"
        id={name}
        name={name}
        value={fieldValues[name]}
        readOnly={(readOnly)}
        tabIndex={tabIndexWithLogic}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        ref={reference}
      >
        {options}
      </textarea>
      break;

    case "checkbox":
      input = <input
        className="form-check-input"
        id={name}
        name={name}
        type={type}
        readOnly={(readOnly)}
        tabIndex={tabIndexWithLogic}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        ref={reference}
        checked={(fieldValues[name])}
      >
        {options}
      </input>
      break;

    case "dateTime":
      customisedInput = <DateTimePicker
        type={type}
        className="form-control"
        id={name}
        name={name}
        value={fieldValues[name] || ''}
        readOnly={(readOnly)}
        tabIndex={tabIndexWithLogic}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        ref={reference}
        labelArea={labelArea}
        explanationTextArea={explanationTextArea}
        divError={divError}
        divErrorClass={divErrorClass}
      />
      break;

    default:
      input = <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        value={fieldValues[name] || ''}
        readOnly={(readOnly)}
        tabIndex={tabIndexWithLogic}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        ref={reference}
      />

      break;
  }

  if (type === 'checkbox') {
    return (
      <div className={divErrorClass}>
        {input}
        {labelArea}
        {explanationTextArea}
        {linkArea}
        {divError}
      </div>
    );
  }

  if (type === 'dateTime') {
    return customisedInput;
  }

  if (type === 'tableSelect') {
    return customisedInput;
  }

  if (type === 'radio') {
    return (
      <div className={divErrorClass}>
        {input}
        {divError}
      </div>
    );
  }

  return (
    <div className={divErrorClass}>
      {labelArea}
      {explanationTextArea}
      {input}
      {divError}
    </div>
  );
}