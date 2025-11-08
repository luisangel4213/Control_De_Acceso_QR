const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/items
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, title, description, created_at FROM items ORDER BY id DESC LIMIT 100');
    res.json({ ok: true, items: rows });
  } catch (err) {
    console.error('DB error', err);
    res.status(500).json({ ok: false, error: 'Database error' });
  }
});

module.exports = router;
