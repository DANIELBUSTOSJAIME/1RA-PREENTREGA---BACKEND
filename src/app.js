import express from 'express'

import path from 'path'

import prodsRouter from "./routes/products.routes.js";

import cartRouter from './routes/cart.routers.js';

import Product from './Product.js';

import Cart from './Cart.js';

import { __dirname } from './path.js';


const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', prodsRouter)
app.use('/api/carts', cartRouter)
app.use('/static', express.static(path.join(__dirname, '/public')))

console.log(path.join(__dirname + '/public'))
app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`)
})


const product1 = new Product("Notebook", "HP 2023", 100000, "image", "AA34", 50, "TRUE", "electro")
const product2 = new Product("Notebook", "Baio 2022", 90000, "image", "AA24", 35, "TRUE", "electro")
const product3 = new Product("Notebook", "Baio 2021", 80000, "image", "AA14", 25, "TRUE", "electro")
const product4 = new Product("Notebook", "Baio 2020", 70000, "image", "AA25", 5, "TRUE", "electro")
const product5 = new Product("Notebook", "Baio 2019", 70000, "image", "AA20", 5, "TRUE", "electro")
const product6 = new Product("Notebook", "Baio 2018", 70000, "image", "AA21", 5, "TRUE", "electro")

// PARA AGREGAR UN PRODUCTO AL ARRAY DE PRODUCT.JSON
//productManagers.addProduct(product2);

// PARA CONSULTAR TODOS LOS PRODUCTOS DEL ARRAY DE PRODUCT.JSON
//console.log(productManagers.getProducts())

// PARA CONSULTAR PRODUCTOS POR ID EN EL ARRAY DE PRODUCT.JSON
//console.log(productManagers.getProductById(2))

// PARA MODIFICAR UN PRODUCTO EN EL ARRAY DE PRODUCT.JSON
//productManagers.updateProduct(5, {title:"Notebook",description:"Baio 2015",price:70000,thumbnail:"image",code:"AA20",stock:9, TRUE, "electro"})

// PARA BORRAR UN PRODUCTO DEL ARRAY DE PRODUCT.JSON
//productManagers.deleteProduct(4)


/*app.get('/products/category', (req, res) => {
    const {category} = req.query
    const products = prods.filter(prod => prod.category === category)
    res.send(products)       
})*/

const cart1 = new Cart() 