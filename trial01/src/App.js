import { useState, Fragment } from 'react';
import './App.scss';
import Navbar from './components/navbar/Navbar';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginData from './components/LoginData';
import PageLogin from './pages/login/PageLogin';
import ExercisesPage from './pages/exercises/ExercisesPage';
import Proba from './pages/proba/proba';
import SportAbilitiesPage from './pages/sportabilities/SportAbilitiesPage';
import OrganisationsPage from './pages/organisations/OrganisationsPage';
import PersonsPage from './pages/persons/PersonsPage';
import TestTemplatesPage from './pages/testtemplates/TestTemplatesPage';
import TestPage from './pages/tests/TestPage';
import Statistics from './pages/statistics/pageStatistics';

function App() {
  const [language, setLanguage] = useState('hu');
  const [loginData, setLoginData] = useState(null);

  const [sportAbilitiesComboData, setSportAbilitiesComboData] = useState();
  const [unitComboData, setUnitComboData] = useState();
  const [gendersComboData, setGendersComboData] = useState();
  const [organisationsComboData, setOrganisationsComboData] = useState();
  const [exercisesComboData, setExercisesComboData] = useState();
  const [personsComboData, setpersonsComboData] = useState();
  const [testTemplatesComboData, settestTemplatesComboData] = useState();

  function onLanguageChanged(newLanguage) {
    setLanguage(newLanguage);
  }

  function onLogout() {
    setLoginData(null);
  }

  function onExtendToken(newToken) {
    if (!newToken) {
      onLogout();
      return;
    }
    let newLogin = new LoginData(newToken);
    setLoginData(newLogin);
  }

  function onLogin(newLoginData) {
    setLoginData(newLoginData);
  }

  function setActivity() {
    if (loginData) {
      loginData.setLastActivity();
    }
  }

  if (!loginData) {
    return (
      <BrowserRouter>
        <Header
          language={language}
          onLanguageChanged={(newLanguage) => onLanguageChanged(newLanguage)}
          loginData={loginData}
          onExtendToken={(newToken) => onExtendToken(newToken)}
          onLogout={onLogout}
        />

        <Routes>
          <Route path="/login" element={
            <PageLogin
              language={language}
              onLogin={(newLogin) => onLogin(newLogin)}
              setSportAbilitiesComboData={setSportAbilitiesComboData}
              setUnitComboData={setUnitComboData}
              setGendersComboData={setGendersComboData}
              setOrganisationsComboData={setOrganisationsComboData}
              setExercisesComboData={setExercisesComboData}
              setpersonsComboData={setpersonsComboData}
              settestTemplatesComboData={settestTemplatesComboData}
            />
          } />

          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <div className="App" onMouseDown={setActivity} onKeyDown={setActivity}>
      <BrowserRouter>
        <Header
          language={language}
          onLanguageChanged={(newLanguage) => onLanguageChanged(newLanguage)}
          loginData={loginData}
          onExtendToken={(newToken) => onExtendToken(newToken)}
          onLogout={onLogout}
        />
        <Fragment>
          <div className='navbar-area'>
            <Navbar
              language={language}
              loginData={loginData}
            />
          </div>
          <div className='App-body'>
            <Routes>
              <Route path="/exercises" element={
                <ExercisesPage
                  language={language}
                  loginData={loginData}
                  sportAbilitiesComboData={sportAbilitiesComboData}
                  unitComboData={unitComboData}
                />
              } />
              <Route path="/sportabilities" element={
                <SportAbilitiesPage
                  language={language}
                  loginData={loginData}
                // sportAbilitiesComboData={sportAbilitiesComboData}
                // unitComboData={unitComboData}
                />
              } />
              <Route path="/persons" element={
                <PersonsPage
                  language={language}
                  gendersComboData={gendersComboData}
                  loginData={loginData}
                  organisationsComboData={organisationsComboData}
                />
              } />
              <Route path="/organisations" element={
                <OrganisationsPage
                  language={language}
                  loginData={loginData}
                />
              } />
              <Route path="/testtemplates" element={
                <TestTemplatesPage
                  language={language}
                  loginData={loginData}
                  exercisesComboData={exercisesComboData}
                />
              } />
              <Route path="/tests" element={
                <TestPage
                  language={language}
                  loginData={loginData}
                  personsComboData={personsComboData}
                  testTemplatesComboData={testTemplatesComboData}
                />
              } />
              <Route path="/statistics" element={
                <Statistics
                  language={language}
                  loginData={loginData}
                />
              } />
            </Routes>
          </div>
        </Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
