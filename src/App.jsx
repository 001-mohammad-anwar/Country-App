
import './App.css'
import { Outlet } from "react-router";
import Header from "./Component/Header";
import { useState } from 'react';
import { ThemeContext } from './Component/contexts/ThemeContext';
function App() {
  const [darkMode , setDarkMode] = useState(JSON.parse(localStorage.getItem('isdarkMode')));
  return (
    <ThemeContext.Provider value={[darkMode , setDarkMode]}>
      <Header />
      <Outlet />
    </ThemeContext.Provider>
  );
}

export default App;
