import { Component, input, output } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import type { Product } from '../../models/product';

@Component({
  imports: [ProductCard],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList {
  readonly products = input<Product[]>();
  readonly cartItemChanged = output<Product>();
}
