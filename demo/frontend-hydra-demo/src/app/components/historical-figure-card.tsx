import React from "react";

const HistoricalFigureCard: React.FC<{
  name: string;
  birthDate: string;
  deathDate: string;
  bio: string;
}> = ({ name, birthDate, deathDate, bio }) => (
  <div
    style={{
      border: "1px solid #28A745",
      padding: "15px",
      borderRadius: "10px",
      margin: "15px 0",
      backgroundColor: "#E6F4EA",
      color: "#28A745",
    }}
  >
    <h2 style={{ margin: "0 0 10px 0" }}>{name}</h2>
    <h4 style={{ margin: "0 0 10px 0" }}>
      {birthDate} - {deathDate}
    </h4>
    <p>{bio}</p>
  </div>
);

export default HistoricalFigureCard;
