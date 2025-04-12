// auth/googleOAuth.js

import { google } from 'googleapis';
import readline from 'readline';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const getAccessToken = async () => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  console.log('\n🔐 Authorize this app by visiting:\n', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('🔑 Enter the code from that page here: ', async (code) => {
      rl.close();
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      console.log('✅ Token acquired!');
      resolve(oauth2Client);
    });
  });
};
