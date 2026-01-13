import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 70000, category: 'Electronics' },
    { id: 2, name: 'Phone', price: 30000, category: 'Electronics' },
    { id: 3, name: 'Smart Watch', price: 3000, category: 'Electronics' },
    { id: 4, name: 'Shirt', price: 1500, category: 'Apparel' },
    { id: 5, name: 'Book', price: 500, category: 'Stationery' }
  ];

  getAll(): Product[] {
    return this.products;
  }

  add(product: Product): void {
    this.products.push(product);
  }

  update(product: Product): void {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
  }

  delete(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }
}
