import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();
  cartChange = output<Product>();
  isAddedToCart = false;
}
