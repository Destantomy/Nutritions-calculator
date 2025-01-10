import React, { useState } from 'react';
import './index.css';

function App() {
  const [food, setFood] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('gram');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:4040/api/calculate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ food, amount: parseFloat(amount), unit }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error);  // Menangani error sesuai dengan response dari backend
      }
    } catch (err) {
      setError('An error occurred while calculating');
    }
  };

  return (
    <div className="calculator-container">
      <h1>Food Nutrition Calculator</h1>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Food:</label>
          <select
            value={food}
            onChange={(e) => setFood(e.target.value)}
            required
          >
            <option value="">Select food</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
            <option value="grape">Grape</option>
            <option value="kiwi">Kiwi</option>
            <option value="peach">Peach</option>
            <option value="strawberry">Strawberry</option>
            <option value="watermelon">Watermelon</option>
            <option value="pear">Pear</option>
            <option value="mango">Mango</option>
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Unit:</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          >
            <option value="gram">Gram</option>
            <option value="mg">Milligram</option>
          </select>
        </div>
        <button type="submit">Calculate</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-container">
          <h3>Nutrition Information for {food}:</h3>
          <p>Calories: {result.calories} kcal</p>
          <p>Protein: {result.protein} g</p>
          <p>Carbohydrates: {result.carbohydrates} g</p>
          <p>Fats: {result.fats} g</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
