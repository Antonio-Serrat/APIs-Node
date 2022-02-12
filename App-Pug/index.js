const express = require('express')
const path = require('path');
const app = express();
const PORT = process.env.PORT | 8080

const productsRouter = require("./routes/products")
const homeRouter = require('./routes/home');
const pugEngine = require('./engines/pug')
const pugRouter = require('./routes/pug')

//TEMPLATES
pugEngine(app)

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//STATIC FILES
app.use("/static", express.static(path.join(__dirname, 'public')))

//ROUTERS
app.use("/", homeRouter);


const server = app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${PORT}`)
})

server.on("error", (err) => {
    console.log(err)
})