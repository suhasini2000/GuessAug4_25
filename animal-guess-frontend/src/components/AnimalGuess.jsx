import { useEffect, useState } from 'react';
import axios from 'axios';

import AnimalGuessLayout from './AnimalGuessLayout';

const AnimalGuess = () => {
  const [animal, setAnimal] = useState(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [shownAnimals, setShownAnimals] = useState([]); // Track shown animal IDs
  const [totalAnimals, setTotalAnimals] = useState(null); 
  
  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await axios.get('/api/animals/count/', { withCredentials: true });
        setTotalAnimals(res.data.count);
      } catch (error) {
        setTotalAnimals(null);           
      }
    };
    fetchTotal();
  }, []);

  const fetchNextAnimal = async () => {
    setFeedback('');
    setGuess('');
    try {
      const response = await axios.get('/api/random-animal/', {
        withCredentials: true,
      });
      if (!response.data || Object.keys(response.data).length === 0) {
        setAnimal(null);
        setGameOver(true);
        setFeedback('No animals found. Game over!');
        return;
      }
      // Check if animal already shown
      if (shownAnimals.includes(response.data.id)) {
        // Try again to get a new animal
        if (shownAnimals.length >= 6) { // You know there are 6 animals
          setAnimal(null);
          setGameOver(true);
          setFeedback('All animals guessed! Game over!');
          return;
        }
        fetchNextAnimal();
        return;
      }
      setAnimal(response.data);
      setShownAnimals([...shownAnimals, response.data.id]);
    } catch (error) {
      setAnimal(null);
      setGameOver(true);
      setFeedback('No animals found. Game over!');
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
    setShownAnimals([]); // Reset shown animals
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