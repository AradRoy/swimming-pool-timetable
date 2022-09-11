import './App.css';

import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom'

//Pages
import Home from "./Pages/Home"
import About from './Pages/About';
import Error from './Pages/Error';
import TimetablePage from "./Pages/TimetablePage"
import AthletePage from "./Pages/AthletePage"
import CoachesPage from "./Pages/CoachesPage"
import MainLayout from "./Pages/MainLayout";

// Components
import NavBar from './components/Navbar';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="athletes" element={<AthletePage />} />
            <Route path="coaches" element={<CoachesPage />} />
            <Route path="timetable" element={<TimetablePage />} />
            <Route path="about" element={<About />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
