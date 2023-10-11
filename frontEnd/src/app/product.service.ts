import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(public http: HttpClient) {}
  urlBase = 'http://localhost:3000';

  getAllProduct(pageNumber: number, page_size: Number): Observable<any> {
    return this.http.get(
      `${this.urlBase}/products?page=${pageNumber}&pageSize=${page_size}`
    );
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get(`${this.urlBase}/singleProduct/${productId}`);
  }

  addToCart(product: any): Observable<any> {
    return this.http.post(`${this.urlBase}/addtocart`, {
      productId: product._id,
    });
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.urlBase}/cart`);
  }

  addorder(cartItems: any): Observable<any> {
    return this.http.post(`${this.urlBase}/addorder`, {
      cartItems: cartItems,
    });
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.urlBase}/orders`);
  }
}
