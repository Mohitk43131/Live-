// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const username = 'mohitk43131';
const repo = 'video';
const token = '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';

app.get('/videos', async (req, res) => {
  const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/`;
  const response = await fetch(apiUrl, {
    headers: { Authorization: `token ${token}` }
  });
  const data = await response.json();
  res.json(data.filter(f => f.name.endsWith('.mp4')));
});

app.listen(3000, () => console.log('Server running on port 3000'));