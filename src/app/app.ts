import { Component, inject, signal } from '@angular/core';
import type { Product } from '../models/product';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { Products } from './services/products';

@Component({
  imports: [RouterOutlet, ProductList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly products = inject(Products);
  protected readonly cartItems = signal(0);
  productsInCart = signal<Product[]>([]);

  constructor() {
    this.products.load();
  }

  countCartItems(product: Product) {
    const currentCart = this.productsInCart();
    const productIndex = currentCart.findIndex((p) => p.id === product.id);

    if (productIndex === -1) {
      this.productsInCart.update((cart) => [...cart, product]);
    } else {
      this.productsInCart.update((cart) => cart.filter((p) => p.id !== product.id));
    }
    this.cartItems.set(this.productsInCart().length);
  }
}
