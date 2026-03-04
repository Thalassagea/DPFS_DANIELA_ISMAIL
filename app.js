// app.js
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

// ---------------------------
//  CONFIGURACIÓN GENERAL
// ---------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// ---------------------------
//  CORS (desarrollo)
// ---------------------------
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
  })
);

// ---------------------------
//  SEGURIDAD
// ---------------------------
app.use(helmet());

// ---------------------------
//  SESIONES Y COOKIES
// ---------------------------
// cookie-parser con secret para poder usar signed cookies
app.use(cookieParser(process.env.COOKIE_SECRET || "MindCareCookieSecret"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "MindCareSessionSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    }
  })
);

// middleware usuario logueado
const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware");
app.use(userLoggedMiddleware);

// ---------------------------
//  RUTAS
// ---------------------------
const mainRoutes = require("./routes/mainRoutes");
const coursesRoutes = require("./routes/coursesRoutes");
const usersRoutes = require("./routes/usersRoutes");

app.use("/", mainRoutes);
app.use("/courses", coursesRoutes);
app.use("/users", usersRoutes);

// ---------------------------
//  RUTAS API
// ---------------------------
const apiUsersRoutes = require("./routes/apiUsers");
const apiCoursesRoutes = require("./routes/apiCourses");
const apiProductsRoutes = require("./routes/apiProducts");

app.use("/api/users", apiUsersRoutes);
app.use("/api/courses", apiCoursesRoutes);
app.use("/api/products", apiProductsRoutes);

// ---------------------------
//  MANEJO DE ERRORES
// ---------------------------
app.use((err, req, res, next) => {
  console.error("Error inesperado:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ---------------------------
//  SERVIDOR
// ---------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
