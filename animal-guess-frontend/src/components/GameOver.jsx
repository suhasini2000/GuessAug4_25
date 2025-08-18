import { Box, Button, Typography } from '@mui/material';

const GameOver = ({ resetGame, score, totalAnimals }) => (
  <Box>
    <Typography variant="h5" gutterBottom>
       Game Over!
    </Typography>
    <Typography variant="h6" gutterBottom>
  Your Final Score: {score ?? 0} / {totalAnimals !== null && totalAnimals !== undefined ? totalAnimals : "?"}    </Typography>
    <Button variant="contained" onClick={resetGame}>
      Play Again
    </Button>
  </Box>
);

export default GameOver;