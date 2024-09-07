import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card.js';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (cards.length === 0) {
      const newCards = [...Array(3)].map((_, idx) => ({
        id: idx + 1,
        totalArray: [],
      }));
      setCards(newCards);
    }
  }, [cards]);
  

  const updateCards = (index, updatedCard) => {
    setCards((prevCards) => prevCards.map((item, idx) => (idx === index ? updatedCard : item)));
  };

  const handleAdd = (card, inputValue) => {
    if (!inputValue.trim()) return;
    const updatedCard = { ...card, totalArray: [...card.totalArray, { id: Date.now(), value: inputValue }] };
    updateCards(cards.indexOf(card), updatedCard);
  };

  const handleCardTransfer = (fromIndex, toIndex) => {
    const fromCard = cards[fromIndex];
    const toCard = cards[toIndex];
    const selectedItems = fromCard.totalArray.filter((item) => item.status);
    if (selectedItems.length === 0) return;

    const updatedFromCard = {
      ...fromCard,
      totalArray: fromCard.totalArray.filter((item) => !item.status),
    };
    const updatedToCard = {
      ...toCard,
      totalArray: [...toCard.totalArray, ...selectedItems.map((item) => ({ ...item, status: false }))],
    };

    setCards((prevCards) =>
      prevCards.map((item, idx) => (idx === fromIndex ? updatedFromCard : idx === toIndex ? updatedToCard : item))
    );
  };

  const handleCheck = (card, itemId) => {
    const updatedCard = {
      ...card,
      totalArray: card.totalArray.map((item) =>
        item.id === itemId ? { ...item, status: !item.status } : item
      ),
    };
    updateCards(cards.indexOf(card), updatedCard);
  };

  const handleSelectAll = (card, setSelectAll) => {
    const allSelected = card.totalArray.some((item) => !item.status);
    const updatedCard = {
      ...card,
      totalArray: card.totalArray.map((item) => ({ ...item, status: allSelected })),
    };
    updateCards(cards.indexOf(card), updatedCard);
    setSelectAll(allSelected);
  };

  return (
    <div className="container">
      {cards.map((card, idx) => (
        <Card
          key={card.id}
          index={idx}
          card={card}
          isLastIndex={idx === cards.length - 1}
          handleAdd={handleAdd}
          handlePrevClick={() => handleCardTransfer(idx, idx - 1)}
          handleNextClick={() => handleCardTransfer(idx, idx + 1)}
          handleCheck={handleCheck}
          handleSelectAll={handleSelectAll}
        />
      ))}
    </div>
  );
}

export default App;
