import { promises as fs } from "fs";

const path = "./product.json";

export default class ProductManager {
  constructor() {
    this.products = [];
  }
  // METODO GET PRODUCT
  async getProducts() {
    const products = JSON.parse(await fs.readFile(path, "utf-8"));
    console.log(products);
    return products;
  }
  // METODO GET PRODUCT BY ID
   async getProductById(id) {
    const products = JSON.parse(await fs.readFile(path, "utf-8"));
    const prod = products.find((product) => product.id === id);
    if (prod) {
      //console.log(prod);
      return prod;
    } else {
      //console.log("El ID ingresado no existe");
      return "El ID ingresado no existe"
    }
  }
  // METODO ADD PRODUCT CON VALIDACION DE CODE
   async addProduct(product) {
    const products = JSON.parse(await fs.readFile(path, "utf-8"));
    const productExist = products.find((prod) => prod.code === product.code);
    if (productExist) {
        console.log("El código agregado ya existe");
    } else{
        products.push(product);
        await fs.writeFile(path, JSON.stringify(products));
    }
  }
  // METODO UPDATE PRODUCT
  async updateProduct(id, updatedProduct) {
    const products = JSON.parse(await fs.readFile(path, "utf-8"));
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index].title = updatedProduct.title;
      products[index].description = updatedProduct.description;
      products[index].price = updatedProduct.price;
      products[index].thumbnail = updatedProduct.thumbnail;
      products[index].code = updatedProduct.code;
      products[index].stock = updatedProduct.stock;
      await fs.writeFile(path, JSON.stringify(products));
    } else {
      console.log("El ID ingresado no existe");
    }
  }
   // METODO DELETE PRODUCT
    async deleteProduct(id){
        const products = JSON.parse(await fs.readFile(path, "utf-8"));
        const productDelete = products.find((prod) => prod.id === id);
        if(productDelete){
            await fs.writeFile(path, JSON.stringify(products.filter(prod => prod.id != id)));
        }else {
      console.log("El ID ingresado no existe");
    }
    }
}