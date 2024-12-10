import { useState, useEffect, useContext } from 'react';
import Card from './Card';
import './CardContainer.css';
import ShimmerCardContainer from './ShimmerCardContainer';
import { ThemeContext } from './contexts/ThemeContext';

const CardContainer = ({ query }) => {
  const [darkMode] = useContext(ThemeContext);
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then((data) => {
        // console.log(data);
        setCountryData(data);
      })
      .catch((err) => {
        console.log("Error fetching countries data");
      });
  }, []);

  // Filter country data based on the query (case-insensitive)
  const filteredCountryData = countryData.filter((country) => 
    country.name.common.toLowerCase().includes(query.toLowerCase()) ||
    country.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`CardList ${darkMode ? 'Dark' : ''}`}>
      {/* Show shimmer loader if no data is available */}
      {!countryData.length ? (
        <ShimmerCardContainer />
      ) : (
        filteredCountryData.map((country) => (
          <Card
            key={country.name.common}  // Use a unique identifier for key
            title={country.name.common}
            image={country.flags.svg}
            Population={country.population?.toLocaleString("en-IN") || 'N/A'}
            region={country.region}
            Capital={country.capital ? country.capital[0] : 'N/A'}
            data={country}
          />
        ))
      )}
    </div>
  );
};

export default CardContainer;
