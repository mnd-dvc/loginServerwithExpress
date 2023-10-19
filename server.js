const express = require("express");
const cors = require("cors");
const pool = require("./database");

const accountsRoutes = require("./src/accounts/routes"); 

const { postUser } = require("./src/accounts/controller");

const app = express();
const port = 4000; 

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use("/api/accounts", accountsRoutes); 
app.post("/api/login", postUser);
app.post("/api/adduser", (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];

  console.log("Username:" + username);
  console.log("Password: " + password);

  const insertSTMT = `INSERT INTO accounts (username, password) VALUES ('${username}', '${password}');`;

  pool
    .query(insertSTMT)
    .then((response) => {
      console.log("Data Saved");
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

  res.send("Successful" + req.body);
});

app.listen(port, () => console.log(`App Listening This Port: ${port}`));
