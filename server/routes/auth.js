   // server/routes/auth.js
   const express = require('express');
   const router = express.Router();
   const User = require('../models/User');

   router.post('/auth/facebook', async (req, res) => {
       // Validate Facebook token and find or create user
       res.send('Facebook auth route');
   });

   router.post('/auth/google', async (req, res) => {
       // Validate Google token and find or create user
       res.send('Google auth route');
   });

   module.exports = router;