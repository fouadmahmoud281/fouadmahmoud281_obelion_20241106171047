const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const venueRoutes = require('./routes/venueRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'db',
    user: 'agent',
    password: 'agentpass',
    database: 'Obelien AI'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.use('/api', authRoutes);
app.use('/api', bookingRoutes);
app.use('/api', venueRoutes);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
