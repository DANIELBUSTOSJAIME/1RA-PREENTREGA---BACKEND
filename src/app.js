import ProductManager from "./ProductManager.js";
import Product from "./Product.js";
import express from 'express'

const PORT = 8010
const app = express()
const path = "./product.json";
const productManagers = new ProductManager(path);
app.use(express.json())

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`)
})

app.get('/products', async (req,res) => {
    const products = await productManagers.getProducts();
    const {limit} = req.query;
    if(!limit){ 
        res.status(200).send(products)
    }
    else {
        const prodsLimit = products.slice(0,limit)
        res.status(200).send(prodsLimit)
    }
})

app.get('/products/:id', async (req, res) => {
    const id = req.params.id
    const prod = await productManagers.getProductById(parseInt(id))
    if(prod){
        res.status(200).send(prod)
        console.log("no me trae",prod)}
    else
        res.status(404).send("Producto no encontrado")
})

   

const product1 = new Product("Notebook", "HP 2023", 100000, "image", "AA34", 50)
const product2 = new Product("Notebook", "Baio 2022", 90000, "image", "AA24", 35)
const product3 = new Product("Notebook", "Baio 2021", 80000, "image", "AA14", 25)
const product4 = new Product("Notebook", "Baio 2020", 70000, "image", "AA25", 5)
const product5 = new Product("Notebook", "Baio 2019", 70000, "image", "AA20", 5)

// PARA AGREGAR UN PRODUCTO AL ARRAY DE PRODUCT.JSON
//productManagers.addProduct(product3);

// PARA CONSULTAR TODOS LOS PRODUCTOS DEL ARRAY DE PRODUCT.JSON
//console.log(productManagers.getProducts())

// PARA CONSULTAR PRODUCTOS POR ID EN EL ARRAY DE PRODUCT.JSON
//console.log(productManagers.getProductById(2))

// PARA MODIFICAR UN PRODUCTO EN EL ARRAY DE PRODUCT.JSON
//productManagers.updateProduct(5, {title:"Notebook",description:"Baio 2015",price:70000,thumbnail:"image",code:"AA20",stock:9})

// PARA BORRAR UN PRODUCTO DEL ARRAY DE PRODUCT.JSON
//productManagers.deleteProduct(3)


/*app.get('/products/marca', (req, res) => {
    const {marca} = req.query
    const products = prods.filter(prod => prod.marca === marca)
    res.send(products)       
})*/

