import React from "react";

const StatisticLine = ({ name, value, percent }) => {
  return (
    <tr>
      <td>{name} </td>
      <td>
        {value} {percent && "%"}
      </td>
    </tr>
  );
};

export default StatisticLine;
