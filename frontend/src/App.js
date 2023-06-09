import { useState } from 'react';
import './App.scss';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/startpage/startPage';
import LoginPage from './pages/login/loginPage';
import PersonsPage from './pages/persons/PersonsPage';
import OrganisationsPage from './pages/organisations/OrganisationsPage';
import SportAbilitiesPage from './pages/sportabilities/SportAbilitiesPage';
import ExercisesPage from './pages/exercises/ExercisesPage';
import TestSubPage from './pages/testsubpage/TestSubPage';

function App() {
  const [language, setLanguage] = useState('hu');
  const [token, setToken] = useState();
  const [clubComboData, setClubComboData] = useState();
  const [sportAbilitiesComboData, setSportAbilitiesComboData] = useState();

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
                setClubComboData={setClubComboData}
                setSportAbilitiesComboData={setSportAbilitiesComboData}
              />
            } />
            <Route path="/logout" element={
              <StartPage
                language={language}
                setToken={setToken}
              />
            } />
            <Route path="/persons" element={
              <PersonsPage
              language={language}
              token={token}
              setClubComboData={setClubComboData}
              clubComboData={clubComboData}
            />
            } />
            <Route path="/sportabilities" element={
              <SportAbilitiesPage
              language={language}
              setToken={setToken}
              token={token}
              setSportAbilitiesComboData={setSportAbilitiesComboData}
            />
            } />
            <Route path="/organisations" element={
              <OrganisationsPage
              language={language}
              setToken={setToken}
              token={token}
              setClubComboData={setClubComboData}
            />
            } />
            <Route path="/exercises" element={
              <ExercisesPage
              language={language}
              setToken={setToken}
              token={token}
              setSportAbilitiesComboData={setSportAbilitiesComboData}
              sportAbilitiesComboData={sportAbilitiesComboData}
            />
            } />
            <Route path="/testsub" element={
              <TestSubPage
              language={language}
              setToken={setToken}
              token={token}
            />
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
