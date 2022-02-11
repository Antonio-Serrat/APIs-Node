const express = require('express');
const path = require('path');
const { Router } = express;
const router = Router();



router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

router.get("/newProduct", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/newProd.html"))
})

router.get("/allProducts", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/allProds.html"))
})


module.exports = router;
