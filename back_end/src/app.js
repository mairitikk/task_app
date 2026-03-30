const express = require("express");
const cors = require("cors");

// Creación de instancia de express app
const app = express();

const corsOptions = {
  origin: ["https://your-production-domain.com"], // Replace with your production frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Configuración express app
app.use(cors(corsOptions)); // Integración de CORS middleware con opciones
app.use(express.json()); // Parsear requests en formato JSON

// Ruta
app.use("/api", require("./routes/api"));

module.exports = app;
