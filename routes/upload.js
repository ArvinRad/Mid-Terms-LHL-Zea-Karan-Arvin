const express = require("express");
const router = express.Router();


router.use((req, res, next) => {
  if(!req.session.user_id) {
    res.redirect('/login');
  }
  next();
});
module.exports = (db) => {
   router.post("/", (req, res) => {

     const body = req.body;

    if (!req.files ||  Object.keys(body).length === 0 || Object.keys(req.files).length === 0 || body.product_name.length === 0
    || body.description.length === 0 || body.price.length === 0 || body.stock.length === 0 ) {
      return res.status(400).send('Please provide all information');
    }

    const name = Date.now();
    let thumbnail = req.files.thumbnail;
    //console.log(thumbnail)
    let uploadPath = "./public/uploads/" + name+".png";
    //console.log(uploadPath)
    thumbnail.mv(uploadPath, function (err) {
      let query = `INSERT INTO products
      (name,
        description,
        price,
        stock,
        user_id,
        thumbnail
        ) VALUES($1,$2,$3,$4,$5,$6) RETURNING id;`;

      const values = [
        body.product_name,
        body.description,
        Number(body.price),
        Number(body.stock),
        req.session.user_id,
        name + ".png"
      ];
      //console.log(values);
      db.query(query, values)
      .then((data) => {
        db.query(`SELECT * FROM products WHERE id = ${data.rows[0].id};`)
        .then((data) => {
          const templateVars = {
            product: data.rows[0]
          };
          res.render("product-page", templateVars);
         //console.log("inside query:", data.rows[0]);
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
        });

    });

    router.get("/", (req, res) => {
      res.render("product_upload");
    });
    return router;
  };
