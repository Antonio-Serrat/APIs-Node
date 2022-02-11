const express = require('express')
const path = require('path');
const app = express();
const PORT = process.env.PORT | 8080
const productsRouter = require("./routes/products")
const homeRouter = require('./routes/home');
const { engine } = require('express-handlebars');


app.set('view engine', 'hbs');
app.engine('hbs', engine({
  layoutsDir: path.join(__dirname, 'views/layouts'),
  extname: 'hbs',
  defaultLayout: 'index'
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/static", express.static(path.join(__dirname, 'public')))

app.use("/api/productos", productsRouter);
app.use("/", homeRouter);



const server = app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${PORT}`)
})

server.on("error", (err) => {
    console.log(err)
})