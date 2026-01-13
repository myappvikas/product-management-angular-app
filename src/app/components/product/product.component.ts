import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';          // ✅ FIXED
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  product: Product = { id: 0, name: '', price: 0, category: '' };
  isEdit = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getAll();
  }

  saveProduct(): void {
    if (this.isEdit) {
      this.productService.update(this.product);
    } else {
      this.productService.add({ ...this.product });
    }
    this.resetForm();
    this.loadProducts();
  }

  editProduct(p: Product): void {
    this.product = { ...p };
    this.isEdit = true;
  }

  deleteProduct(id: number): void {
    this.productService.delete(id);
    this.loadProducts();
  }

  resetForm(): void {
    this.product = { id: 0, name: '', price: 0, category: '' };
    this.isEdit = false;
  }
}
