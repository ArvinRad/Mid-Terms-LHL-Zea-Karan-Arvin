const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/:id", (req, res) => {
    product_id = req.params.id;
    const sql = `INSERT INTO favourites(user_id,product_id) Values($1,$2)`;
    values = [1, product_id];
    db.query(sql, values)
      .then(() => {
        res.json("ok");
      })
      .catch((err) => res.json(err.message));
  });
  router.post("/:id/delete", (req, res) => {
    product_id = req.params.id;
    const sql = `DELETE FROM favourites WHERE product_id = $2 AND user_id = $1 `;

    values = [1, product_id];
    db.query(sql, values)
      .then(() => {
        res.json("ok");
      })
      .catch((err) => res.json(err.message));
  });

  return router;
};
