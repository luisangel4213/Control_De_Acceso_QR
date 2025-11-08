const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const { authMiddleware, requireRole } = require('../middleware/auth')

const DATA_PATH = path.join(__dirname, '..', 'data.json')

function readData(){
  try { return JSON.parse(fs.readFileSync(DATA_PATH)) } catch(e){ return { users: [], visits: [] } }
}
function writeData(d){ fs.writeFileSync(DATA_PATH, JSON.stringify(d, null, 2)) }

// GET /api/users
router.get('/', authMiddleware, (req, res) => {
  const data = readData()
  const users = data.users.map(u => ({ id: u.id, username: u.username, full_name: u.full_name, role: u.role }))
  res.json({ ok: true, users })
})

// POST /api/users (admin only)
router.post('/', authMiddleware, requireRole('admin'), (req, res) => {
  const { username, full_name, role, password } = req.body || {}
  if (!username || !password) return res.status(400).json({ ok: false, error: 'username and password required' })
  const data = readData()
  const id = (data.users.reduce((m,u)=>Math.max(m,u.id),0) || 100) + 1
  const qr_payload = JSON.stringify({ type: 'user', username })
  const user = { id, username, full_name: full_name||null, role: role||'guest', password, qr_payload }
  data.users.push(user)
  writeData(data)
  res.json({ ok: true, user })
})

module.exports = router
