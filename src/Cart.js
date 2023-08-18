export default class Cart {
  static lastId = 0;

  static generateId() {
    Cart.lastId++;
    return Cart.lastId;
  }

  constructor() {
    this.id = Cart.generateId();
    this.products = [];
  }
}
