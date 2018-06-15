const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../customerReviews/public')));

// Splash Carousel
app.get('/splashpage/:gameId', (req, res) => {
  const gameId = req.params.gameId;

  axios.get(`http://localhost:3001/splashpage/${gameId}`)
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => console.log('error 3001 proxy request', err));
});

// relatedGames
app.get('/games', (req, res) => {
  axios.get('http://localhost:3002/games')
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => console.log('error 3002 proxy request', err))
});

// customerReviews
app.get('/api/game/:gameId/reviews/', (req, res) => {
  const gameId = req.params.gameId;

  axios.get(`http://localhost:3003/api/game/${gameId}/reviews/`)
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => console.log('error 3003 proxy request', err));
});

app.get('/api/game/:gameId/reviews/summary', (req, res) => {
  const gameId = req.params.gameId;

  axios.get(`http://localhost:3003/api/game/${gameId}/reviews/summary`)
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => console.log('error 3003 proxy request', err));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
