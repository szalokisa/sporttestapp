import { validators } from './validators/validators';

export default class SelFP {
    constructor(props) {
        this.fields = props.fields;
        this.setLanguage(props.language);
    }

    initStates() {
        return {
            formWasValidated: false,
            fieldValues: this.getDefaultValues(),
            errors: this.getEmptyFieldNames(),
        }
    }

    setLanguage(language) {
        this.language = language;
    }

    getField(fieldName) {
        return this.fields.find(field => (field.name === fieldName));
    }

    getEmptyFieldNames() {
        const result = {};

        this.fields.forEach(field => {
            result[field.name] = '';
        });

        return result;
    }

    getDefaultValues() {
        const defaultValues = {};
        this.fields.forEach(field => {
            if ('initialValue' in field) {
                defaultValues[field.name] = field.initialValue
            }
        })
        return defaultValues;
    }

    stringifyValues(fpStates) {
        return JSON.stringify(this.removeNulls(fpStates.fieldValues));
    }

    setValues(fpStates, setFpStates, data) {
        setFpStates(previousState => {
            const newState = {
                ...previousState,
                fieldValues: { ...this.getDefaultValues(), ...data },
                errors: this.getEmptyFieldNames()
            }
            return newState
        })
    }

    removeNulls(jsonData) {
        const result = {};
        Object.keys(jsonData).forEach(k => {
            if (jsonData[k] !== null || jsonData[k] !== undefined) {
                result[k] = jsonData[k];
            }
        })

        return result;
    }

    clearAllCustomValidity() {
        this.fields.forEach(field => {
            field.reference.current.setCustomValidity('');
        });
    }

    clearAllErrors(fpStates, setFpStates) {
        setFpStates(previousStates => ({
            ...previousStates,
            errors: this.getEmptyFieldNames()
        }));

        this.clearAllCustomValidity();
    }

    clearAllFields(fpStates, setFpStates) {
        setFpStates(previousStates => {
            const emptyFieldValues = { ...this.getEmptyFieldNames(), ...this.getDefaultValues() }

            return {
                ...previousStates,
                fieldValues: emptyFieldValues,
                errors: this.getEmptyFieldNames(),
            }
        });

        this.clearAllErrors(fpStates, setFpStates);
    }

    setFieldError(fieldName, errorText, setFpStates) {
        const field = this.getField(fieldName)

        if (field) {
            setFpStates((previousStates) => ({
                ...previousStates,
                errors: { ...previousStates.errors, [fieldName]: errorText }
            }));
            field.reference.current.setCustomValidity(errorText);
        }
    }

    setFieldValue(fieldName, value, setFpStates) {
        setFpStates((previousStates) => {
            const newValues = previousStates.fieldValues;
            if (value === undefined || value === null) {
                delete newValues[fieldName];
            } else {
                newValues[fieldName] = value;
            }
            return {
                ...previousStates,
                fieldValues: { ...newValues, },
                errors: { ...previousStates.errors, [fieldName]: '' }
            }
        });
    }

    validateField(fieldName, fpStates, setFpStates) {
        const field = this.getField(fieldName)

        if (!field) {
            return true;
        }

        const value = fpStates.fieldValues[fieldName];

        this.setFieldError(fieldName, '', setFpStates);

        if (!Array.isArray(field.validators)) {
            return true;
        }

        const invalid = field.validators?.find(validator => (validators.validate(field, validator, value, this.language)))
        if (invalid) {
            this.setFieldError(fieldName, validators.getErrorText(invalid), setFpStates);
            return false;
        }

        return true;
    }

    handleInputBlur(e, fpStates, setFpStates) {
        const fieldName = e.target.name;

        this.setFieldError(fieldName, '', setFpStates);
        this.validateField(fieldName, fpStates, setFpStates);
    }

    handleInputChange(e, fpStates, setFpStates) {
        const value = e.target.value;
        const fieldName = e.target.name;
        this.setFieldValue(fieldName, value, setFpStates)
    }

    isGroupValid(fpStates, setFpStates) {
        let result = true;
        this.fields.forEach(field => {
            const isFieldValid = this.validateField(field.name, fpStates, setFpStates);
            if (!isFieldValid) {
                result = false;
            }
        })
        return result;
    }
}
