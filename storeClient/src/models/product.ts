class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantityInStock: number;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    pictureUrl: string,
    type: string,
    brand: string,
    quantityInStock: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.pictureUrl = pictureUrl;
    this.type = type;
    this.brand = brand;
    this.quantityInStock = quantityInStock;
  }
}

export default Product;
