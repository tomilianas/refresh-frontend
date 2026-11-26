import { Product } from './product';

export interface ProductsResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}
