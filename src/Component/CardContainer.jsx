import { useState, useEffect, useContext } from 'react';
import Card from './Card';
import './CardContainer.css';
import ShimmerCard from './ShimmerCard';
import ShimmerCardContainer from './ShimmerCardContainer';
import { useOutletContext } from 'react-router';
import { ThemeContext } from './contexts/ThemeContext';

const CardContainer = ({query}) => {
  const [darkMode] = useContext(ThemeContext)
  // console.log(a)
  // const [darkMode] = useOutletContext()
  // console.log(theme)
  const [countryData , setCountryData] = useState([]);
  
 
//  if(countryData === 0){
//   fetch("https://restcountries.com/v3.1/all")
//   .then(response => response.json())
//   .then((data)=>{
//     setCountryData(data);
//   }).catch((err) => {
//     console.log("Error featiching countries data",err);
//   });
//  }

 useEffect(() =>{
  fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then((data)=>{
    setCountryData(data);
  }).catch((err) => {
    console.log("Error featiching countries data",err);
  });
  
  return (()=>{
    console.log("clean up function called");
  })

 },[])
   
// const cardItems = new Array(24).fill(null);
// const FilterCountryData = country.filter((country) => country.name.common.toLowerCase().includes('india'))
// console.log(FilterCountryData);

  return (
    <>
    <div className={`CardList ${darkMode ? 'Dark' : ''}`}>
      {!countryData.length?<ShimmerCardContainer/>:countryData.filter((country) =>
              country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)
            ).map((element, index) => (
        <Card key={index} 
          title = {element.name.common}
          image = {element.flags.svg}
          Population= {element.population.toLocaleString("en-IN")}
          region = {element.region}
          Capital = {element.capital}
          data = {element}
        />
      ))}
    </div>
    </>
  );
};

export default CardContainer;
