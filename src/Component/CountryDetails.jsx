import { useContext, useEffect, useState } from "react";
import BackButton from "./BackButton";
import "./CountryDetails.css";
import { Link, useLocation, useParams } from "react-router";
import DetailShimmer from "./DetailShimmer";
import { ThemeContext } from "./contexts/ThemeContext";

const CountryDetails = () => {
  const [darkMode] = useContext(ThemeContext);
  const [countryData, setCountryData] = useState(null);
  const [notfound, setNotfound] = useState(false);

  const { country } = useParams();
  const { state } = useLocation();

  const buildCountryObject = (data) => ({
    countryName: data?.name?.common || "N/A",
    flag: data?.flags?.svg || "",
    nativeName:
      data?.name?.nativeName
        ? Object.values(data.name.nativeName)[0]?.common
        : "N/A",
    population: data?.population || 0,
    region: data?.region || "N/A",
    capital: data?.capital?.[0] || "N/A",
    SubRegion: data?.subregion || null,
    TopLevelDomain: data?.tld?.join(", ") || "N/A",
    currencies: data?.currencies
      ? Object.values(data.currencies).map((c) => c.name).join(", ")
      : "N/A",
    Language: data?.languages
      ? Object.values(data.languages).join(", ")
      : "N/A",
    borders: [],
  });

  useEffect(() => {
    let ignore = false;

    const fetchBorders = async (borders = []) => {
      const names = await Promise.all(
        borders.map(async (code) => {
          const res = await fetch(
            `https://restcountries.com/v3.1/alpha/${code}`
          );
          const [data] = await res.json();
          return data?.name?.common;
        })
      );
      return names.filter(Boolean);
    };

    const loadData = async () => {
      try {
        let data;

        if (state) {
          data = state;
        } else {
          const res = await fetch(
            `https://restcountries.com/v3.1/name/${country}`
          );
          const json = await res.json();
          data = json[0];
        }

        if (!data && !ignore) {
          setNotfound(true);
          return;
        }

        const base = buildCountryObject(data);
        const borders = await fetchBorders(data?.borders);

        if (!ignore) {
          setCountryData({ ...base, borders });
        }
      } catch (err) {
        console.error(err);
        if (!ignore) setNotfound(true);
      }
    };

    loadData();
    return () => (ignore = true);
  }, [country, state]);

  if (notfound) {
    return <div>{country} country not found</div>;
  }

  if (!countryData) {
    return <DetailShimmer />;
  }

  return (
    <main className={darkMode ? "Dark" : ""}>
      <div className="DetailContainer">
        <BackButton />

        <div className="CountryDetails">
          <div className="Details">
            <div className="DetailsCountryImage">
              <img src={countryData.flag} alt={countryData.countryName} />
            </div>

            <div className="info">
              <h2>{countryData.countryName}</h2>

              <div className="AllInfo">
                <div className="Left">
                  <p><b>Name:</b> {countryData.countryName}</p>
                  <p><b>Population:</b> {countryData.population.toLocaleString("en-IN")}</p>
                  <p><b>Region:</b> {countryData.region}</p>
                  {countryData.SubRegion && (
                    <p><b>Sub Region:</b> {countryData.SubRegion}</p>
                  )}
                  <p><b>Capital:</b> {countryData.capital}</p>
                </div>

                <div className="Right">
                  <p><b>Top Level Domain:</b> {countryData.TopLevelDomain}</p>
                  <p><b>Currencies:</b> {countryData.currencies}</p>
                  <p><b>Language:</b> {countryData.Language}</p>

                  {countryData.borders.length > 0 && (
                    <div className="Border">
                      <b>Border Countries:</b>
                      <p className="BorderCuntries">
                        {countryData.borders.map((b) => (
                          <Link key={b} to={`/${b}`}> {b}</Link>
                        ))}
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CountryDetails;
