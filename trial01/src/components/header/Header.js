import './Header.scss';
import stopwatchpng from './stopwatch.png'
import LanguageSelector from '../LanguageSelector';
import LoggedUser from '../loggedUser/LoggedUser';
import TokenExpirationMessage from '../tokenExpirationMessage/TokenExpirationMessage';
import { Fragment } from 'react';

export default function Header(props) {
  function onLanguageChanged(newLanguage) {
    props.onLanguageChanged(newLanguage);
  }

  function onLogout() {
    props.onLogout();
  }

  return (
    <header>
      <div className="main-header">
        <div className="logo-area">
          <img
            className="header-logo"
            src={stopwatchpng}
            height="100px"
            alt="logo"
          />
        </div>

        <div className="loggedUser-and-languagePicker">
          {props.loginData?.get().user && (
            <LoggedUser
              language={props.language}
              loginData={props.loginData}
              onLogout={onLogout}
            />
          )}

          <LanguageSelector
            languages={[
              { value: "en", text: "en" },
              { value: "de", text: "de" },
              { value: "hu", text: "hu" },
            ]}
            defaultLanguage={props.language}
            onLanguageChanged={(newLanguage) => {
              onLanguageChanged(newLanguage);
            }}
          />
        </div>
      </div>

      <TokenExpirationMessage
        language={props.language}
        loginData={props.loginData}
        onExtendToken={newToken => props.onExtendToken(newToken)}
        onLogout={onLogout}
      />
    </header>
  );
}
