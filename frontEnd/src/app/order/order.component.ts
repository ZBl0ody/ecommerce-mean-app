import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(private myProductService: ProductService) {}
  userOrders: { items: any[]; user: any; _id: string }[] = [];

  ngOnInit(): void {
    this.myProductService.getOrders().subscribe({
      next: (orders) => {
        console.log(orders);
        this.userOrders = orders;
      },
    });
  }
}
