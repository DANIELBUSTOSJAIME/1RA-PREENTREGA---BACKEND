import { promises as fs } from "fs";


export default class CartManager {
  constructor() {
      this.path = './cart.json';
      this.carts = []
  }

  async getCart(){
    try{
      const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
      return carts;
    } catch (error){
      return []
    }
  }

  async addCart(cart) {
    this.carts.push(cart);
    await fs.writeFile(this.path, JSON.stringify(this.carts));
  }

  async getCartBYid(id){
    const carts = await this.getCart();
    const cart = carts.find((cart) => cart.id === parseInt(id));
    return cart;
  }

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


