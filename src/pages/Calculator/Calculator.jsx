import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [cal, setCal] = useState(''); // เก็บค่าตัวเลขที่ 1
  const [seccal, setSecCal] = useState(''); // เก็บค่าตัวเลขที่ 2
  const [operator, setOperator] = useState(''); // เก็บค่าตัวดำเนินการ
  const [display, setDisplay] = useState('0'); // แสดงผล

  const selectnum = (num) => {
    if (display === '0') {
      setDisplay('');
    }

    setDisplay(prevDisplay => prevDisplay + num);

    if (!operator) {
      setCal(prevCal => prevCal + num);
    } else {
      setSecCal(prevSecCal => prevSecCal + num);
    }
  };

  const selectOperator = (op) => {
    if (cal === '') return;

    if (seccal !== '') {
      equal();
    }

    setOperator(op);
    setDisplay(prevDisplay => prevDisplay + op);
  };

  const deleteALL = () => {
    setCal('');
    setSecCal('');
    setOperator('');
    setDisplay('0');
  };

  const deleteOne = () => {
    
    if (seccal === '' && operator === '') {
      setCal(prevCal => prevCal.slice(0, -1));
      setDisplay(cal.slice(0, -2));
    } else if (seccal === '' && operator !== '') {
      setOperator('');
      setDisplay(cal);
    } else if (seccal !== '') {
      setSecCal(prevSecCal => prevSecCal.slice(0, -1));
      setDisplay(cal + operator + seccal.slice(0, -1));
    }
  };

  const equal = () => {
    if (cal === '' || seccal === '' || operator === '') return;

    const num1 = parseFloat(cal);
    const num2 = parseFloat(seccal);
    let result = 0;

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          setDisplay('Error');
          return;
        }
        result = num1 / num2;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setCal(result.toString());
    setSecCal('');
    setOperator('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      equal();
    } else if (e.key === 'Escape') {
      deleteALL();
    } else if (['+', '-', '*', '/'].includes(e.key)) {
      selectOperator(e.key);
    } else if (e.key >= '0' && e.key <= '9') {
      selectnum(e.key);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [cal, seccal, operator]);

  return (
    <div className='calculator-container'>
    
      <div className="show-box" align="center">
        <span id="showbox">{display}</span>
      </div>
      <div className="calculator-box">
        <button className="box" onClick={deleteALL}>C</button>
        <button className="box">%</button>
        <button className="box" onClick={() => selectOperator('*')}>&times;</button>
        <button className="box" onClick={() => selectOperator('/')}>&divide;</button>
      </div>
      <div className="calculator-box">
        <button className="box" onClick={() => selectnum('7')}>7</button>
        <button className="box" onClick={() => selectnum('8')}>8</button>
        <button className="box" onClick={() => selectnum('9')}>9</button>
        <button className="box" onClick={() => selectOperator('+')}>+</button>
      </div>
      <div className="calculator-box">
        <button className="box" onClick={() => selectnum('4')}>4</button>
        <button className="box" onClick={() => selectnum('5')}>5</button>
        <button className="box" onClick={() => selectnum('6')}>6</button>
        <button className="box" onClick={() => selectOperator('-')}>&minus;</button>
      </div>
      <div>
      <div className="calculator-box">
        <button className="box" onClick={() => selectnum('1')}>1</button>
        <button className="box" onClick={() => selectnum('2')}>2</button>
        <button className="box" onClick={() => selectnum('3')}>3</button>
        <button id="calbutton" onClick={equal}>=</button>
        
      </div>

      <div className="calculator-box">
        <button className="box" onClick={() => selectnum('0')}>0</button>
        <button className="box" onClick={() => selectnum('.')}>.</button>
        <button className="box" onClick={deleteOne}>&larr;</button>
        {/* <div className="space"></div> */}
        </div>
      </div>
    
    </div>
  );
};

export default Calculator;
