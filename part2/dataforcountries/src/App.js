import React, { useEffect, useState } from "react";
import axios from "axios";

import CountryList from "./CountryList";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    setCountriesToShow(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, setCountriesToShow, countries]);
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);
  return (
    <div className="App">
      <div>
        find countries
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>
      </div>
      <CountryList countries={countriesToShow} />
    </div>
  );
}

export default App;
