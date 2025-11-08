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

// POST /api/visits/scan (guard or admin)
router.post('/scan', authMiddleware, requireRole('guard'), (req, res) => {
  const { qr_payload } = req.body || {}
  if (!qr_payload) return res.status(400).json({ ok: false, error: 'qr_payload required' })
  const data = readData()
  const user = data.users.find(u => u.qr_payload === qr_payload || u.username === qr_payload || JSON.stringify({type:'user',username:u.username}) === qr_payload)
  if (!user) return res.status(404).json({ ok: false, error: 'User not found' })
  const last = data.visits.slice().reverse().find(v => v.user_id === user.id)
  const nextType = (last && last.type === 'in') ? 'out' : 'in'
  const visit = { id: (data.visits.reduce((m,v)=>Math.max(m,v.id),0)||0)+1, user_id: user.id, type: nextType, recorded_at: new Date().toISOString() }
  data.visits.push(visit)
  writeData(data)
  res.json({ ok: true, visit })
})

// GET /api/visits/report (admin or guard)
router.get('/report', authMiddleware, (req, res) => {
  const role = req.user && req.user.role
  if (!role || (role !== 'admin' && role !== 'guard')) return res.status(403).json({ ok: false, error: 'Forbidden' })
  const data = readData()
  const from = req.query.from || '1970-01-01'
  const to = req.query.to || '2999-12-31'
  const rows = data.visits.filter(v => {
    const d = v.recorded_at.split('T')[0]
    return d >= from && d <= to
  }).map(v => ({ ...v, username: (data.users.find(u=>u.id===v.user_id)||{}).username, full_name: (data.users.find(u=>u.id===v.user_id)||{}).full_name }))
  res.json({ ok: true, visits: rows })
})

module.exports = router
