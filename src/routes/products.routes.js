import { Router } from "express";
import ProductManager from "../ProductManager.js";

const prodsRouter = Router()
const path = "./product.json";
const productManagers = new ProductManager(path);

// METODO GET ALL PRODUCT CON LIMIT
prodsRouter.get('/', async (req, res) => {
  const products = await productManagers.getProducts();
  const { limit } = req.query;
  if (!limit) {
    res.status(200).send(products)
  }
  else {
    const prodsLimit = products.slice(0, limit)
    res.status(200).send(prodsLimit)
  }
})

// METODO GET PARA PRODUCT BY ID
prodsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const prod = await productManagers.getProductById(parseInt(id))
  if (prod)
    res.status(200).send(prod)
  else
    res.status(404).send("Producto no encontrado")
})

// METODO POST PARA ADD PRODUCT
prodsRouter.post('/', async (req, res) => {
  const product = await productManagers.addProduct(req.body);
  if (product) {
    res.status(400).send(product);
  } else {
    res.status(200).send(`El producto ha sido creado`);
  }
});

// METODO PUT PARA UPDATE PRODUCT
prodsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productManagers.updateProduct(parseInt(id), req.body);
  if (!product) {
    res.status(404).send("El producto ingresado no existe");
  } else {
    res.status(200).send(`El producto se ha actualizado`);
  }
});

// METODO DELETE PARA DETELETE PRODUCT
prodsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const deletedProduct = await productManagers.deleteProduct(parseInt(id))
  if (!deletedProduct)
    res.status(404).send("El ID seleccionado no existe")
  else
    res.status(200).send(`El producto ha sido eliminado`)
})

export default prodsRouter