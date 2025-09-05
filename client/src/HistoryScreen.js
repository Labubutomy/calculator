import React, { useState, useEffect } from "react";
import { forwardRef, useImperativeHandle } from "react";

const HistoryScreen = forwardRef((props, ref) => {
  const updateInputString = props.updateInputString;
  
  useImperativeHandle(ref, () => ({
    // Функция для добавления элемента в историю
    addToHistory(expression, answer) {
      console.log(answer)
      const newHistoryItem = { expression: expression, result: answer };
      setHistory([...history, newHistoryItem]); // Добавляем новый элемент к текущей истории
    }
  }));
  
  const [history, setHistory] = useState([]); // Изначально история пуста

  const clearHistory = () => {
    setHistory([]); // Очищаем историю
  };

  return (
    <div className="history">
      <button className="clear-history" onClick={clearHistory}>
        Clear history
      </button>
      {history.map((item, index) => (
        <div key={index} className="history-item">
          {/* Добавляем обработчик клика для отображения строки и результата */}
          <div className="expression" onClick={() => updateInputString(item.expression)}>
            {item.expression}
          </div>
          <div className="result" onClick={() => updateInputString(item.result)}>
            {item.result}
          </div>

        </div>
      ))}
    </div>
  );
})

export default HistoryScreen;