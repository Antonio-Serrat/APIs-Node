const express = require('express');
const path = require('path');
const { Router } = express;
const router = Router();
const Product = require('../models/product')

const productModel = new Product();
const upload = require('../middlewares/file');



router.get("/", (req, res) => {
    res.render('form')
})

router.get("/productos", async (req, res) => {
    const productos = await productModel.getAll()
    res.render('index', { productos })
})

router.post("/productos", upload.single("thumbnail"), async (req, res) => {
    const { title, price} = req.body;
    const thumbnail = path.join("static/img/" + req.file.filename)
    await productModel.save(title, price+"$", thumbnail).then(id =>{return id});
    const products = await productModel.getAll();

    res.redirect("/productos")
})

module.exports = router;
