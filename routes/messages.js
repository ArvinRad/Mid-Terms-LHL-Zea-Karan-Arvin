/*
  This file create Query and Routing for Messages

/*
 * All routes for Messages are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // router.use((req, res, next) => {
  //   if(!req.cookies.user_id) {
  //     res.redirect('/login');
  //   }
  //   next;
  // });

  // GET /messages
  // router.get("/:id", (req, res) => {
    // res.render("product-message");
    // let queryString = `SELECT * From messages LIMIT 10;`;
    // let queryParams =[];
    // db.query(queryString,queryParams)
    //   .then(data => {
    //     console.log(req.params)
    //     const products = data.rows;
    //     res.json({ products });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
    // console.log(req.body);
  // });

  // GET /messages/search
  // router.get('/search', (req, res) => {
  //   let queryString = `SELECT * From messages LIMIT 10;`;
  //   let queryParams =[];
  //   db.query(queryString,queryParams)
  //     .then(data => {
  //       console.log(req.params)
  //       const products = data.rows;
  //       res.json({ products });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  // POST /messages
  // GET /products/:id/message
  // router.get("/:id", (req, res) => {
    // console.log(req.params);
    // db.query('SELECT * From products WHERE id = $1', [req.params.id])
    // .then((data) => {
    //   if(data.rows[0]){

    //     const product = data.rows[0];

    //     //product ID
    //     console.log(product.id)
    //     // sender ID
    //     // This should be logged in user ID

    //     const templateVars = {
    //       product: product
    //     };
    //     res.render('product-message', templateVars);
    //   } else {
    //     res.redirect("/");
    //   }
    // })
    // .catch(err => {
    //   res
    //       .status(500)
    //       .json({ error: err.message });
    // });
  // 

  router.post("/:id", (req, res) => {
    //  console.log("message:",req.body)
    const product_id = req.body.productId;
    const message = req.body.message;
    let query = `INSERT INTO messages
        (message, sender_id, product_id, thread_master_id)
         VALUES($1,$2,$3,$4)`;
    const values = [message, 1, Number(product_id), 3];
    db.query(query, values)
      .then(() => {
       res.json(200,"ok")
      })
      .catch((err) => {
        console.log("error:", err);
        res.status(500).json({ error: err.message });
      });
  });
  

router.get("/:id", (req, res) => {
let query2 = `SELECT id,message,sender_id FROM messages WHERE product_id = $1 AND sender_id = $2 `;

const product_id = req.params.id;
const sender_id = req.query.userId;
const values2 = [product_id, sender_id];

db.query(query2, values2)
  .then((data) => {
    // console.log(data.rows)
    res.json(200, data.rows);
    
  })
  .catch((err) => {
    // console.log("error:", err);
    res.status(500).json({ error: err.message });
  });
});
return router;
};