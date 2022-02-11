import Products from '../../models/products';

const products = new Products();

let allProducts = products.getAll().then(allProducts =>{return allProducts})
console.log(allProducts)

let template = document.getElementById("template").innerHTML
let compile = Handlebars.compile(template)
let result = compile({allProducts})
document.getElementById("index").innerHTML += result