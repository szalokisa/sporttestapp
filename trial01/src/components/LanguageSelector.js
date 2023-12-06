import { useState, useRef, useEffect, Fragment } from 'react';
import Cookies from './Cookies';
import InputFieldSet from './InputFieldSet/InputFieldSet';

export default function LanguageSelector(props) {
    const refLangSelector = useRef()
    const [fieldValues, setFieldValues] = useState({
        LanguageSelector: props.defaultLanguage
    })

    function setLanguage(newLanguage) {
        if (fieldValues.LanguageSelector !== newLanguage) {
            setFieldValues({
                LanguageSelector: newLanguage
            });
            Cookies.set('lang', newLanguage);
            props.onLanguageChanged(newLanguage)
        }
    }

    function handleLanguageChanged(e) {
        setLanguage(e.target.value);
    }

    useEffect(() => {
        let cookies = Cookies.get();
        if (cookies.lang !== undefined) {
            setLanguage(cookies.lang);
        }
    }, [])

    return (
        <Fragment>
            <div>
                <InputFieldSet
                    reference={refLangSelector}
                    name='LanguageSelector'
                    type='select'
                    fieldValues={fieldValues}
                    optionList={props.languages}
                    handleInputBlur={handleLanguageChanged}
                    handleInputChange={handleLanguageChanged}
                    required={true}
                />
            </div>
        </Fragment>
    )
}
