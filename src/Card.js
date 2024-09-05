import { useState } from "react";

function Card ({
    card = {},
    index,
    isLastIndex = false,
    handleAdd = () => {},
    handleCheck = () => {},
    handlePrevClick = () => {},
    handleNextClick = () => {},
    handleSelectAll = () => {}
}) {
    const {id, totalArray = []} = card || {};
    const [inputValue, setinputValue] = useState('');
    const [selectAll, setSelectAll] = useState(false);

    const findSelectedArrayLength = () => {
        return totalArray?.reduce((acc, val) => {
            if(val?.status) {
                acc++;
            }
            return acc;
        }, 0);
    };

    return (
        <div className="card_container">
            <div className="left_card">
                <div className="input_list_div">
                    <input 
                        type="text" 
                        placeholder="Add stuff" 
                        value={inputValue} 
                        onChange={(e) => setinputValue(e.target.value)} 
                    />
                    <button onClick={() => {
                        handleAdd(card, inputValue);
                        setinputValue("");
                    }}>Add</button>
                </div>
                <div className="stats_div">{findSelectedArrayLength()}/{totalArray.length} Selected</div>
                <button 
                    onClick={() => handleSelectAll(card, setSelectAll)}
                    disabled={!totalArray.length}
                >{selectAll ? "Deselect All" : "Select All"}</button>
                <div className="list_container">
                    <ul>
                        {totalArray?.map((item) => {
                            return (
                                <div key={item?.id}>
                                    <input 
                                        type="checkbox"
                                        value={item?.status}
                                        onChange={() => handleCheck(card, item)}
                                    />
                                    {item?.value}
                                </div>
                        )
                        })}
                    </ul>
                </div>
            </div>
            <div className="right_card"> 
                <button 
                    onClick={() => handlePrevClick(card, index)} 
                    className={`${!index ? "display_none" : ""}`}
                >{`<`}</button>
                <button 
                    onClick={() => handleNextClick(card, index)} 
                    className={`${isLastIndex ? "display_none" : ""}`}
                >{`>`}</button>
            </div>
        </div>
    )
}

export default Card;
