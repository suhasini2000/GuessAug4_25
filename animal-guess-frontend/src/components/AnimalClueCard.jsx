import { Card, CardContent, CardMedia, Typography, TextField, Button } from '@mui/material';

const AnimalClueCard = ({
  animal,
  guess,
  setGuess,
  submitGuess,
  feedback
}) => (
  <Card sx={{ width: '100%', my: 2 }}>
    <CardMedia
      component="img"
      height="200"
      image={
        animal.image.startsWith('http')
          ? animal.image
          : `http://localhost:8000${animal.image}`
      }
      alt="Animal clue"
    />
    <CardContent>
      <Typography variant="body1">
        Clue: Name starts with <b>{animal.first_letter}</b>
        {animal.last_letter && <> and ends with <b>{animal.last_letter}</b></>}
        {" "}and has {animal.name_length} letters.
      </Typography>
      <TextField
        label="Your Guess"
        value={guess}
        onChange={e => setGuess(e.target.value)}
        fullWidth
        sx={{ my: 2 }}
      />
      <Button variant="contained" onClick={submitGuess} fullWidth>
        Submit Guess
      </Button>
      {feedback && <Typography sx={{ mt: 2 }}>{feedback}</Typography>}
    </CardContent>
  </Card>
);

export default AnimalClueCard;