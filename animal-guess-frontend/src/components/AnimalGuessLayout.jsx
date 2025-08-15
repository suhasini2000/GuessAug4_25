import { Box, Button, Typography } from '@mui/material';
import AnimalClueCard from './AnimalClueCard';
import GameControls from './GameControls';
import GameOver from './GameOver';

const AnimalGuessLayout = ({
  animal,
  guess,
  setGuess,
  submitGuess,
  feedback,
  fetchNextAnimal,
  stopGame,
  gameOver,
  resetGame,
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      bgcolor: '#ef8181ff',
      p: 2,
    }}
  >
    <Box sx={{ textAlign: 'center', width: '100%', maxWidth: 400 }}>
      <Typography variant="h4" gutterBottom>
        🐾 Guess the Animal!
      </Typography>

      {!animal && !gameOver && (
        <Button variant="contained" onClick={fetchNextAnimal}>
          Start Game
        </Button>
      )}

      {animal && (
        <>
          <AnimalClueCard
            animal={animal}
            guess={guess}
            setGuess={setGuess}
            submitGuess={submitGuess}
            feedback={feedback}
          />
          <GameControls fetchNextAnimal={fetchNextAnimal} stopGame={stopGame} />
        </>
      )}

      {gameOver &&
       <GameOver resetGame={resetGame} />}
    </Box>
  </Box>
);

export default AnimalGuessLayout;