import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import publicRoutes from './api/publicRoutes.js';
import authRoutes from './api/authRoutes.js';
import dashboardRoutes from './api/dashboardRoutes.js';
import registerRoutes from './api/registerRoutes.js';
import asignaturasRoutes from './api/asignaturasRoutes.js';
import profesoresRoutes from './api/profesoresRoutes.js';
import horariosRoutes from './api/horariosRoutes.js';
import encuestasRoutes from './api/encuestasRoutes.js';
import ayudaRoutes from './api/ayudaRoutes.js';
import noticiasRoutes from './api/noticiasRoutes.js';
import reportesRoutes from './api/reportesRoutes.js';
import chatbotRoutes from './api/chatbotRoutes.js';
import estudiantesRoutes from './api/estudiantesRoutes.js';
import estudianteRoutes from './api/estudianteRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
let db;
const createPool = () => {
  if (!db) {
    db = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      acquireTimeout: 60000,
      timeout: 60000,
      reconnect: true,
      idleTimeout: 300000,
      maxIdle: 10,
      keepAliveInitialDelay: 0,
      enableKeepAlive: true,
    });

    db.on('connection', () => {
      console.log("✅ Nueva conexión MySQL establecida");
    });

    db.on('error', (err) => {
      console.error('❌ Error en el pool de conexiones:', err);
    });

    console.log("✅ Pool de conexiones MySQL inicializado");
  }
  return db;
};

createPool();

app.use((req, res, next) => {
  req.db = db;
  next();
});
app.use('/api', publicRoutes);
app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', registerRoutes);
app.use('/api', asignaturasRoutes);
app.use('/api', profesoresRoutes);
app.use('/api', horariosRoutes);
app.use('/api', encuestasRoutes);
app.use('/api', ayudaRoutes);
app.use('/api', noticiasRoutes);
app.use('/api', reportesRoutes);
app.use('/api', chatbotRoutes);
app.use('/api', estudiantesRoutes);
app.use('/api', estudianteRoutes);

export default app;
