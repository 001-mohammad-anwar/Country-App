import React, { useContext, useEffect, useState } from "react";
import './Header.css'
import { Link } from "react-router";
import { ThemeContext } from "./contexts/ThemeContext";
const Header = ({theme}) => {

  // const [darkMode , setDarkMode] = theme
  const [darkMode , setDarkMode] = useContext(ThemeContext)



  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('isdarkMode', !darkMode);
  }
// console.log(JSON.parse(localStorage.getItem('isdarkMode')));
  // useEffect(() => {
  //   if (darkMode) {
  //     document.body.classList.add('Dark');
  //     document.querySelector('header').classList.add('Dark');
  //     document.querySelector('.CardList').classList.add('Dark');

  //   } else {
  //     document.body.classList.remove('Dark');
  //     document.querySelector('header').classList.remove('Dark');
  //     document.querySelector('.CardList').classList.remove('Dark');
  //   }
  // }, [darkMode])

  return (
    <>
      <header className={`${darkMode?'Dark':''}`}>
        <div className="headerBox">
          <div className="text">
            <h2>
              <Link to="/">Where in the world?</Link>
            </h2>
          </div>
          <div  onClick={()=>{
            handleDarkMode();
          }}>
            <span>
              <i className={`fa-solid ${darkMode?'fa-sun':'fa-moon'}`}></i>
            </span>
            &nbsp;{darkMode ? 'Light Mode': 'Dark Mode'}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
