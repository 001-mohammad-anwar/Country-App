import { useState, useEffect, useContext } from "react";
import Card from "./Card";
import "./CardContainer.css";
import ShimmerCardContainer from "./ShimmerCardContainer";
import { ThemeContext } from "./contexts/ThemeContext";

const CardContainer = ({ query = "" }) => {
  const [darkMode] = useContext(ThemeContext);
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("country data...", data);

        // ✅ VERY IMPORTANT CHECK
        if (Array.isArray(data)) {
          setCountryData(data);
        } else {
          setCountryData([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching countries data", err);
        setCountryData([]); // ✅ fallback
      });
  }, []);

  // ✅ SAFE FILTER
  const filteredCountryData = Array.isArray(countryData)
    ? countryData.filter(
        (country) =>
          country.name?.common
            ?.toLowerCase()
            .includes(query.toLowerCase()) ||
          country.region
            ?.toLowerCase()
            .includes(query.toLowerCase())
      )
    : [];

  return (
    <div className={`CardList ${darkMode ? "Dark" : ""}`}>
      {!countryData.length ? (
        <ShimmerCardContainer />
      ) : (
        filteredCountryData.map((country) => (
          <Card
            key={country.cca3} // ✅ better unique key
            title={country.name.common}
            image={country.flags?.svg}
            Population={country.population?.toLocaleString("en-IN")}
            region={country.region}
            Capital={country.capital?.[0] || "N/A"}
            data={country}
          />
        ))
      )}
    </div>
  );
};

export default CardContainer;
