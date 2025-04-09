import React, { useEffect, useRef, useState } from "react";
import "../App.css";

function Lootbox({ items, onSpin, isSpinning, freeSpins, spinCost, onSpinComplete }) {
  const sliderRef = useRef(null);
  const [repeatedItems, setRepeatedItems] = useState([]);
  const [spinCounter, setSpinCounter] = useState(0);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Generuj pasek z przedmiotami tylko raz na start
  useEffect(() => {
    const initialRepeatedItems = [...Array(30)].flatMap(() => items);
    setRepeatedItems(initialRepeatedItems);
  }, [items]);

  // Resetuj slider po kliknięciu spin (zanim zacznie się animacja)
  useEffect(() => {
    if (isSpinning && sliderRef.current) {
      sliderRef.current.style.transition = "none";
      sliderRef.current.style.transform = "translateX(0)";
      void sliderRef.current.offsetHeight;
    }
  }, [spinCounter, isSpinning]);

  // Losowanie przedmiotu gdy rozpoczyna się spin
  useEffect(() => {
    if (isSpinning && !currentItem) {
      // Losuj przedmiot z wagą szans
      const weightedItems = items.flatMap(item => Array(item.chance).fill(item));
      const randomItem = weightedItems[Math.floor(Math.random() * weightedItems.length)];
      
      setCurrentItem(randomItem);
      setSpinCounter(prev => prev + 1);
      
      // Znajdź indeks wybranego przedmiotu
      const middleIndex = Math.floor(repeatedItems.length / 2);
      let index = repeatedItems.findIndex(item => item.id === randomItem.id);
      
      if (index === -1) {
        // Jeśli nie znaleziono, umieść przedmiot w środku
        const newRepeatedItems = [...repeatedItems];
        newRepeatedItems[middleIndex] = randomItem;
        setRepeatedItems(newRepeatedItems);
        setSelectedIndex(middleIndex);
      } else {
        setSelectedIndex(index);
      }
    }
  }, [isSpinning, items, repeatedItems, currentItem]);


// Uruchom animację przesuwania do wylosowanego indeksu
useEffect(() => {
  if (selectedIndex !== null && isSpinning && repeatedItems.length > 0 && sliderRef.current && currentItem) {
    const itemWidth = 120;
    const slider = sliderRef.current;

    const baseSpins = 3 + spinCounter % 3;
    const additionalOffset = baseSpins * repeatedItems.length * itemWidth / 30;
    const finalOffset = additionalOffset + (selectedIndex * itemWidth);

    setTimeout(() => {
      slider.style.transition = "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)";
      slider.style.transform = `translateX(-${finalOffset}px)`;
    }, 10);

    // Przechowujemy kopię przedmiotu, który będzie przekazany po zakończeniu animacji
    const itemToPass = {...currentItem};
    console.log("Wylosowany przedmiot:", itemToPass);

    const timeout = setTimeout(() => {
      // Przekaż dokładnie ten sam obiekt przedmiotu, który został wcześniej wylosowany
      onSpinComplete(itemToPass);
    }, 3000);

    return () => clearTimeout(timeout);
  }
}, [selectedIndex, isSpinning, repeatedItems, spinCounter, onSpinComplete, currentItem]);

  // Funkcja do uruchomienia spinu
  const handleSpinInternal = () => {
    if (repeatedItems.length === 0 || isSpinning) return;
    
    // Resetuj aktualny przedmiot
    setCurrentItem(null);
    setSelectedIndex(null);
    
    // Powiadom komponent nadrzędny o rozpoczęciu spinu
    onSpin();
  };

  return (
    <div className="lootbox-container">
      <div className="items-display">
        <div className="selector"></div>
        <div className="items-slider" ref={sliderRef}>
          {repeatedItems.map((item, index) => (
            <div 
              className="slider-item" 
              key={`${item.id}-${index}`}
              style={{ 
                display: "inline-block", 
                width: "100px", 
                height: "100px", 
                margin: "10px",
                textAlign: "center" 
              }}
            >
              <img 
                src={item.img} 
                alt={item.name} 
                style={{ 
                  width: "60px", 
                  height: "60px", 
                  objectFit: "contain" 
                }} 
              />
              <div 
                className="item-name" 
                style={{ 
                  fontSize: "12px", 
                  marginTop: "5px" 
                }}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <button 
          className="spin-button" 
          onClick={handleSpinInternal} 
          disabled={isSpinning}
        >
          {freeSpins > 0 ? `DARMOWY SPIN (${freeSpins})` : `LOSUJ (${spinCost})`}
        </button>
      </div>
    </div>
  );
}

export default Lootbox;