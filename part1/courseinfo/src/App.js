import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Footer
        text={`Number of exercises ${
          course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises
        }`}
      />
    </div>
  );
};

export default App;
