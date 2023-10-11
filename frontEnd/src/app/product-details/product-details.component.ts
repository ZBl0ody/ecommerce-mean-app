import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Iproduct } from '../shop/Iproduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  selectedProductId: any = '';
  selectedProduct!: any;
  constructor(
    public myRouts: ActivatedRoute,
    public myProductService: ProductService
  ) {
    this.selectedProductId = this.myRouts.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.selectedProduct = this.myProductService
      .getProductById(this.selectedProductId)
      .subscribe({
        next: (singelProduct) => {
          this.selectedProduct = singelProduct;
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
}
