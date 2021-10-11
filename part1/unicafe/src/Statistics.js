import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (good || neutral || bad) {
    return (
      <table>
        <tbody>
          <StatisticLine name="good" value={good} />
          <StatisticLine name="neutral" value={neutral} />
          <StatisticLine name="bad" value={bad} />
          <StatisticLine name="all" value={all} />
          <StatisticLine name="average" value={average} />
          <StatisticLine name="positive" value={positive} percent />
        </tbody>
      </table>
    );
  }
  return <div>No feedback gathered</div>;
};

export default Statistics;
