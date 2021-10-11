import React from "react";

const OneCountry = ({ country }) => {
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
    </div>
  );
};

const CountryList = ({ countries }) => {
  if (countries.length === 1) {
    return <OneCountry country={countries[0]} />;
  }
  if (countries.length <= 10) {
    return countries.map((country) => (
      <div key={country.area}>{country.name.common}</div>
    ));
  }
  return null;
};
export default CountryList;
