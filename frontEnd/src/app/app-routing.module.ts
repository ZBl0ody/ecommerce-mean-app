import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/:id', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
