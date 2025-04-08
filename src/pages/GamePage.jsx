import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebase";
// import { signOut, onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Header from "../components/Header";
import StatsBar from "../components/StatsBar";
import Lootbox from "../components/Lootbox";
import ResultModal from "../components/ResultModal";

{/* function GamePage() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(1000);
  const [freeSpins, setFreeSpins] = useState(0);
  const [multiplier, setMultiplier] = useState(1.0);
  const [rank, setRank] = useState("Początkujący");
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinCost = 100;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            balance: 1000,
            freeSpins: 0,
            multiplier: 1.0,
            rank: "Początkujący"
          });
        } else {
          const data = userSnap.data();
          setBalance(data.balance);
          setFreeSpins(data.freeSpins);
          setMultiplier(data.multiplier);
          setRank(data.rank);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSpin = async () => {
    if (isSpinning || (!freeSpins && balance < spinCost)) return;

    setIsSpinning(true);
    if (freeSpins > 0) {
      setFreeSpins(freeSpins - 1);
    } else {
      setBalance(balance - spinCost);
    }

    navigator.vibrate?.([100, 50, 100]);

    // Symulacja wylosowanego przedmiotu
    const item = {
      name: "Miecz Smogorożca",
      rarity: "legendary",
      value: 5000,
      img: "/api/placeholder/60/60"
    };

    setTimeout(() => {
      const newBalance = balance + Math.floor(item.value * multiplier);
      setResult(item);
      setBalance(newBalance);
      setMultiplier((prev) => Math.min(5.0, Math.round((prev + 0.5) * 10) / 10));
      setRank("Legenda");
      setIsSpinning(false);

      updateDoc(doc(db, "users", user.uid), {
        balance: newBalance,
        freeSpins: freeSpins > 0 ? freeSpins - 1 : 0,
        multiplier,
        rank: "Legenda"
      });
    }, 3000);
  };

  if (!user) return null;

  return (
    <div className="app-container">
      <Header onLogout={handleLogout} />
      <StatsBar
        balance={balance}
        freeSpins={freeSpins}
        multiplier={multiplier}
        rank={rank}
      />
      <Lootbox
        onSpin={handleSpin}
        isSpinning={isSpinning}
        freeSpins={freeSpins}
        spinCost={spinCost}
      />
      <ResultModal result={result} onClose={() => setResult(null)} />
      <footer>Metin2 Treasure Rush © 2025 - Symulator Skrzynek</footer>
    </div>
  );
}

export default GamePage; */}


function GamePage() {
  const [balance, setBalance] = useState(1000);
  const [freeSpins, setFreeSpins] = useState(0);
  const [multiplier, setMultiplier] = useState(1.0);
  const [rank, setRank] = useState("Początkujący");
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinCost = 100;

  const handleLogout = () => {
    alert("Wylogowanie wyłączone w trybie offline");
  };

  const handleSpin = () => {
    if (isSpinning || (!freeSpins && balance < spinCost)) return;

    setIsSpinning(true);
    if (freeSpins > 0) {
      setFreeSpins(freeSpins - 1);
    } else {
      setBalance(balance - spinCost);
    }

    navigator.vibrate?.([100, 50, 100]);

    const item = {
      name: "Miecz Smogorożca",
      rarity: "legendary",
      value: 5000,
      img: "/api/placeholder/60/60"
    };

    setTimeout(() => {
      const newBalance = balance + Math.floor(item.value * multiplier);
      setResult(item);
      setBalance(newBalance);
      setMultiplier((prev) => Math.min(5.0, Math.round((prev + 0.5) * 10) / 10));
      setRank("Legenda");
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="app-container">
      <Header onLogout={handleLogout} />
      <StatsBar
        balance={balance}
        freeSpins={freeSpins}
        multiplier={multiplier}
        rank={rank}
      />
      <Lootbox
        onSpin={handleSpin}
        isSpinning={isSpinning}
        freeSpins={freeSpins}
        spinCost={spinCost}
      />
      <ResultModal result={result} onClose={() => setResult(null)} />
      <footer>Metin2 Treasure Rush © 2025 - Symulator Skrzynek</footer>
    </div>
  );
}

export default GamePage;
