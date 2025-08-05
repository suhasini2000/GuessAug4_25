import { useState, useEffect } from 'react';
import axios from 'axios';

const AnimalGuess = () => {
  const [animal, setAnimal] = useState(null);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    fetchAnimal();
  }, []);

  const fetchAnimal = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/random-animal/');
      setAnimal(res.data);
      setResult('');
      setGuess('');
    } catch (error) {
      console.error('Error fetching animal:', error);
    }
  };

  const checkGuess = () => {
    if (guess.trim().toLowerCase() === animal.name.toLowerCase()) {
      setResult('🎉 Correct! You guessed it right.');
    } else {
      setResult('❌ Wrong! Try again.');
    }
  };

  if (!animal) return <p>Loading...</p>;

  return (
    <div>
      <img
        src={`http://localhost:8000${animal.image}`}
        alt="animal"
        style={{ width: '300px', height: '300px', objectFit: 'cover' }}
      />
      <div style={{ marginTop: '10px' }}>
        <p>Clue 1: The animal name has {animal.name.length} letters</p>
        <p>Clue 2: The first letter is "{animal.name[0].toUpperCase()}"</p>
      </div>
      <input
        type="text"
        placeholder="Your guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={checkGuess} style={{ marginLeft: '10px' }}>Check</button>
      <p style={{ marginTop: '10px' }}>{result}</p>
    </div>
  );
};

export default AnimalGuess;
