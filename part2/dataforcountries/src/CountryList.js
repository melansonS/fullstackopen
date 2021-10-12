import React, { useState, useEffect } from "react";
import axios from "axios";

const OneCountry = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((response) => setWeatherData(response.data));
  }, [country]);

  return (
    <div>
      <h4>{country.name.common}</h4>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h5>languages</h5>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common}'s flag`} />
      {weatherData && (
        <div>
          <h4>Weather in {country.capital[0]}</h4>
          <p>Temperature: {weatherData.main.temp}</p>
          <p>Wind speed: {weatherData.wind.speed}</p>
          <p>Wind deg: {weatherData.wind.deg}</p>
        </div>
      )}
    </div>
  );
};

const CountryListItem = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false);

  if (showCountry) {
    return (
      <div>
        <OneCountry country={country} />
        <button onClick={() => setShowCountry(false)}>Hide</button>
      </div>
    );
  } else {
    return (
      <div>
        {country.name.common}
        <button onClick={() => setShowCountry(true)}>Show</button>
      </div>
    );
  }
};

const CountryList = ({ countries }) => {
  if (countries.length === 1) {
    return <OneCountry country={countries[0]} />;
  }
  if (countries.length <= 10) {
    return countries.map((country) => (
      <CountryListItem key={country.area} country={country} />
    ));
  }
  return null;
};
export default CountryList;
