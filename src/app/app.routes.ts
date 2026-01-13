import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component'; // ✅ FIXED

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductComponent }
];