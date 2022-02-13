const express = require('express')
const path = require('path');
const app = express();
const PORT = process.env.PORT | 8080
const homeRouter = require('./routes/home');
const { engine } = require('express-handlebars');



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', engine({
  layoutsDir: path.join(__dirname, 'views/layouts'),
  defaultLayout: 'index'
}));

// app.set('views', './views')
app.set('view engine', 'handlebars')

app.use("/static", express.static(path.join(__dirname, 'public')))
app.use("/", homeRouter);

// app.get("/", (req, res) => {
//   res.render("addProduct", {})
// })


const server = app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${PORT}`)
})

server.on("error", (err) => {
    console.log(err)
})