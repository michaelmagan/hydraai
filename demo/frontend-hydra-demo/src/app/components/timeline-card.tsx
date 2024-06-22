import React from "react";

const TimelineCard: React.FC<{
  period: string;
  events: { year: string; event: string }[];
}> = ({ period, events }) => (
  <div
    style={{
      border: "1px solid #6C757D",
      padding: "15px",
      borderRadius: "10px",
      margin: "15px 0",
      backgroundColor: "#F8F9FA",
      color: "#6C757D",
      position: "relative",
    }}
  >
    <h2 style={{ margin: "0 0 10px 0" }}>{period}</h2>
    <div
      style={{
        position: "absolute",
        left: "20px",
        top: "40px",
        bottom: "10px",
        width: "2px",
        backgroundColor: "#6C757D",
      }}
    ></div>
    <ul style={{ listStyleType: "none", paddingLeft: "40px" }}>
      {events.map((e, index) => (
        <li key={index} style={{ position: "relative", marginBottom: "20px" }}>
          <div
            style={{
              position: "absolute",
              left: "-39px",
              top: "5px",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#6C757D",
            }}
          ></div>
          <strong>{e.year}</strong>: {e.event}
        </li>
      ))}
    </ul>
  </div>
);

export default TimelineCard;
