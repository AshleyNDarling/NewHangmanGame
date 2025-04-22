// src/api.js or server.js
const express = require('express');
const pool = require('./db'); // Assuming you have a db.js file to handle PostgreSQL connection

const app = express();
app.use(express.json()); // Allow JSON parsing

// Save or update player stats
app.post('/api/game-result', async (req, res) => {
  const { playerName, didWin } = req.body;

  if (!playerName || typeof didWin !== 'boolean') {
    return res.status(400).json({ error: 'Invalid data provided' });
  }

  try {
    // Insert the game result into the `players` table, or update if player exists
    await pool.query(`
      INSERT INTO players (name, games_played, games_won)
      VALUES ($1, 1, $2)
      ON CONFLICT (name)
      DO UPDATE SET 
        games_played = players.games_played + 1,
        games_won = players.games_won + $2
    `, [playerName, didWin ? 1 : 0]);

    // Return a success response
    res.status(200).json({ message: 'Game result saved' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to save game result' });
  }
});

// Endpoint to fetch player stats (win percentage, games played)
app.get('/api/customer-stats/:playerName', async (req, res) => {
  const { playerName } = req.params;

  try {
    // Fetch the total games played and the games won by the player
    const result = await pool.query(`
      SELECT name, games_played, games_won
      FROM players
      WHERE name = $1
    `, [playerName]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    const player = result.rows[0];
    const winPercentage = player.games_played > 0
      ? (player.games_won / player.games_played) * 100
      : 0;

    // Return the player stats including win percentage
    res.json({
      playerName: player.name,
      gamesPlayed: player.games_played,
      gamesWon: player.games_won,
      winPercentage: winPercentage.toFixed(2) // Format to 2 decimal places
    });
  } catch (err) {
    console.error('Error fetching player stats:', err);
    res.status(500).json({ error: 'Failed to fetch player stats' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
