import { useState } from 'react';
import './App.scss';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/startpage/startPage';
import LoginPage from './pages/login/loginPage';
import ExercisesPage from './pages/exercises/ExercisesPage';
import Proba from './pages/proba/proba';

function App() {
  const [language, setLanguage] = useState('hu');
  const [token, setToken] = useState();
  const [sportAbilitiesComboData, setSportAbilitiesComboData] = useState();
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
