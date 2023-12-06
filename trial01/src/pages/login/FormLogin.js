import "./FormLogin.scss";
import { useRef, useState, useEffect } from "react";
import { languageElements } from "./FormLogin-languageElements";
import InputFieldSet from "../../components/InputFieldSet/InputFieldSet";
import LanguageElementsHandler from "../../components/LanguageElementsHandler";
import LoginData from "../../components/LoginData";
import axios from 'axios';
const TokenURL = `${process.env.REACT_APP_API_BASE_URL}/token`;

export default function LoginForm(props) {
  const languageElementsHandler = new LanguageElementsHandler(
    languageElements,
    props.language
  );

  const [formWasValidated, setFormWasValidated] = useState(false);

  const [errors, setErrors] = useState({
    login: "",
    pass: "",
  });

  function showMessageShortly(codeOfMessage, typeOfAlert) {
    setFormAlertText(languageElementsHandler.get(codeOfMessage));
    setFormAlertType(typeOfAlert);
    setTimeout(() => {
      setFormAlertText("");
      setFormAlertType("");
    }, 5000);
  }

  function clearAllErrors() {
    setErrors({
      login: "",
      pass: "",
    });
  }

  const [fieldValues, setFieldValues] = useState({
    login: "",
    pass: "",
  });

  const references = {
    login: useRef(),
    pass: useRef(),
  };

  const [formAlertText, setFormAlertText] = useState("");
  const [formAlertType, setFormAlertType] = useState("");

  const validators = {
    login: {
      required: isNotEmpty,
    },
    pass: {
      required: isNotEmpty,
    },
  };

  const errorTypes = {
    required: languageElementsHandler.get(`validation-required`),
  };

  function isNotEmpty(value) {
    return value !== "";
  }

  useEffect(() => {
    clearAllErrors();
  }, [props.language]);

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: fieldValues.login,
      password: fieldValues.pass,
    };
    if (isFormValid()) {
      GetToken(credentials)
    }
  }

  async function GetToken(credentials) {
    let token;
    axios.get(TokenURL, {
      header: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
      headers: credentials
    }).then((data) => {
      if (data.status !== 200) {
        throw new Error("result-nok");
      }
      return data.data;
    }).then((jsonData) => {
      let newLogin = new LoginData(jsonData.token);
      props.onLogin(newLogin);

    }).catch((err) => {
      console.log('FormLogin.js (line: 103)', err.message);
      showMessageShortly(
        err.message === "result-nok"
          ? err.message
          : "result-no-response",
        "danger"
      );
    })
    return token;
  }

  function isFormValid() {
    let isFormValid = true;
    for (const fieldName of Object.keys(fieldValues)) {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isFormValid = false;
      }
    }
    return isFormValid;
  }

  function handleInputBlur(e) {
    const fieldName = e.target.name;
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: "",
    }));

    validateField(fieldName);
  }

  function handleInputChange(e) {
    const value = e.target.value;
    const fieldName = e.target.name;
    setFieldValues({
      ...fieldValues,
      [fieldName]: value,
    });
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: "",
    }));
  }

  function validateField(fieldName) {
    const value = fieldValues[fieldName];
    let isValid = true;
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: "",
    }));
    references[fieldName].current.setCustomValidity("");

    if (validators[fieldName] !== undefined) {
      for (const [validationType, validatorFn] of Object.entries(
        validators[fieldName]
      )) {
        if (isValid) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = errorTypes[validationType];
            setErrors((previousErrors) => {
              return {
                ...previousErrors,
                [fieldName]: errorText,
              };
            });
            references[fieldName].current.setCustomValidity(errorText);
          }
        }
      }
    }
    return isValid;
  }

  return (
    <div className="login-form">
      {formAlertText && (
        <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
          {formAlertText}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        noValidate={true}
        className={`needs-validation ${formWasValidated ? "was-validated" : ""
          }`}
      >
        <InputFieldSet
          reference={references["login"]}
          name="login"
          labelText={languageElementsHandler.get(`field-login`)}
          type="text"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required={true}
        />
        <InputFieldSet
          reference={references["pass"]}
          name="pass"
          labelText={languageElementsHandler.get(`field-pass`)}
          type="password"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required={true}
        />
        <div className="button-area">
          <button type="submit" className="btn btn-success">
            {languageElementsHandler.get(`btn-login`)}
          </button>
        </div>
      </form>
    </div>
  );
}
