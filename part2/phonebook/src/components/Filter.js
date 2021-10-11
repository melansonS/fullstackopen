import React from "react";

const Filter = ({ searchValue, setSearchValue }) => {
  return (
    <div>
      filter shown with
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
    </div>
  );
};

export default Filter;
