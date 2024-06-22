import React from "react";

const HistoricalEventCard: React.FC<{
  title: string;
  date: string;
  description: string;
}> = ({ title, date, description }) => (
  <div
    style={{
      border: "1px solid #007BFF",
      padding: "15px",
      borderRadius: "10px",
      margin: "15px 0",
      backgroundColor: "#E9F7FE",
      color: "#007BFF",
    }}
  >
    <h2 style={{ margin: "0 0 10px 0" }}>{title}</h2>
    <h4 style={{ margin: "0 0 10px 0" }}>{date}</h4>
    <p>{description}</p>
  </div>
);

export default HistoricalEventCard;
