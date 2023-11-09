import React, { useState } from 'react';
import './App.css';

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = async (value) => {
    if (value === '=') {
      try {
        const response = await fetch('http://localhost:3001/api/calculations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ expression, result: eval(expression) }),
        });

        if (response.ok) {
          console.log('Calculation saved successfully!');
        } else {
          console.error('Failed to save calculation.');
        }
      } catch (error) {
        console.error('Error while saving calculation:', error);
      }
    } else {
      setExpression((prevExpression) => prevExpression + value);
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <input type="text" value={expression} readOnly />
          <input type="text" value={result} readOnly />
        </div>
        <div className="buttons">
          {[...Array(9).keys(), '+', '-', '*', '/', '='].map((value) => (
            <button key={value} onClick={() => handleButtonClick(value)}>
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
