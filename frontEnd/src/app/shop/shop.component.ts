import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductService } from '../product.service';
import { Iproduct } from './Iproduct';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent {
  products: Iproduct[] = [];

  total_items: number = 100;
  pages_size: number = 10;
  current_page: number = 1;
  constructor(public myProductService: ProductService) {}
  ngOnInit(): void {
    this.myProductService
      .getAllProduct(this.current_page, this.pages_size)
      .subscribe({
        next: (data) => {
          console.log(data);

          this.products = data.products;
          this.total_items = data.totalProductCount;
        },
      });
  }

  addToCard(product: Iproduct): void {
    this.myProductService.addToCart(product).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  changePage(page: PageEvent) {
    this.current_page = page.pageIndex + 1;
    this.pages_size = page.pageSize;
    this.myProductService
      .getAllProduct(this.current_page, this.pages_size)
      .subscribe({
        next: (data) => {
          this.products = data.products;
        },
      });
  }
}
