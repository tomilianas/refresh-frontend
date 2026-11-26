import { Service, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../models/product';
import { finalize } from 'rxjs';
import { ProductsResponse } from '../../models/products-response';

@Service()
export class Products {
  private http = inject(HttpClient);

  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  load() {
    this._loading.set(true);
    this._error.set(null);

    this.http
      .get<ProductsResponse>('https://dummyjson.com/products')
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (p) => {
          this._products.set(p.products);
          console.log(p.products);
        },
        error: (err: HttpErrorResponse) => this._error.set(`Couldn't load products ${err.status}`),
      });
  }
}
