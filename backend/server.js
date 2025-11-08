const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const itemsRouter = require('./routes/items');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const visitsRouter = require('./routes/visits');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/visits', visitsRouter);
app.use('/api/items', itemsRouter);

app.get('/api/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }));

// simple route to test DB connection
app.get('/api/dbtest', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 as ok');
    res.json({ ok: true, rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'db error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
