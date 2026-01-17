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
  this.productService.getAll().subscribe({
    next: (data) => {
      this.products = data;
    },
    error: (err) => {
      console.error('Failed to load products', err);
    }
  });
}

  saveProduct(): void {
  if (this.isEdit && this.product.id) {
    this.productService.update(this.product).subscribe(() => {
      this.loadProducts();
      this.resetForm();
    });
  } else {
    const { id, ...productWithoutId } = this.product; // 👈 KEY LINE
    this.productService.add(productWithoutId).subscribe(() => {
      this.loadProducts();
      this.resetForm();
    });
  }
}


  editProduct(p: Product): void {
    this.product = { ...p };
    this.isEdit = true;
  }

  deleteProduct(id?: number): void {
  if (id === undefined) {
    console.error('Product id is undefined');
    return;
  }
  this.productService.delete(id).subscribe(() => {
    this.loadProducts();
  });
}

  resetForm(): void {
  this.product = { name: '', price: null!, category: '' };
  this.isEdit = false;
}
}
