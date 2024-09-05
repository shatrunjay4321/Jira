import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card.js';

function App() {
  const [cards, setCards] = useState([]);

  const cardsLength = cards.length;

  useEffect(() => {
    if(cards.length === 0) {
      const arr = [...Array(3).keys()].map((_, idx) => {
        return {id: idx + 1, totalArray: []}
      });
      setCards(arr);
    }
  }, [cards.length])

  const handleAdd = (card = {}, inputValue) => {
    if(inputValue.trim()) {
      const {id, totalArray = []} = card || {};
      const newCards = cards.map((item) => {
        if(item.id === id) {
          totalArray.push({id: Date.now(), value: inputValue});
        } else {
          return item;
        }
        return {id, totalArray};
      })
      setCards(newCards);
    }
  };

  const handlePrevClick = (card, index) => {
    const prevCard = cards[index-1];
    const selectedArray = card?.totalArray?.filter((item) => item?.status === true);
    const newCurrentTotalArray = card?.totalArray?.filter((item) => !item?.status);
    const newSelectedArray = selectedArray?.map((item) => ({...item, status: false}));

    const updatedPrevCard = {...prevCard, totalArray: [...prevCard?.totalArray, ...newSelectedArray]};
    const updatedCurrCard = {...card, totalArray: newCurrentTotalArray};
    console.log("updatedCurrCard:", updatedCurrCard)
    const newCards = cards.map((item, idx) => {
      if(index === idx) {
        return updatedCurrCard;
      } else if(index-1 === idx) {
        return updatedPrevCard;
      }
      return item;
    });
    setCards(newCards);
  };

  const handleNextClick = (card, index) => {
    const nextCard = cards[index+1];
    const selectedArray = card?.totalArray?.filter((item) => item?.status === true);
    const newCurrentTotalArray = card?.totalArray?.filter((item) => !item?.status);
    const newSelectedArray = selectedArray?.map((item) => ({...item, status: false}));

    const updatedNextCard = {...nextCard, totalArray: [...nextCard?.totalArray, ...newSelectedArray]};
    const updatedCurrCard = {...card, totalArray: newCurrentTotalArray};
    const newCards = cards.map((item, idx) => {
      if(index === idx) {
        return updatedCurrCard;
      } else if(index+1 === idx) {
        return updatedNextCard;
      }
      return item;
    });
    setCards(newCards);
  };

  const handleCheck = (card, item) => {
    const {id: cardId, totalArray: cardTotalArray = []} = card || {};
    const {id: itemId, status} = item || {};

    const newCards = cards.map((cardItem) => {
      if(cardItem?.id === cardId) {
        const newCardItem = cardItem?.totalArray?.map((cardList) => {
          if(cardList?.id === itemId) {
            return {...cardList, status: !status}
          } else {
            return cardList;
          }
        })
        return {...cardItem, totalArray: newCardItem};
      } else {
        return cardItem;
      }
    })
    setCards(newCards);
  }

  const handleSelectAll = (card, setSelectAll) => {
    const newCard = card?.totalArray?.map((item) => ({...item, status: !item?.status}));
    const newCards = cards?.map((item) => {
      if(item?.id === card?.id) {
        return {...item, totalArray: newCard};
      }
      return item;
    })
    setCards(newCards);
    setSelectAll((prev) => !prev);
  }

  return (
    <div className="container">
      {(cards || []).map((card, idx) => <Card 
          key={card.id}
          index={idx}
          isLastIndex={idx === cardsLength-1}
          card={card} 
          handleAdd={handleAdd} 
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
          handleCheck={handleCheck}
          handleSelectAll={handleSelectAll}
      />)}
    </div>
  );
}

export default App;
