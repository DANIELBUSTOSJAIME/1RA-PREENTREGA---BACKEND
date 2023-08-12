export default class Product {
    
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = Product.incrementedId()
    }

    static incrementedId(){
      if(this.IdIncremented){
        this.IdIncremented++
      }else{
        this.IdIncremented = 1
      }return this.IdIncremented  
    }
}

