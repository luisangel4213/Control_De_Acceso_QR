const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../middleware/auth')
const fs = require('fs')
const path = require('path')

const DATA_PATH = path.join(__dirname, '..', 'data.json')

function readData(){
  try { return JSON.parse(fs.readFileSync(DATA_PATH)) } catch(e){ return { users: [], visits: [] } }
}

// POST /api/auth/login
// Accepts demo credentials: admin/admin123, guard/guard123
router.post('/login', (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) return res.status(400).json({ ok: false, error: 'username and password required' })
  // read from data.json first
  const data = readData()
  const user = data.users.find(u => u.username === username)
  if (user && user.password === password) {
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '8h' })
    return res.json({ ok: true, token, user: { id: user.id, username: user.username, role: user.role } })
  }
  // fallback demo credentials
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ id: 0, username: 'admin', role: 'admin' }, JWT_SECRET, { expiresIn: '8h' })
    return res.json({ ok: true, token, user: { id: 0, username: 'admin', role: 'admin' } })
  }
  if (username === 'guard' && password === 'guard123') {
    const token = jwt.sign({ id: 1, username: 'guard', role: 'guard' }, JWT_SECRET, { expiresIn: '8h' })
    return res.json({ ok: true, token, user: { id: 1, username: 'guard', role: 'guard' } })
  }
  return res.status(401).json({ ok: false, error: 'Invalid credentials' })
})

module.exports = router
