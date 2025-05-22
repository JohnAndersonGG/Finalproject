const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

let flashcards = [];
let idCounter = 1;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'add-card.html'));
});

app.get('/all-cards', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'create-mode.html'));
});


app.get('/edit/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'edit-card.html'));
});

app.get('/api/cards', (req, res) => {
  res.json(flashcards);
});
app.get('/study', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'study-mode.html'));
});


app.post('/api/cards', (req, res) => {
  const { question, answer } = req.body;
  const newCard = { id: idCounter++, question, answer };
  flashcards.push(newCard);
  res.status(201).json(newCard);
});

app.delete('/api/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  flashcards = flashcards.filter(card => card.id !== id);
  res.sendStatus(200);
});

app.put('/api/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { question, answer } = req.body;
  const card = flashcards.find(c => c.id === id);
  if (card) {
    card.question = question;
    card.answer = answer;
    res.json(card);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
