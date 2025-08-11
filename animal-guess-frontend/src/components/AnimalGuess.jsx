import { useState } from 'react';
import axios from 'axios';

import AnimalGuessLayout from './AnimalGuessLayout';


const AnimalGuess = () => {
  const [animal, setAnimal] = useState(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const fetchNextAnimal = async () => {
    setFeedback('');
    setGuess('');
    try {
      const response = await axios.get('/api/random-animal/', {
        withCredentials: true,
      });
      setAnimal(response.data);
    } catch (error) {
      alert('No animals found. Please try again.');
    }
  };

  const submitGuess = async () => {
    try {
      const response = await axios.post(
        '/api/guess-animal/',
        {
          id: animal.id,
          guess: guess,
        },
        { withCredentials: true }
      );
      if (response.data.correct) {
        setFeedback(`Correct! The animal is ${response.data.answer}.`);
      } else {
        setFeedback('Incorrect. Try again!');
      }
    } catch (error) {
      setFeedback('Error checking guess.');
    }
  };

  const stopGame = () => {
    setAnimal(null);
    setGameOver(true);
    setFeedback('');
    setGuess('');
  };

  const resetGame = () => {
    setGameOver(false);
    fetchNextAnimal();
  };

  return (
  <AnimalGuessLayout
    animal={animal}
    guess={guess}
    setGuess={setGuess}
    submitGuess={submitGuess}
    feedback={feedback}
    fetchNextAnimal={fetchNextAnimal}
    stopGame={stopGame}
    gameOver={gameOver}
    resetGame={resetGame}
  />
);
};

export default AnimalGuess;