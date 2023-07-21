import { useState } from 'react';
import './App.scss';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/startpage/startPage';
import LoginPage from './pages/login/loginPage';
import ExercisesPage from './pages/exercises/ExercisesPage';
import Proba from './pages/proba/proba';
import SportAbilitiesPage from './pages/sportabilities/SportAbilitiesPage';
import OrganisationsPage from './pages/organisations/OrganisationsPage';
import PersonsPage from './pages/persons/PersonsPage';

function App() {
  const [language, setLanguage] = useState('hu');
  const [token, setToken] = useState();
  const [sportAbilitiesComboData, setSportAbilitiesComboData] = useState();
  const [gendersComboData, setGendersComboData] = useState();
  const [organisationsComboData, setOrganisationsComboData] = useState();
  const [unitComboData, setUnitComboData] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <div className='navbar-area'>
            <Navbar />
          </div>
        </header>
        <div className='App-body'>
          <Routes>
            <Route path="/" element={
              <StartPage
                language={language}
                setToken={setToken}
              />
            } />
            <Route path="/login" element={
              <LoginPage
                language={language}
                setToken={setToken}
                token={token}
                setSportAbilitiesComboData={setSportAbilitiesComboData}
                setUnitComboData={setUnitComboData}
                setOrganisationsComboData={setOrganisationsComboData}
                setGendersComboData={setGendersComboData}
              />
            } />
            <Route path="/logout" element={
              <StartPage
                language={language}
                setToken={setToken}
              />
            } />
            <Route path="/exercises" element={
              <ExercisesPage
                language={language}
                setToken={setToken}
                token={token}
                sportAbilitiesComboData={sportAbilitiesComboData}
                unitComboData={unitComboData}
              />
            } />
            <Route path="/sportabilities" element={
              <SportAbilitiesPage
                language={language}
                setToken={setToken}
                token={token}
                sportAbilitiesComboData={sportAbilitiesComboData}
                unitComboData={unitComboData}
              />
            } />
            <Route path="/persons" element={
              <PersonsPage
                language={language}
                setToken={setToken}
                token={token}
                gendersComboData={gendersComboData}
                organisationsComboData={organisationsComboData}
                unitComboData={unitComboData}
              />
            } />
            <Route path="/organisations" element={
              <OrganisationsPage
                language={language}
                setToken={setToken}
                token={token}
              />
            } />
            <Route path="/proba" element={
              <Proba
                language={language}
              />
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
