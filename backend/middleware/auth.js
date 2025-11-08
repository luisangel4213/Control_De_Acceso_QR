const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change'

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ ok: false, error: 'Missing token' })
  const token = auth.split(' ')[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json({ ok: false, error: 'Invalid token' })
  }
}

function requireRole(role) {
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ ok: false, error: 'Not authenticated' })
    if (req.user.role !== role && req.user.role !== 'admin') return res.status(403).json({ ok: false, error: 'Forbidden' })
    next()
  }
}

module.exports = { authMiddleware, requireRole, JWT_SECRET }
