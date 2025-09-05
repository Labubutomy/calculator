import './App.css';
import { useState, useEffect, useRef
 } from 'react';
 import {FaDeleteLeft} from 'react-icons/fa6'
 import {TbSquareRoot} from 'react-icons/tb'
 import HistoryScreen from './HistoryScreen';


function App() {
  const [inputString, setInputString] = useState("");
  const inputRef = useRef();
  const historyRef = useRef();
  const cursorPosition = useRef(inputString.length);

  const updateInputString = (newInputString) => {
    setInputString(newInputString);
  };


  const inputNum = (e) => {

    const input = e.target.innerText;

    setInputString((prevInputString) => prevInputString + input);
  
    // Перемещаем курсор вправо после вставки
    cursorPosition.current = inputString.length + input.length;
  };

  const inputOperator = (e) => {
    const input = e.target.innerText;
    // Проверяем, является ли последний символ в строке оператором
    const isLastCharOperator = /[*\/+-]/.test(inputString.charAt(inputString.length - 1));

    console.log(input)
    console.log(isLastCharOperator)
    // Если последний символ - оператор, заменяем его на новый оператор
    if (isLastCharOperator) {
      if(input.localeCompare('x') == 0)
        setInputString(prevInputString => prevInputString.slice(0, -1) + '*');
      else
        setInputString(prevInputString => prevInputString.slice(0, -1) + input);
      //setVisibleString(prevVisibleString => prevVisibleString.slice(0, -1) + input);
    } else {
      if(input.localeCompare('x') == 0)
        setInputString(prevInputString => prevInputString + '*');
      else
        setInputString(prevInputString => prevInputString + input);
      //setVisibleString(prevVisibleString => prevVisibleString + input);
    }

    // Перемещаем курсор вправо после вставки
    cursorPosition.current = inputString.length + input.length;
  };




  useEffect(() => {
    // Проверяем, изменилась ли строка видимого текста
    if (inputRef.current) {
      // Перемещаем скролл вправо, чтобы строка была видна
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [inputString]);


  



  const equals = () => {
    if (inputString !== "") {
      // Отправьте inputString на бэкенд для вычислений
      sendInputToBackend();
      // Вместо этого можно использовать AJAX-запрос или fetch
      // Ожидайте ответ от бэкенда и обновите состояние с результатом
    }
    //setInputString(""); // Очищаем строку при нажатии "="

  }
    
  const minusPlus = () => {
    const parts = inputString.split(/([()*%/+-])/); // Разбиваем строку на массив чисел и операторов
    let lastNumberIndex = parts.length - 1;
  
    // Ищем последний элемент в массиве, который является числом
    while (lastNumberIndex >= 0 && !/[\d.]/.test(parts[lastNumberIndex])) {
      lastNumberIndex--;
    }
  
    if (lastNumberIndex >= 0 && parts[lastNumberIndex] !== '.') {
      // Находим последнее введенное число
      const lastNumber = parseFloat(parts[lastNumberIndex]);
  
      // Изменяем его знак
      const newNumber = -lastNumber;
  
      // Обновляем строку inputString с учетом изменений
      parts[lastNumberIndex] = '(' + newNumber.toString()+')';
      setInputString(parts.join(''));
    }
  }
  
  
  const reset = () => {
    setInputString(""); // Сначала очистим inputString
    //setVisibleString(""); // Сбрасываем видимую строку на "0"
  };

  const deleteBtn = () => {
    if (inputString.length !== 0){
      setInputString(inputString.slice(0, -1));
    }
  }
  const sqrtGet = () =>{
    setInputString((prevInputString) => prevInputString + 'sqrt(');
  
    // Перемещаем курсор вправо после вставки
    cursorPosition.current = inputString.length + 2;
  
    //setVisibleString(inputString  + '√(');
  }

  

  const sendInputToBackend = () => {
    // Функция для отправки входной строки на бэкенд
    if (inputString !== "") {
      // Вы можете использовать AJAX-запрос или fetch для отправки данных на бэкенд
      // Например, можно отправить их на сервер с помощью fetch
      fetch('http://172.18.0.3:8080/calculate', {
        method: 'POST',
        body: JSON.stringify({ expression: inputString }), // Отправляем входную строку на бэкенд
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Обрабатываем ответ от бэкенда, если это необходимо
          console.log('Ответ от бэкенда:', data);
          setInputString(data.answer)
          historyRef.current.addToHistory(inputString, data.answer)
          //setVisibleString(data.answer)
        })
        .catch((error) => {
          // Обрабатываем ошибку, если она произошла
          console.error('Произошла ошибка:', error);
        });
    }
  };
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
  
      // Проверьте, является ли клавиша цифрой или одним из допустимых операторов
      if (/[\d()+\-*/.%]/.test(key)) {
        // Если это допустимая клавиша, добавьте ее к inputString
        setInputString((prevInputString) => prevInputString + key);
        event.preventDefault(); // Предотвратите действие по умолчанию для этой клавиши (например, прокрутку)
      }
    };
  
    // Добавьте обработчик событий клавиатуры при монтировании компонента
    window.addEventListener('keydown', handleKeyPress);
  
    // Удалите обработчик событий клавиатуры при размонтировании компонента
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  
  return (
    <div className="container">

      <div className='wrapper'>
        <div className="screen">
          {/* Отображаем видимую строку */}
          <form 
            className="input-string"
            ref={inputRef}
            autoFocus
            onClick={() => {
              // При клике на видимую строку устанавливаем фокус на инпут и устанавливаем позицию курсора
              inputRef.current.focus();
              inputRef.current.selectionStart = inputRef.current.selectionEnd = cursorPosition.current;
            }}
          >
            {inputString}

          </form>
        </div>



      <div className='btn light-gray' onClick={reset}>
        AC
      </div>
      <div className='btn light-gray' onClick={deleteBtn}>
        <FaDeleteLeft/>
      </div>
      <div className='btn light-gray' onClick={minusPlus}>
        +/-
      </div>
      <div className='btn orange' onClick={inputOperator}>
        /
      </div>
      <div className='btn' onClick={inputNum}>
        7
      </div>
      <div className='btn' onClick={inputNum}>
        8
      </div>
      <div className='btn' onClick={inputNum}>
        9
      </div>
      <div className='btn orange' onClick={inputOperator}>
        x
      </div>
      <div className='btn' onClick={inputNum}>
        4
      </div>
      <div className='btn' onClick={inputNum}>
        5
      </div>
      <div className='btn' onClick={inputNum}>
        6
      </div>
      <div className='btn orange' onClick={inputOperator}>
        +
      </div>
      <div className='btn' onClick={inputNum}>
        1
      </div>
      <div className='btn' onClick={inputNum}>
        2
      </div>
      <div className='btn' onClick={inputNum}>
        3
      </div>
      <div className='btn orange' onClick={inputOperator}>
        -
      </div>
      <div className='btn zero' onClick={inputNum}>
        0
      </div>
      <div className='btn coma' onClick={inputNum}>
        .
      </div>
      <div className='btn orange' onClick={equals}>
        =
      </div>
      <div className='btn light-gray' onClick={inputNum}>
        %
      </div>
      <div className='btn opcl light-gray' onClick={inputNum}>
      {'('}
      </div>
      <div className='btn opcl light-gray' onClick={inputNum}>
      {')'}
      </div>
      <div className='btn light-gray' onClick={sqrtGet}>
        <TbSquareRoot/>
      </div>
      
      
      </div>
      <HistoryScreen ref={historyRef} updateInputString={updateInputString} />
      </div>
  );
}

export default App;