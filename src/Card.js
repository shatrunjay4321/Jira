import { useState, useMemo } from "react";

function Card({ card, handleAdd, handleCheck, handlePrevClick, handleNextClick, handleSelectAll, isLastIndex }) {
  const [inputValue, setInputValue] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const selectedCount = useMemo(() => card.totalArray.filter((item) => item.status).length, [card.totalArray]);

  return (
    <div className="card_container">
      <div className="left_card">
        <div className="input_list_div">
          <input
            type="text"
            placeholder="Add stuff"
            value={inputValue}
            autoFocus
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
            onClick={() => { handleAdd(card, inputValue); setInputValue(''); }}
          >Add</button>
        </div>
        <div className="stats_div">{selectedCount}/{card.totalArray.length} Selected</div>
        <button 
            onClick={() => handleSelectAll(card, setSelectAll)} 
            disabled={!card.totalArray.length}
        >
          {selectAll ? "Deselect All" : "Select All"}
        </button>
        <div className="list_container">
          <ul>
            {card.totalArray.map((item) => (
              <li key={item.id}>
                <input 
                    type="checkbox" 
                    checked={item.status} 
                    onChange={() => handleCheck(card, item.id)} 
                />
                {item.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="right_card">
        <button onClick={() => {
            handlePrevClick();
            setSelectAll(false);
        }} className={!card.id ? "display_none" : ""}>{`<`}</button>
        <button onClick={() => {
            handleNextClick();
            setSelectAll(false);
        }} className={isLastIndex ? "display_none" : ""}>{`>`}</button>
      </div>
    </div>
  );
}

export default Card;
