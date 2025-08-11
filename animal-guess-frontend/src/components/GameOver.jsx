import { Box, Typography, Button } from '@mui/material';

const GameOver = ({ resetGame }) => (
  <Box>
    <Typography variant="body1" sx={{ my: 2 }}>
      Game over!
    </Typography>
    <Button variant="contained" onClick={resetGame}>
      Restart
    </Button>
  </Box>
);

export default GameOver;