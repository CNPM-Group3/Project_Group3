const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Use cors middleware to allow cross-origin requests
app.use(cors());

// API endpoint to serve notifications
app.get('/api/notifications', (req, res) => {
  const notificationsPath = path.join(__dirname, 'src', 'ThongBaoNotification', 'Notification.json');
  fs.readFile(notificationsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading notifications file:', err);
      return res.status(500).json({ error: 'Unable to retrieve notifications.' });
    }
    try {
      const notifications = JSON.parse(data);
      res.json(notifications);
    } catch (parseError) {
      console.error('Error parsing notifications JSON:', parseError);
      res.status(500).json({ error: 'Error parsing notifications data.' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 