// LIBRARYS
import express from 'express'
import path from 'path'
import { __dirname } from './path.js';
import multer from 'multer';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

// ROUTES
import prodsRouter from "./routes/products.routes.js";
import cartRouter from './routes/cart.routers.js';

//import Product from './Product.js';

const PORT = 8080
const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}${file.originalname}`)
    }
})
const serverExpress = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', engine()) 
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))
const upload = multer ({ storage: storage})


app.use('/api/products', prodsRouter)
app.use('/api/carts', cartRouter)
app.use('/static', express.static(path.join(__dirname, '/public')))
app.get('/static', (req, res) =>{
    res.render('chat')
})
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("Imagen cargada")
})

const io = new Server(serverExpress)
const mensajes = []

io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")
    socket.on('mensajeConexion', (info) => {
        console.log(info)
    })
    socket.on('mensaje', (infoMensaje) => {
        console.log(infoMensaje)
        mensajes.push(infoMensaje)
        socket.emit('mensajes', mensajes)
    })
    
})

console.log(path.join(__dirname + '/public'))


 
/*const product1 = new Product("Notebook", "HP 2023", 100000, "image", "AA34", 50, "TRUE", "electro")
const product2 = new Product("Notebook", "Baio 2022", 90000, "image", "AA24", 35, "TRUE", "electro")
const product3 = new Product("Notebook", "Baio 2021", 80000, "image", "AA14", 25, "TRUE", "electro")
const product4 = new Product("Notebook", "Baio 2020", 70000, "image", "AA25", 5, "TRUE", "electro")
const product5 = new Product("Notebook", "Baio 2019", 70000, "image", "AA20", 5, "TRUE", "electro")
const product6 = new Product("Notebook", "Baio 2018", 70000, "image", "AA21", 5, "TRUE", "electro")
*/
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

