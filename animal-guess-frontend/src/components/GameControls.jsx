import { Box, Button } from '@mui/material';

const GameControls = ({ fetchNextAnimal, stopGame }) => (
  <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
    <Button variant="outlined" onClick={fetchNextAnimal}>
      Next Animal
    </Button>
    <Button variant="text" color="error" onClick={stopGame}>
      Stop
    </Button>
  </Box>
);

export default GameControls;