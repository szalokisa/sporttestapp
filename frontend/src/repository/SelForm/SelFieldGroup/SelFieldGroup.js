import InputFieldSet from '../../InputFieldSet/InputFieldSet';

export default function SelFieldGroup(props) {
    const fieldList = props.fields.map(field => (
        <InputFieldSet
            reference={field.reference}
            key={`${props.groupName}-${field.name}`}
            name={field.name}
            labelText={field.labelText}
            explanationText={field.explanationText}
            type={field.type || 'text'}
            link={field.link}
            linkText={field.linkText}
            optionList={field.optionList}
            errors={props.fpStates.errors}
            fieldValues={props.fpStates.fieldValues}
            handleInputBlur={props.handleInputBlur}
            handleInputChange={props.handleInputChange}
        />))

    return (
        <div className={props.groupName}>
            {fieldList}
        </div>
    )
}
