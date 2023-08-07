const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "khoa",
  database: "crud_contact",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM user_db";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { name, desc } = req.body;
  const sqlInsert =
    "INSERT INTO user_db (name, desc) VALUES (?, ?)";
  db.query(sqlInsert, [name, desc], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM user_db WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM user_db WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, desc } = req.body;
  const sqlUpdate = "UPDATE user_db SET name = ?,  desc = ? WHERE id = ?";
  db.query(sqlUpdate, [name, desc, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.get("/", (req, res) => {
  //   const sqlInsert =
  //     "INSERT INTO contact_db (name, email, contact) VALUES ('john doe', 'johndoe@gmail.com',34455666)";
  //   db.query(sqlInsert, (error, result) => {
  //     console.log("error", error);
  //     console.log("result", result);
  //     res.send("Hello Express");
  //   });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
