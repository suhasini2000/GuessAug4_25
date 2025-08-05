// ...existing imports...
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardContent, CardMedia, Typography, TextField } from '@mui/material';

const AnimalGuess = () => {
  const [animal, setAnimal] = useState(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const fetchNextAnimal = async () => {
    setFeedback('');
    setGuess('');
    try {
      const response = await axios.get('http://localhost:8000/api/random-animal/', {
        withCredentials: true,
      });
      setAnimal(response.data);
    } catch (error) {
      alert('No animals found. Please try again.');
    }
  };

  const submitGuess = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/guess-animal/', {
        id: animal.id,
        guess: guess,
      }, { withCredentials: true });
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
    <Box>
      <Typography variant="h4" gutterBottom>Guess the Animal!</Typography>
      {!animal && !gameOver && (
        <Button variant="contained" onClick={fetchNextAnimal}>Start Game</Button>
      )}

      {animal && (
        <Card sx={{ maxWidth: 345, my: 2 }}>
          <CardMedia
            component="img"
            height="200"
            image={`http://localhost:8000${animal.image}`}
            alt="Animal clue"
          />
          <CardContent>
            <Typography variant="body1">
              Clue: Name starts with <b>{animal.first_letter}</b> and has {animal.name_length} letters.
            </Typography>
            <TextField
              label="Your Guess"
              value={guess}
              onChange={e => setGuess(e.target.value)}
              sx={{ my: 2 }}
            />
            <Button variant="contained" onClick={submitGuess}>Submit Guess</Button>
            {feedback && <Typography sx={{ mt: 2 }}>{feedback}</Typography>}
          </CardContent>
        </Card>
      )}

      {animal && (
        <Box>
          <Button variant="outlined" onClick={fetchNextAnimal}>Next Animal</Button>
          <Button variant="text" color="error" onClick={stopGame}>Stop</Button>
        </Box>
      )}

      {gameOver && (
        <Box>
          <Typography variant="body1" sx={{ my: 2 }}>Game over!</Typography>
          <Button variant="contained" onClick={resetGame}>Restart</Button>
        </Box>
      )}
    </Box>
  );
};

export default AnimalGuess;