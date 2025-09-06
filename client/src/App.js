import './App.css';
import { useState, useEffect, useRef } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6'
import { TbSquareRoot } from 'react-icons/tb'
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

    setInputString((prevInputString) => {
      cursorPosition.current = (prevInputString || "").length + (input || "").length;
      return prevInputString + input;
    });
  };

  const inputOperator = (e) => {
    const input = e.target.innerText;
    
    setInputString(prevInputString => {
      const isLastCharOperator = /[*\/+-]/.test((prevInputString || "").charAt((prevInputString || "").length - 1));

      console.log(input)
      console.log(isLastCharOperator)
      
      if (isLastCharOperator) {
        if((input || "").localeCompare('x') == 0)
          return prevInputString.slice(0, -1) + '*';
        else
          return prevInputString.slice(0, -1) + input;
      } else {
        if((input || "").localeCompare('x') == 0)
          return prevInputString + '*';
        else
          return prevInputString + input;
      }
    });
  };




  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [inputString]);


  



  const equals = () => {
    if (inputString !== "") {
      sendInputToBackend();
    }

  }
    
  const minusPlus = () => {
    setInputString(prevInputString => {
      const parts = (prevInputString || "").split(/([()*%/+-])/);
      let lastNumberIndex = parts.length - 1;
    
      while (lastNumberIndex >= 0 && !/[\d.]/.test(parts[lastNumberIndex])) {
        lastNumberIndex--;
      }
    
      if (lastNumberIndex >= 0 && parts[lastNumberIndex] !== '.') {
        const lastNumber = parseFloat(parts[lastNumberIndex]);
    
        const newNumber = -lastNumber;
    
        parts[lastNumberIndex] = '(' + newNumber.toString()+')';
        return parts.join('');
      }
      return prevInputString;
    });
  }
  
  
  const reset = () => {
    setInputString("");
  };

  const deleteBtn = () => {
    setInputString(prevInputString => {
      if ((prevInputString || "").length !== 0){
        return prevInputString.slice(0, -1);
      }
      return prevInputString;
    });
  }
  const sqrtGet = () =>{
    setInputString((prevInputString) => {
      cursorPosition.current = (prevInputString || "").length + 5;
      return prevInputString + 'sqrt(';
    });
  }

  

  const sendInputToBackend = () => {
    if (inputString !== "") {
      fetch('http://172.18.0.3:8080/calculate', {
        method: 'POST',
        body: JSON.stringify({ expression: inputString }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Ответ от бэкенда:', data);
          setInputString(data.answer)
          historyRef.current.addToHistory(inputString, data.answer)
        })
        .catch((error) => {
          console.error('Произошла ошибка:', error);
        });
    }
  };
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
  
      if (/[\d()+\-*/.%]/.test(key)) {
        setInputString((prevInputString) => prevInputString + key);
        event.preventDefault();
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
  
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