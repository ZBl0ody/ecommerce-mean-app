require("dotenv").config();
// Server requiremetns
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const PORT = 3000;
const app = express();
// Importing modules
// Importing Routes
const userRoutes = require("./routes/user");
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const productRoutes = require("./routes/products");
// Using important middlewares
const { requireAuth, checkUser } = require("./middlewares/authMiddleware");

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());
//
app.set("view engine", "ejs");

// Using Routes
app.use(signupRoutes);
app.use(loginRoutes);
app.use(logoutRoutes);
app.use(productRoutes);
app.use(userRoutes);

// Database connect
mongoose
  .connect(
    `mongodb+srv://Z_Bl0ody:boody01156@cluster0.psfolkh.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected💾💾");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors({ origin: "http://localhost:4200", credentials: true }));

// test route (delete me)
app.get("*", checkUser);
app.get("/testAuth", requireAuth, (req, res) => {
  res.render("testAuth");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}💻💻`);
});
