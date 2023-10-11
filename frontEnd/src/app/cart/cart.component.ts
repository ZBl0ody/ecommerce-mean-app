import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Iproduct } from '../shop/Iproduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any = [];
  length: number = 0;
  TotalPrice: number = 0;

  constructor(
    private myProductService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myProductService.getCart().subscribe({
      next: (data) => {
        this.cart = data.cartItems;
        this.length = data.cartItems.length;
        this.cart.forEach((el: Iproduct) => {
          this.TotalPrice += el.price;
        });
      },
    });
  }

  checkOut(cart: any): void {
    this.myProductService.addorder(cart).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
    this.router.navigate(['/order']);
  }
}
