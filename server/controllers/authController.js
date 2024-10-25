   // server/controllers/authController.js
   const { OAuth2Client } = require('google-auth-library');
   const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

   async function verifyGoogleToken(token) {
       const ticket = await client.verifyIdToken({
           idToken: token,
           audience: 'YOUR_GOOGLE_CLIENT_ID',
       });
       const payload = ticket.getPayload();
       return payload;
   }

   async function verifyFacebookToken(token) {
       // Implement Facebook token verification
   }

   module.exports = { verifyGoogleToken, verifyFacebookToken };