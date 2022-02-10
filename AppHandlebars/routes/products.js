const express = require('express');
const path = require('path');
const { Router } = express;
const upload = require('../middlewares/file');
const ProductModel = require('../models/products')

const router = Router();

const products = new ProductModel();

router.post("/", upload.single("thumbnail"), async (req, res) => {
    const { title, price } = req.body;
    const thumbnail = path.join(__dirname, "../public/img/" + req.file.filename)
    let id = await products.save(title, price, thumbnail).then(id =>{return id});
    console.log(id)
    res.status(201).send({ id, title, price, thumbnail })
})

router.get("/", async (req, res) => {
    try {
        const allProducts = await products.getAll().then(allProducts => {return allProducts})
        res.status(200).send(allProducts)
    } catch (error) {
        res.status(500).send("No se pudo acceder a los productos debi al siguiente error: " + error)
    }
})

router.get("/:id", async (req, res) => {

    const product = await products.getById(req.params.id).then(product => { return product })
    !product ? res.status(404).send({ error: "Producto no encontrado" }) : res.status(200).send(product)

})

router.put("/:id", (req, res) => {
    const allProds = products.getAll().then(allProds => { return allProds })
    console.log(allProds)

    const product = allProds.find(product => product.id == req.params.id)
    const productUpdate = req.body;
    if (product) {
        productUpdate.tittle != null ? product.title = productUpdate.title : product.title = product.title;
        productUpdate.price != null ? product.price = productUpdate.price : product.price = product.price;
        productUpdate.thumbnail != null ? product.thumbnail = productUpdate.thumbnail : product.thumbnail = product.thumbnail;

        res.status(203).send("Producto actualizado")
    } else {
        res.status(404).send("No se enconto el producto")
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const product = await products.deleteById(req.params.id)        
        res.status(202).send("Se borro con exito el producto")    
    } catch (error) {
        res.status(404).send("No se encontro el producto")
    }
})


module.exports = router;