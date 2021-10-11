import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (total, part) => total + part.exercises,
    0
  );
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Footer text={`Number of exercises ${totalExercises}`} />
    </div>
  );
};

export default Course;
