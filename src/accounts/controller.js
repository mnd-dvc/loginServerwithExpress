const pool = require("../../database");
const jwt = require("jsonwebtoken");
const fs=require("fs")
const privateKey = fs.readFileSync("private.pem")

const getAccounts = (req, res) => {
  pool.query("SELECT * FROM  accounts ", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const postUser = (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM accounts WHERE username='" + username + "'";

  pool.query(query, (err, result) => {
    if (err) throw err;
    console.log(result.rows);
    if (result.rows.length !== 0) {
      const user = result.rows[0];
      if (user.username === username && user.password === password) {
        //token burada üretilir ve mesaj gönderilir
        const payload = {
          username: username,

        };
        jwt.sign(
          {...payload},
          privateKey,
          { 
            algorithm:"RS256",
            expiresIn: "10h" },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token: token,
              message: "Giriş Başarılı",
            });
          }
        );
      } else {
        return res
          .status(401)
          .json({ message: "Kullanıcı adı veya şifre hatalı" });
      }
    } else {
      return res.status(401).json({
        message: "Kullanıcı Adı ile Herhangi Bir Kayıt Bulunamadı...",
      });
    }
  });
};

module.exports = {
  getAccounts,
  postUser,
};
