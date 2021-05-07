const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if(!req.session.user_id) {
    res.redirect('/login');
  }
  next();
});

module.exports = (db) => {

  router.get("/", (req, res) => {
    product_id = req.params.id;
    const sql = `SELECT * FROM products WHERE id in
    (SELECT product_id FROM favourites WHERE user_id=${req.session.user_id})`;
    db.query(sql)
      .then((data) => {
        if (data.rows) {
          const templateVars = {
            data: data.rows,
          };
          res.render("index", templateVars);
        }
      })
      .catch((err) => res.json(err.message));
  });
  router.post("/:id", (req, res) => {
    product_id = req.params.id;
    const sql = `INSERT INTO favourites(user_id,product_id) Values($1,$2)`;
    values = [req.session.user_id, product_id];
    db.query(sql, values)
      .then(() => {
        res.json("ok");
      })
      .catch((err) => res.json(err.message));
  });
  router.post("/:id/delete", (req, res) => {
    product_id = req.params.id;
    const sql = `DELETE FROM favourites WHERE product_id = $2 AND user_id = $1 `;

    values = [req.session.user_id, product_id];
    db.query(sql, values)
      .then(() => {
        res.json("ok");
      })
      .catch((err) => res.json(err.message));
  });

  return router;
};
