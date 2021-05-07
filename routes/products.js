/*
  This file create QuerY Strings and Value Array for That
 */

const express = require("express");
const router = express.Router();


router.use((req, res, next) => {
  if(!req.session.user_id) {
    res.redirect('/login');
  }
  next();
});



module.exports = (db) => {

  // GET /products/:id
  // View single product
  router.get("/:id", (req, res) => {
    db.query("SELECT * From products WHERE id = $1", [req.params.id])
      .then((data) => {
        if (data.rows) {
          const templateVars = {
            product: data.rows[0],
          };
          res.render("product-page", templateVars);
        }
      })
      .catch((err) => {
        res.redirect("/");
      });
  });

  router.post("/:id/delete", (req, res) => {
    db.query(`DELETE FROM products WHERE id = $1`, [req.body.productId])
      .then(() => {

        return res.redirect("/");
      })
      .catch((err) => {
        console.log("err",err)
        res.status(500).json({ error: err.message });
      });
  });
  //

  // GET /products
  router.get('/', (req, res) => {

    let queryString = `SELECT * From products LIMIT 10;`;
    let queryParams =[];
    console.log(reg,body)

    if (req.body.owner_id) {
      queryParams.push(req.body.owner_id);
      queryString += `WHERE user_id = $${queryParams.length} `;
    };
    if (req.body.price) {
      queryParams.push(req.body.price);
      queryString += `AND ORDER BY products.price $${queryParams.length}`;
    };

    queryParams.push(req.body.limit);
    queryString += `
    LIMIT $${queryParams.length};
    `;
    db.query(queryString,queryParams)
      .then(data => {
        console.log(req.params)
        const templateVars = {
          data: data.rows
        };

        res.render("index", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  //search
  router.post('/search', (req, res) => {
    let queryString = `SELECT * From products
    WHERE products.name LIKE $1 OR
    products.description LIKE $1;`;
    const queryParams= [
      `%${req.body.search}%`
    ];
    console.log("before query:", req.params, req.body);
    db.query(queryString,queryParams)
    .then((data) => {
      console.log(data.rows)
      const templateVars = {
        data: data.rows
      };
      res.render("index", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //filter
  router.post('/filter', (req, res) => {
    let queryString = `SELECT * From products
    WHERE products.price LIKE $1 OR
    products.description LIKE $1;`;
    const queryParams= [
      `%${req.body.search}%`
    ];
    console.log("before query:", req.params, req.body);
    db.query(queryString,queryParams)
    .then((data) => {
      console.log(data.rows)
      const templateVars = {
        data: data.rows
      };
      res.render("index", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });


  return router;
};
