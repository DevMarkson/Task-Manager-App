const express = require('express');
const passport = require('passport');
const router = express.Router();

const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Task = require('../models/Task');

// @desc  Login/Landing Page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
  // Serve the login.html file from the public directory
  res.sendFile('login.html', { root: 'public', layout: 'login' });
});

// @desc  Dashboard Page
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render('dashboard', {
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;
