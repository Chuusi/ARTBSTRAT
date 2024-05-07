const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//Conexión con la DB
const {connect} = require("./src/utils/db");
connect();

//Conexión cloudinary
const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();

//Constante puerto
const PORT = process.env.PORT;

//Creación server
const app = express();

//Limitaciones server
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//Cors de seguridad
var cors = require("cors");
app.use(cors());

//Aquí vendrán las rutas


//Errores de rutas y server
app.use("*", (req, res, next) => {
    const error = new Error("❌ Ruta no encontrada ❌");
    error.status = 404;
    return next(error);
});

app.use((error, req, res) => {
    return res
        .status(error.status || 500)
        .json(error.message || "🤨 Error inesperado 🤨");
});

//Escucha y conexión al puerto
app.listen(PORT, () => {
    console.log(
        `🎊Backend ARTBSTRAT en funcionamiento en el puerto "http://localhost:${PORT}"🎊`
    );
});
