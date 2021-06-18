import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signin.js";
import handleProfile from "./controllers/profile.js";
import { handleEntries, handleApiCall } from "./controllers/image.js";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "root",
    database: "smart-brain",
  },
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", handleSignIn(db, bcrypt));

app.post("/register", handleRegister(db, bcrypt));

app.get("/profile/:id", handleProfile(db));

app.put("/image", handleEntries(db));

app.post("/imageurl", handleApiCall);

app.listen(process.env.PORT || port, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
