import React from "react";

function ResultModal({ result, onClose }) {
  if (!result) return null;

  return (
    <div className="result-container show" onClick={onClose}>
      <div className="result-item">
        <img src={result.img} alt={result.name} />
        <div className="result-name">{result.name}</div>
        <div className={`result-rarity ${result.rarity}`}>{result.rarity}</div>
      </div>
    </div>
  );
}

export default ResultModal;