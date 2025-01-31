import 'dotenv/config';
import express from 'express';
import connectToDB from './Database/db.js';
import authRoutes from './Routes/routes.authRoutes.js';
import taskRoutes from './Routes/routes.taskRoutes.js';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
    connectToDB();
    console.log(`Server running on port ${port}`)
});
