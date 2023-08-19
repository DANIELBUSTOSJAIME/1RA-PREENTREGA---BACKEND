import fs from "fs";

export default class Cart {
  static lastId = 0;

  static generateId() {
    try {
      const carts = JSON.parse(fs.readFileSync('./cart.json', 'utf-8'));
      const lastId = carts.length > 0 ? carts[carts.length - 1].id : 0;
      return lastId + 1;
    } catch (error) {
      console.log('Error al obtener el último ID del carrito:', error);
      return 0;
    }
  }

  constructor() {
    this.id = Cart.generateId();
    this.products = [];
  }
}