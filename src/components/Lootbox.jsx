import React, { useRef } from "react";

function Lootbox({ onSpin, isSpinning, freeSpins, spinCost }) {
  const itemsSliderRef = useRef(null);

  return (
    <div className="lootbox-container">
      <div className="items-display">
        <div className="selector"></div>
        <div className="items-slider" ref={itemsSliderRef}>
          {[...Array(15)].map((_, index) => (
            <img
              key={index}
              src={`/assets/items/item-${(index % 5) + 1}.png`}
              alt={`item-${index}`}
              className="spinning-icon"
            />
          ))}
        </div>
      </div>

      <div className="controls">
        <button className="spin-button" onClick={onSpin} disabled={isSpinning}>
          {freeSpins > 0 ? `DARMOWY SPIN (${freeSpins})` : `LOSUJ (${spinCost})`}
        </button>
      </div>
    </div>
  );
}

export default Lootbox;