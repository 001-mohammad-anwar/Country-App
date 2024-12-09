import { useContext, useEffect, useState } from "react";
import BackButton from "./BackButton";
import "./CountryDetails.css";
import { Link, useLocation, useOutletContext, useParams } from "react-router";
import DetailShimmer from "./DetailShimmer";
import { ThemeContext } from "./contexts/ThemeContext";

const CountryDetails = () => {
  // const [darkMode] = useOutletContext()
  const [darkMode] = useContext(ThemeContext)
  const [countryData, setCountryData] = useState(null);
  const [notfound ,  setNotfoundData] = useState(false);
  // const countryName = new URLSearchParams(location.search).get("name");
  const param = useParams();
  // console.log(param);
  const countryName = param.country;
  const {state} = useLocation();
  console.log(state);

  useEffect(() => {
      
    if(state){
       
      setCountryData({
        countryName: state.name.common,
        flag: state.flags.svg,
        nativeName: Object.values(state.name.nativeName)[0].common,
        population: state.population,
        region: state.region,
        capital: state.capital[0],
        SubRegion: state.subregion || null,
        TopLevelDomain: state.tld,
        currencies: Object.values(state.currencies)
          .map((country) => country.name)
          .join(","),
        Language: Object.values(state.languages)
          .map((countryName) => countryName)
          .join(", "),
          borders: [],
      });
      if (!state.borders) {
        state.borders = [];
      }
      {
        state.borders.map((border) => {
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderData]) => {
              setCountryData((prevState) => ({
                ...prevState,
                borders: [...prevState.borders, borderData.name.common],
              }));
            });
        });
      }
      return ;
    }
 
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => response.json())
      .then(([data]) => {
        // console.log(data);
        setCountryData({
          countryName: data.name.common,
          flag: data.flags.svg,
          nativeName: Object.values(data.name.nativeName)[0].common,
          population: data.population,
          region: data.region,
          capital: data.capital[0],
          SubRegion: data.subregion || null,
          TopLevelDomain: data.tld,
          currencies: Object.values(data.currencies)
            .map((country) => country.name)
            .join(","),
          Language: Object.values(data.languages)
            .map((countryName) => countryName)
            .join(", "),
            borders: [],
        });
        if (!data.borders) {
          data.borders = [];
        }
        {
          data.borders.map((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((res) => res.json())
              .then(([borderData]) => {
                setCountryData((prevState) => ({
                  ...prevState,
                  borders: [...prevState.borders, borderData.name.common],
                }));
              });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setNotfoundData(true);
      });
  }, [countryName]);
  
  if(notfound) {
    return (<div>{countryName} this country is Notfound</div>)
  }

  return (

    countryData === null ? <DetailShimmer/> : 
    (<main className={`${darkMode?'Dark':''}`}>
      
      <div className="DetailContainer">
      
        <span className="pre">
          <BackButton />
        </span>

        <div className="CountryDetails">
          <div className="Details">
            <div className="DetailsCountryImage">
              <img src={countryData.flag} alt="country" />
            </div>
            <div className="info">
              <h2>{countryData.countryName}</h2>
              <div className="AllInfo">
                <div className="Left">
                  <p>
                    <b>Name:</b> <span>{countryData.countryName}</span>
                  </p>
                  <p>
                    <b>Population:</b> <span>{countryData.population.toLocaleString("en-IN")}</span>
                  </p>
                  <p>
                    <b>Region:</b> <span>Asia</span>
                  </p>
                  {countryData.SubRegion && (
                    <p>
                      <b>Sub Region:</b> <span>{countryData.SubRegion}</span>
                    </p>
                  )}
                  <p>
                    <b>Capital:</b> <span>{countryData.capital}</span>
                  </p>
                </div>
                <div className="Right">
                  <div className="InnerRight">
                    <p>
                      <b>Top Level Domain:</b>{" "}
                      <span>{countryData.TopLevelDomain}</span>
                    </p>
                    <p>
                      <b>Currencies:</b> <span>{countryData.currencies}</span>
                    </p>
                    <p>
                      <b>Language:</b> <span>{countryData.Language}</span>
                    </p>
                  </div>
                  {countryData.borders.length !== 0 && (<div className="Border">
                    <b>Border Countries:</b>
                   
                    <p className="BorderCuntries">
                       {countryData.borders.map((border)=>(
                        <Link key={border} to={`/${border}`}>
                                &nbsp;{border}
                        </Link>
                       ))} 
                    </p>
                  </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>)
  );
};

export default CountryDetails;
