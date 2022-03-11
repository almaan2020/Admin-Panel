import React from "react";
const Home = (props) => {
  const { text, textMuted } = props;
  return (
    <div className="text-center p-5">
      <h3>
        {text}
        <small className="text-muted">{textMuted}</small>
      </h3>
    </div>
  );
};

export default Home;
