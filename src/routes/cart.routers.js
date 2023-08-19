import { Router } from "express";
import CartManager from "../CartManager.js"
import Cart from "../Cart.js";

const cartsRouter = Router()
const cartManagers = new CartManager();

// METODO GET PARA ALL CARTS
cartsRouter.get('/', async (req, res) => {
  const carts = await cartManagers.getCart();
  res.status(200).send(carts)
}
)

// METODO POST PARA CREAR UN NEW CART AGREGANDO {"products":[]} EN POSTMAN
cartsRouter.post('/', async (req, res) => {
  const newCart = new Cart();
  await cartManagers.addCart(newCart);
  res.status(200).send("Un nuevo carrito ha sido creado")
})

// METODO GET PARA BUSCAR UN CART BY ID
cartsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const cart = await cartManagers.getCartBYid(parseInt(id));
  if (cart) {
    res.status(200).send(cart.products);
  } else {
    res.status(404).send("Carrito no encontrado");
  }
})

// METODO POST PARA AGREGAR UN ID PRODUCT A UN CART ID ESPECIFICO AGREGANDO {"quantity": "X"} EN POSTMAN
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (!quantity || isNaN(quantity) || quantity <= 0) {
    return res.status(400).send("Cantidad inválida");
  }

  const product = {
    product: `producto${pid}`,
    quantity: parseInt(quantity),
  };

  const productAdded = await cartManagers.addProductToCart(cid, product);

  if (productAdded) {
    res.status(200).send("Producto agregado al carrito");
  } else {
    res.status(404).send("Carrito no encontrado");
  }
});

export default cartsRouter