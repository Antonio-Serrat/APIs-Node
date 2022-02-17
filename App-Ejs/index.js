const express = require('express')
const path = require('path');
const app = express();
const PORT = process.env.PORT | 8080

const homeRouter = require('./routes/home');
const ejsEngine = require('./engines/ejss')

//TEMPLATES
ejsEngine(app)

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//STATIC FILES
app.use("/static", express.static(path.join(__dirname, 'public')))

//ROUTERS
app.use("/", homeRouter);



//CONNECTION
const server = app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${PORT}`)
})

server.on("error", (err) => {
    console.log(err)
})