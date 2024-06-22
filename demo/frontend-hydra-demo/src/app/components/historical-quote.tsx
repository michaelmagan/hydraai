import React from "react";

const HistoricalQuote: React.FC<{
  quote: string;
  author: string;
  year: string;
}> = ({ quote, author, year }) => (
  <div
    style={{
      border: "1px solid #FFC107",
      padding: "15px",
      borderRadius: "10px",
      margin: "15px 0",
      backgroundColor: "#FFF9E6",
      color: "#FFC107",
    }}
  >
    <blockquote style={{ margin: "0 0 10px 0" }}>
      <p>{quote}</p>
      <footer>
        — {author}, {year}
      </footer>
    </blockquote>
  </div>
);

export default HistoricalQuote;
