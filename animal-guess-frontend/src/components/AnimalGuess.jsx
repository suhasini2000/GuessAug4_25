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
  const [score, setScore] = useState(0);

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
    try {
      const response = await axios.get('/api/random-animal/', { withCredentials: true });
      if (!response.data || Object.keys(response.data).length === 0) {
        setAnimal(null);
        setGameOver(true);
        setFeedback('No animals found. Game over!');
        return;
      }
      // Check if animal already shown
      if (shownAnimals.includes(response.data.id)) {
        if (totalAnimals && shownAnimals.length >= totalAnimals) {
          setAnimal(null);
          setGameOver(true);
          setFeedback('All animals guessed! Game over!');
          return;
        }
        fetchNextAnimal();
        return;
      }
      setAnimal(response.data);
      setShownAnimals(prev => [...prev, response.data.id]);
      setGuess('');
    } catch (error) {
      setAnimal(null);
      setGameOver(true);
      setFeedback('No animals found. Game over!');
    }
  };

  const submitGuess = async () => {
    if (!animal) return;
    try {
      const response = await axios.post(
        '/api/guess-animal/',
        {
          id: animal.id,
          guess: guess.trim().toLowerCase(), // Normalize input
        },
        { withCredentials: true }
      );
      if (response.data.correct) {
        setFeedback(`Correct! The animal is ${animal.name}.`);
        setScore(prev => prev + 1);
        setTimeout(() => {
          fetchNextAnimal();
        }, 1000);
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
  setShownAnimals([]);
  setScore(0);
  setAnimal(null);
  setGuess('');
  setFeedback('');
  fetchNextAnimal(); // <-- Start the game immediately after reset
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
      score={score}
      totalAnimals={totalAnimals}
    />
  );
};

export default AnimalGuess;