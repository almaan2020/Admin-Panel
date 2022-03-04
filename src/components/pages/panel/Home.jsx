import React from "react";
const Home = (props) => {
  const { text, textMuted } = props;
  return (
    <h3>
      {text}
      <small className="text-muted">{textMuted}</small>
    </h3>
  );
};

export default Home;
