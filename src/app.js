import ProductManager from "./ProductManager.js";
import Product from "./Product.js";
import express from 'express'

const PORT = 8000
const app = express()
const path = ".src/product.json";
const productManagers = new ProductManager(path);
app.use(express.json())

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`)
})

app.get('/products', async (req,res) => {
    const products = await productManagers.getProducts();
    const {limit} = req.query;
    if(!limit){ 
        res.send(products)
    }
    else {
        const prodsLimit = products.slice(0,parseInt(limit))
        res.send(prodsLimit)
    }
})

app.get('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const product = productManagers.getProductById(id)
    if(product)
        res.send(product)
    else
        res.send("Producto no encontrado")
})



const product1 = new Product("Notebook", "HP 2023", 100000, "image", "AA34", 50)
const product2 = new Product("Notebook", "Baio 2022", 90000, "image", "AA24", 35)
const product3 = new Product("Notebook", "Baio 2021", 80000, "image", "AA14", 25)
const product4 = new Product("Notebook", "Baio 2020", 70000, "image", "AA25", 5)
const product5 = new Product("Notebook", "Baio 2019", 70000, "image", "AA20", 5)

// PARA AGREGAR UN PRODUCTO AL ARRAY DE PRODUCT.JSON
//productManagers.addProduct(product5);

// PARA CONSULTAR TODOS LOS PRODUCTOS DEL ARRAY DE PRODUCT.JSON
//console.log(productManagers.getProducts())

// PARA CONSULTAR PRODUCTOS POR ID EN EL ARRAY DE PRODUCT.JSON
//console.log(productManagers.getProductById(2))

// PARA MODIFICAR UN PRODUCTO EN EL ARRAY DE PRODUCT.JSON
//productManagers.updateProduct(5, {title:"Notebook",description:"Baio 2015",price:70000,thumbnail:"image",code:"AA20",stock:9})

// PARA BORRAR UN PRODUCTO DEL ARRAY DE PRODUCT.JSON
//productManagers.deleteProduct(4)

//const prods = [{title:"Notebook",description:"HP 2023", marca:"Bangho", price:100000,thumbnail:"image",code:"AA34",stock:50,id:1},{title:"Notebook",description:"Baio 2022", marca:"Baio", price:90000,thumbnail:"image",code:"AA24",stock:35,id:2},{title:"Notebook",description:"Baio 2021", marca:"Baio", price:80000,thumbnail:"image",code:"AA14",stock:25,id:3},{title:"Notebook",description:"Baio 2020", marca:"Baio", price:70000,thumbnail:"image",code:"AA25",stock:5,id:4},{title:"Notebook",description:"Baio 2019",marca:"Bangho",price:70000,thumbnail:"image",code:"AA20",stock:5,id:5}] 

/*app.get('/products/marca', (req, res) => {
    const {marca} = req.query
    const products = prods.filter(prod => prod.marca === marca)
    res.send(products)       
})*/

