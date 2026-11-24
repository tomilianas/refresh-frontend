import { Component, signal } from '@angular/core';
import type { Product } from '../models/product';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './product-list/product-list';
import mockData from '../../dummyProducts.json';

@Component({
  imports: [RouterOutlet, ProductList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly products = signal<Product[]>([...mockData.products]);
  protected readonly cartItems = signal(0);
  productsInCart = signal<Product[]>([]);

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
