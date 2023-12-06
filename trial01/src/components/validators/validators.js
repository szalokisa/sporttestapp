import validator from 'validator';
import LanguageElementsHandler from '../LanguageElementsHandler';
import { languageElements as validatorLanguageElements } from './validators-languageElements';

const languageElementsHandler = new LanguageElementsHandler(validatorLanguageElements);

export const validators = {
    roundDigitOk(value, digit) {
        const numericValue = parseFloat(value);

        switch (digit) {
            case 0:
                return (validator.isInt(value.toString()));

            case 2:
                return (Math.abs(numericValue - Math.round(100 * numericValue) / 100) < 0.000001)

            case 3:
                return (Math.abs(numericValue - Math.round(1000 * numericValue) / 1000) < 0.000001)

            case 4:
                return (Math.abs(numericValue - Math.round(10000 * numericValue) / 10000) < 0.000001)

            default:
                return false;
        }
    },

    validateFloat(value, numberOfDigits, errorText) {
        if (value === null || value === undefined) {
            return '';
        }
        if (value.toString().length === 0) {
            return '';
        }
        if (!validator.isNumeric(value.toString())) {
            return errorText;
        }
        const numericValue = parseFloat(value);
        if (numericValue < 0) {
            return errorText;
        }

        if (!this.roundDigitOk(value, numberOfDigits)) {
            return errorText;
        }
        return '';
    },

    validateRegex(value, regexExpression, length, errorText) {
        if (!value) {
            return '';
        }
        if (length) {
            if (value.length !== length) {
                return errorText;
            }
        }
        return (regexExpression.test(value)) ? '' : errorText;
    },

    validate(typeOfValidation, value, language) {
        languageElementsHandler.setLanguage(language);
        const errorText = languageElementsHandler.get(typeOfValidation);
        switch (typeOfValidation) {
            case 'required':
                if (value === null || value === undefined || value === '---') {
                    return errorText;
                }
                switch (typeof (value)) {
                    case 'number':
                        return '';

                    default:
                        return (validator.isEmpty(value)) ? errorText : '';
                }

            case 'validEmail':
                return (validator.isEmail(value)) ? '' : errorText;

            case 'validWagonNr':
                return this.validateRegex(value, /\d\d\s\d\d\s\d\d\d\d\s\d\d\d-\d/, 16, errorText)

            case 'validStationsCode':
                return this.validateRegex(value, /\d\d\-\d\d\d\d\d\d/, 9, errorText)

            case 'float2':
                return this.validateFloat(value, 2, errorText)

            case 'float4':
                return this.validateFloat(value, 4, errorText)

            case 'float':
                return this.validateFloat(value, 3, errorText)

            case 'int':
                return this.validateFloat(value, 0, errorText)

            case 'not_0':
                if (value === null || value === undefined) {
                    return '';
                }
                if (validator.isFloat(value.toString())) {
                    if (Math.abs(parseFloat(value)) < 0.001) {
                        return errorText;
                    }
                }
                return '';

            default:
                return `Unknown type of validation (${typeOfValidation})`;
        }
    },

    getErrorText(typeOfValidation) {
        return languageElementsHandler.get(typeOfValidation);
    }
}
