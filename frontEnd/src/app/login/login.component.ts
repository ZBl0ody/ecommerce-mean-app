import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private userServ: UserService,
    private router: Router,
    private authService: AuthService
  ) {}
  ermsg: string = '';
  ngOnInit(): void {}

  onLogin(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    this.userServ
      .login(formData.value.userEmail, formData.value.userPassword)
      .subscribe({
        next: (data) => {
          console.log(data);

          this.authService.setLoggedIn(true);
          this.router.navigate(['/shop']);
        },
        error: () => {
          this.ermsg = 'Emial is Wrong ';
        },
      });
  }
}
