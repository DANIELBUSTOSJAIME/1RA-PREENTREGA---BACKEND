import { promises as fs } from "fs";

// CLASE CARTMANAGER
export default class CartManager {
  constructor() {
    this.path = './cart.json';
    this.carts = []
  }

  // METODO GETCART
  async getCart() {
    try {
      const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
      return carts;
    } catch (error) {
      return []
    }
  }

  // METODO ADDCART
  async addCart(cart) {
    try {
      const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
      carts.push(cart);
      await fs.writeFile(this.path, JSON.stringify(carts));
    } catch (error) {
      console.log("Error al agregar el carrito:", error);
    }
  }

  // METODO GETCARTID
  async getCartBYid(id) {
    const carts = await this.getCart();
    const cart = carts.find((cart) => cart.id === parseInt(id));
    return cart;
  }

  // METODO ADDPRODUCTTOCART
  async addProductToCart(cartId, product) {
    const carts = await this.getCart();
    const cartIndex = carts.findIndex((c) => c.id == cartId);
    if (cartIndex !== -1) {
      const cart = carts[cartIndex];
      cart.products.push(product);
      await fs.writeFile(this.path, JSON.stringify(carts));
      return true;
    }
    return false;
  }
}


